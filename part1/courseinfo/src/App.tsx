import Content from './components/Content';
import Header from './components/Header';
import Total from './components/Total';

export interface ContentInterface {
  part: string;
  exercise: number;
}

const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  const contentArray: ContentInterface[] = [
    { part: part1, exercise: exercises1 },
    { part: part2, exercise: exercises2 },
    { part: part3, exercise: exercises3 },
  ];

  return (
    <div>
      <Header course={course} />
      <Content contentArray={contentArray}/>
      <Total total={contentArray.reduce((acc,c) => acc + c.exercise, 0)}/>
    </div>
  );
};

export default App;
