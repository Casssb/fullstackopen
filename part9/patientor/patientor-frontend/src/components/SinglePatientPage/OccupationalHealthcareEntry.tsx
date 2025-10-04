import { Box, Typography } from '@mui/material';
import type { OccupationalHealthcareEntry } from '../../types';

type OccupationalHealthcareProps = {
  entry: OccupationalHealthcareEntry;
};

const OccupationalHealthcareEntry = ({
  entry,
}: OccupationalHealthcareProps) => {
  return (
    <Box>
      <Typography>Employer Name: {entry.employerName}</Typography>
      {entry.sickLeave && (
        <>
          <Typography>Leave start: {entry.sickLeave.startDate}</Typography>
          <Typography>Leave end: {entry.sickLeave.endDate}</Typography>
        </>
      )}
    </Box>
  );
};

export default OccupationalHealthcareEntry;
