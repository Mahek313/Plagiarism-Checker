import ResultCard from "./ResultCard";

function AnalysisResult(props) {

  const status =
    props.percentage <= 20
      ? "Low"
      : props.percentage <= 50
      ? "Moderate"
      : "High";

  return (
    <>
      {/* RESULT CARD */}

      <ResultCard
        fileName={props.fileName}
        percentage={props.percentage}
        matchedFile={props.matchedFile}
        topMatches={props.topMatches}
        matchedWords={props.matchedWords}
        documentText={props.documentText}
        status={status}
      />

      {/* TOP MATCHING DOCUMENTS */}

      {props.topMatches &&
        props.topMatches.length > 0 && (

          <div className="top-matches-card">

            <h2>
              🏆 Top Matching Documents
            </h2>

            <div className="matches-list">

              {props.topMatches.map(
                (match, index) => (

                  <div
                    className="match-item"
                    key={
                      match._id ||
                      match.fileName ||
                      index
                    }
                  >

                    <div className="match-rank">

                      {index === 0 && "🥇"}
                      {index === 1 && "🥈"}
                      {index === 2 && "🥉"}

                    </div>

                    <div className="match-details">

                      <h3>
                        {match.fileName}
                      </h3>

                      <p>
                        {match.similarity}%
                        {" "}Similarity
                      </p>

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

        )}

      {/* HIGHLIGHTED TEXT */}

      {props.documentText && (

        <details className="matched-section">

          <summary>
            📄 View Highlighted Text
          </summary>

          <div className="matched-text">

            {props.documentText
              .split(" ")
              .map((word, index) => {

                const cleanWord =
                  word
                    .toLowerCase()
                    .replace(
                      /[^\w]/g,
                      ""
                    );

                return props.matchedWords &&
                  props.matchedWords.includes(
                    cleanWord
                  )

                  ? (
                    <mark key={index}>
                      {word}{" "}
                    </mark>
                  )

                  : (
                    word + " "
                  );

              })}

          </div>

        </details>

      )}

    </>
  );
}

export default AnalysisResult;