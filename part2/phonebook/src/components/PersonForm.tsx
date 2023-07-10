import { SyntheticEvent } from 'react';

interface Props {
  newName: string;
  newNumber: string | null;
  setNewName(e: string): void;
  setNewNumber(e: string): void;
  addPerson(e: SyntheticEvent): void;
}

const PersonForm = ({
  newName,
  newNumber,
  setNewName,
  setNewNumber,
  addPerson,
}: Props) => {
  return (
    <form>
      <h3>Add a new person</h3>
      <div>
        name:{' '}
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          required
        />
      </div>
      <div>
        number:{' '}
        <input
          value={newNumber as string}
          onChange={(e) => setNewNumber(e.target.value)}
          required
        />
      </div>
      <div>
        <button type="submit" onClick={(e) => addPerson(e)}>
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
