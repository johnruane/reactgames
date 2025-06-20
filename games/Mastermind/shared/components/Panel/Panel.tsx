import './style.css';

export default function Panel({
  sections,
}: {
  sections: Record<string, string | number | React.ReactNode>[];
}) {
  return (
    <div className="panel-wrapper">
      {sections?.map((section) => {
        const { heading = null, value = null } = section || {};
        return (
          <div className="panel" key={`${heading}` || `${value}`}>
            {heading !== null && (
              <p className="panel-text panel-text-bold">{heading}</p>
            )}
            {value !== null && <div className="panel-text">{value}</div>}
          </div>
        );
      })}
    </div>
  );
}
