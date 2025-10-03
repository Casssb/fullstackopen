import { Flex } from '@mantine/core';

type TotalProps = {
  totalExercises: number;
};

const Total = ({ totalExercises }: TotalProps) => {
  return <Flex>{totalExercises}</Flex>;
};

export default Total;
