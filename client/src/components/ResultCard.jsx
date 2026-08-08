import CircularProgress from "./CircularProgress";

function ResultCard(props) {

  console.log("ResultCard props:", props);



  return (

    <div className="result-card">

      <h2>📊 Analysis Result</h2>

      <CircularProgress percentage={props.percentage} />

      <p>
        <strong>📄 Uploaded File:</strong> {props.fileName}
      </p>

      <p>
        <strong>🏆 Best Match:</strong> {props.matchedFile}
      </p>

      <p>
        <strong>Similarity:</strong> {props.percentage}%
      </p>

      <p>
        <strong>Status:</strong>{" "}
        <span className={`status ${props.status.toLowerCase()}`}>
          {props.status}
        </span>
      </p>

      <hr />

     

      

    </div>

  );

}

export default ResultCard;