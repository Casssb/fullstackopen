import { SyntheticEvent } from 'react';
import { Person } from '../App';

interface Props {
  person: Person;
  handleDelete(e: SyntheticEvent,id: number, name: string): void
}

const PersonDisplay = ({ person, handleDelete }: Props) => {
  return (
    <div className='person' key={person.id}>
      <h5>
        {person.name} {person.number}
      </h5>
      <button onClick={(e) => handleDelete(e, Number(person.id), person.name)}>Delete</button>
    </div>
  );
};

export default PersonDisplay;
