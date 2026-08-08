function CircularProgress(props) {

  const radius = 55;
const circumference = 2 * Math.PI * radius;

const offset =
  circumference - (props.percentage / 100) * circumference;

  return (
    <div className="circular-progress">

      <svg width="140" height="140">

        {/* Background Circle */}
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="#ddd"
          strokeWidth="10"
        />

        {/* Progress Circle */}
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="#2563eb"
          strokeWidth="10"
          strokeDasharray={circumference}
         strokeDashoffset={offset}
         transform="rotate(-90 70 70)"

  style={{ transition: "stroke-dashoffset 1s ease" }}
        />

      </svg>

      <h2>{props.percentage}%</h2>

    </div>
  );
}

export default CircularProgress;