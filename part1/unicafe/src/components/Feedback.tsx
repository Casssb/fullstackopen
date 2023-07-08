import StatButton from './StatButton';

interface Props {
  handleClick(feedback: string): void;
}

const Feedback = ({ handleClick }: Props) => {
  return (
    <div>
      <h1>Feedback</h1>
      <StatButton feedback="good" handleClick={handleClick} />
      <StatButton feedback="neutral" handleClick={handleClick} />
      <StatButton feedback="bad" handleClick={handleClick} />
    </div>
  );
};

export default Feedback;
