import HistoryItem from "./HistoryItem";

function History(props) {
  return (
    <div className="history-section">

      <h2>Recent Checks</h2>

      <button onClick={props.handleClearHistory}>
        Clear History
      </button>

      {props.history.length === 0 ? (
        <p>No history available.</p>
      ) : (
        props.history.map((item) => {

          const percentage = Number(item.similarity);

          const status =
            percentage <= 20
              ? "Low"
              : percentage <= 50
              ? "Moderate"
              : "High";

          return (
           props.history.map((item) => (
  <HistoryItem
  key={item._id}
  id={item._id}
  fileName={item.fileName}
  matchedFile={item.matchedFile}
  percentage={percentage}
  status={status}
  analysis={item}
/>
))
          );
        })
      )}

    </div>
  );
}

export default History;