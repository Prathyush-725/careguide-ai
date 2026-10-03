export const HISTORY_TYPES = ['explanation', 'appointment', 'questions'];

export function toHistorySummary(item) {
  return {
    id: item.id,
    type: item.type,
    title: item.title,
    topic: item.topic,
    createdAt: item.createdAt,
    preview: item.preview,
  };
}
