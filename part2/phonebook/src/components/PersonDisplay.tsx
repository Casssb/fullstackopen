import { Person } from '../App';

interface Props {
  person: Person;
}

const PersonDisplay = ({ person }: Props) => {
  return (
    <div key={person.name}>
      <h5>
        {person.name} {person.number}
      </h5>
    </div>
  );
};

export default PersonDisplay;
