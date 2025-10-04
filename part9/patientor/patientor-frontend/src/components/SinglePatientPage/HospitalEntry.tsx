import { Box, Typography } from '@mui/material';
import type { HospitalEntry } from '../../types';

type HospitalEntryProps = {
  entry: HospitalEntry;
};

const HospitalEntry = ({ entry }: HospitalEntryProps) => {
  return (
    <Box>
      <Typography>Discharge date: {entry.discharge.date}</Typography>
      <Typography>Discharge criteria: {entry.discharge.criteria}</Typography>
    </Box>
  );
};

export default HospitalEntry;
