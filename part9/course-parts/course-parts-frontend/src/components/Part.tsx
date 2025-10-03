import { Container, Flex, Text } from '@mantine/core';
import type { CoursePart } from '../App';

type PartProps = {
  coursePart: CoursePart;
};

const renderPart = (coursePart: CoursePart) => {
  switch (coursePart.kind) {
    case 'basic':
      return (
        <Flex gap={5}>
          <Text fw={700}>{coursePart.name}</Text>
          <Text>{coursePart.exerciseCount}</Text>
          <Text>{coursePart.description}</Text>
          <Text>{coursePart.kind}</Text>
        </Flex>
      );
    case 'group':
      return (
        <Flex gap={5}>
          <Text fw={700}>{coursePart.name}</Text>
          <Text>{coursePart.exerciseCount}</Text>
          <Text>{coursePart.groupProjectCount}</Text>
          <Text>{coursePart.kind}</Text>
        </Flex>
      );
    case 'background':
      return (
        <Flex gap={5}>
          <Text fw={700}>{coursePart.name}</Text>
          <Text>{coursePart.exerciseCount}</Text>
          <Text>{coursePart.description}</Text>
          <Text>{coursePart.backgroundMaterial}</Text>
          <Text>{coursePart.kind}</Text>
        </Flex>
      );
    case 'special':
      return (
        <Flex gap={5}>
          <Text fw={700}>{coursePart.name}</Text>
          <Text>{coursePart.exerciseCount}</Text>
          <Text>{coursePart.description}</Text>
          <Text>{coursePart.requirements}</Text>
          <Text>{coursePart.kind}</Text>
        </Flex>
      );
  }
};

const Part = ({ coursePart }: PartProps) => {
  return <Container>{renderPart(coursePart)}</Container>;
};

export default Part;
