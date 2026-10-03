import DisclaimerBanner from './DisclaimerBanner.jsx';
import QuestionList from './QuestionList.jsx';

export default function ResultPanel({ result, extra }) {
  if (!result) return null;

  return (
    <article className="panel">
      <p className="badge">{result.category || result.appointmentType || 'Guidance'}</p>
      {result.matched === false ? <p className="badge">Not in sample library</p> : null}
      <h3>{result.title}</h3>
      {result.summary || result.overview ? <p className="lede">{result.summary || result.overview}</p> : null}
      {result.explanation ? <p>{result.explanation}</p> : null}

      {result.keyPoints?.length ? (
        <>
          <h4>Key points</h4>
          <ul className="list">
            {result.keyPoints.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      ) : null}

      {result.whatToExpect?.length ? (
        <>
          <h4>What to expect</h4>
          <ul className="list">
            {result.whatToExpect.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      ) : null}

      {result.howToPrepare?.length ? (
        <>
          <h4>How to prepare</h4>
          <ul className="list">
            {result.howToPrepare.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      ) : null}

      {result.bringList?.length ? (
        <>
          <h4>What to bring</h4>
          <ul className="list">
            {result.bringList.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      ) : null}

      {result.whenToSeekCare ? (
        <>
          <h4>When to seek care</h4>
          <p>{result.whenToSeekCare}</p>
        </>
      ) : null}

      {result.groups || result.questions || result.printable ? (
        <>
          <h4>Questions you can ask</h4>
          <QuestionList groups={result.groups} items={result.printable || result.questions || []} />
        </>
      ) : null}

      {extra}
      <DisclaimerBanner compact />
    </article>
  );
}
