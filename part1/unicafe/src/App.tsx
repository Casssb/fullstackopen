import { useState } from 'react'
import Feedback from './components/Feedback'
import Statistics from './components/Statistics'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (feedback: String): void => {
      switch(feedback) {
        case 'good':
          setGood(prev => prev + 1)
          break;
        case 'neutral':
          setNeutral(prev => prev + 1)
          break;
        case 'bad':
          setBad(prev => prev + 1)
          break
        default:
          console.log('no option selected')
          break
      }
  }

  const getStatistics = () => {
    const totalFeedback = good + bad + neutral
    const average = (good - bad) / totalFeedback
    const percentPositive = (good / totalFeedback) * 100

    return {
      totalFeedback,
      average,
      percentPositive
    }
  }

  return (
    <div>
      <Feedback handleClick={handleClick}/>
      <Statistics good={good} neutral={neutral} bad={bad} stats={getStatistics()}/>
    </div>
  )
}

export default App
