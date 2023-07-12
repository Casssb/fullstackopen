import { SyntheticEvent } from 'react';

interface Props {
  filterText: string;
  filterByName(e: SyntheticEvent): void;
}

const Filter = ({ filterText, filterByName }: Props) => {
  return (
    <div>
      Find a person by name:{' '}
      <input value={filterText} onChange={(e) => filterByName(e)} />
    </div>
  );
};

export default Filter;
