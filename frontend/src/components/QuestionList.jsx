export default function QuestionList({ groups = [], items = [] }) {
  if (groups.length) {
    return (
      <div>
        {groups.map((group) => (
          <section className="question-group" key={group.heading}>
            <h4>{group.heading}</h4>
            <ol className="question-list">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    );
  }

  return (
    <ol className="question-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ol>
  );
}
