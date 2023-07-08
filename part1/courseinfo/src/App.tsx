import Content from './components/Content';
import Header from './components/Header';
import Total from './components/Total';

export interface ContentInterface {
  part: string;
  exercise: number;
}

export interface CourseInterface {
  name: string
  contentArray: ContentInterface[]
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    contentArray: [
      { part: 'Fundamentals of React', exercise: 10 },
      { part: "Using props to pass data'", exercise: 7 },
      { part: 'State of a component', exercise: 14 },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content contentArray={course.contentArray} />
      <Total total={course.contentArray.reduce((acc, c) => acc + c.exercise, 0)} />
    </div>
  );
};

export default App;
