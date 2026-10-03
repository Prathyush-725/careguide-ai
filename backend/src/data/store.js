import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { env } from '../config/env.js';
import { createId } from '../utils/id.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(__dirname, '../../data');

function resolveDataFile() {
  const requested = path.basename(env.dataFileName || 'store.json').replace(/[^a-zA-Z0-9._-]/g, '');
  const fileName = requested.endsWith('.json') ? requested : 'store.json';
  const resolved = path.resolve(dataDir, fileName);
  if (!resolved.startsWith(`${dataDir}${path.sep}`)) {
    return path.join(dataDir, 'store.json');
  }
  return resolved;
}

const dataFile = resolveDataFile();

function defaultState() {
  const now = new Date().toISOString();
  return {
    profile: {
      id: env.demoMode ? 'demo-user' : 'local-user',
      name: env.defaultUserName,
      email: '',
      preferredName: 'Alex',
      role: 'patient',
      language: 'en',
      careFocus: 'General wellness',
      appointmentReminders: true,
      saveHistory: true,
      notes: env.demoMode
        ? 'Demo profile only. Do not enter real medical or personal information.'
        : 'I like short, plain-language explanations and a short list of questions I can take to visits.',
      createdAt: now,
      updatedAt: now,
    },
    history: [],
  };
}

let memory = defaultState();

async function ensureFile() {
  await fs.mkdir(path.dirname(dataFile), { recursive: true });
  try {
    await fs.access(dataFile);
  } catch {
    await fs.writeFile(dataFile, JSON.stringify(defaultState(), null, 2));
  }
}

export async function loadStore() {
  await ensureFile();
  try {
    const raw = await fs.readFile(dataFile, 'utf8');
    const parsed = JSON.parse(raw);
    memory = {
      ...defaultState(),
      ...parsed,
      profile: { ...defaultState().profile, ...(parsed.profile || {}) },
      history: Array.isArray(parsed.history) ? parsed.history : [],
    };
  } catch (error) {
    console.warn('[CareGuide] Could not read local store. Starting fresh.', error.message);
    memory = defaultState();
    await persist();
  }
  return memory;
}

async function persist() {
  await fs.mkdir(path.dirname(dataFile), { recursive: true });
  await fs.writeFile(dataFile, JSON.stringify(memory, null, 2));
}

export function getProfile() {
  return memory.profile;
}

export async function updateProfile(updates) {
  memory.profile = {
    ...memory.profile,
    ...updates,
    id: memory.profile.id,
    updatedAt: new Date().toISOString(),
  };
  await persist();
  return memory.profile;
}

export function listHistory() {
  return [...memory.history].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function getHistoryItem(id) {
  return memory.history.find((item) => item.id === id) || null;
}

export async function addHistoryItem(item) {
  const record = {
    id: createId(),
    createdAt: new Date().toISOString(),
    ...item,
  };
  memory.history.unshift(record);
  memory.history = memory.history.slice(0, 100);
  await persist();
  return record;
}

export async function deleteHistoryItem(id) {
  const before = memory.history.length;
  memory.history = memory.history.filter((item) => item.id !== id);
  if (memory.history.length === before) return false;
  await persist();
  return true;
}

export function getDashboardStats() {
  const history = listHistory();
  const counts = history.reduce((acc, item) => {
    acc[item.type] = (acc[item.type] || 0) + 1;
    return acc;
  }, {});

  return {
    totalSaved: history.length,
    explanations: counts.explanation || 0,
    appointments: counts.appointment || 0,
    questionSets: counts.questions || 0,
    recent: history.slice(0, 4),
  };
}
