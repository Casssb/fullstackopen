import StatLine from "./StatLine"

interface Stats {
  totalFeedback: number
  average: number
  percentPositive: number
}

interface Props {
  good: number
  neutral: number
  bad: number
  stats: Stats
} 

const Statistics = ({good, neutral, bad, stats}: Props) => {
  if (good || bad || neutral) {
    return (
      <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatLine description="good" stat={good}/>
          <StatLine description="neutral" stat={neutral}/>
          <StatLine description="bad" stat={bad}/>
          <StatLine description="all" stat={stats.totalFeedback}/>
          <StatLine description="average" stat={stats.average}/>
          <StatLine description="positive" stat={stats.percentPositive}/>
        </tbody>
      </table>
    </div>
    )
  } else {
    return (
      <div>
        <h1>statistics</h1>
        <p>no feedback given</p>
      </div>
    )
  }
}

export default Statistics