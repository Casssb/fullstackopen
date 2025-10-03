import { Container } from '@mantine/core';
import type { CoursePart } from '../App';
import Part from './Part';

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <Container>
      {courseParts.map((part) => (
        <Part coursePart={part} />
      ))}
    </Container>
  );
};

export default Content;
