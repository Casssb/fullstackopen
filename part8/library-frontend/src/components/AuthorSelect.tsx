import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { useMutation } from '@apollo/client';
import { ALL_AUTHORS } from '@/queries';
import { SET_AUTHOR_BORN } from '@/mutations';

type AuthorSelectProps = {
  authors: string[];
};

const AuthorSelect = ({ authors }: AuthorSelectProps) => {
  const [authorName, setAuthorName] = useState('');
  const [yearBorn, setYearBorn] = useState(1999);

  const [setAuthorBorn] = useMutation(SET_AUTHOR_BORN, {
    refetchQueries: [ALL_AUTHORS],
  });

  const onClick = () => {
    setAuthorBorn({ variables: { setBornTo: yearBorn, name: authorName } });
  };
  return (
    <div className="m-5">
      <Select onValueChange={(value) => setAuthorName(value)}>
        <SelectTrigger className="w-[30vw]">
          <SelectValue placeholder="Select an author to update" />
        </SelectTrigger>
        <SelectContent>
          {authors.map((author) => (
            <SelectItem key={author} value={author}>
              {author}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {authorName && (
        <div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="born">Year Born</Label>
            <Input
              id="born"
              type="number"
              value={yearBorn}
              onChange={(e) => setYearBorn(e.target.valueAsNumber)}
            />
          </div>
          <Button disabled={!yearBorn} className="mt-5" onClick={onClick}>
            Update Author
          </Button>
        </div>
      )}
    </div>
  );
};

export default AuthorSelect;
