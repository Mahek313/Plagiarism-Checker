function HistoryItem(props) {
  return (
    <div className="history-item">

      <p>
        <strong>Uploaded File:</strong>{" "}
        {props.fileName}
      </p>

      <p>
        <strong>Best Match:</strong>{" "}
        {props.matchedFile}
      </p>

      <p>
        <strong>Similarity:</strong>{" "}
        {props.percentage}%
      </p>

      <p>
        <strong>Status:</strong>{" "}
        {props.status}
      </p>

      <button
        onClick={() => {
          window.location.href =
            `/report/${props.id}`;
        }}
      >
        View Report
      </button>

    </div>
  );
}

export default HistoryItem;