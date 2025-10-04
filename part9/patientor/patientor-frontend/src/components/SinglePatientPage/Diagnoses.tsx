import { Box, Typography } from '@mui/material';
import { Diagnosis } from '../../types';

type DiagnosesProps = {
  diagnosisCodes: string[];
  diagnoses: Diagnosis[];
  diagnosesError: string;
};

const Diagnoses = ({
  diagnosisCodes,
  diagnoses,
  diagnosesError,
}: DiagnosesProps) => {
  const formattedDiagnoses = diagnoses
    .filter((diagnosis) => diagnosisCodes.includes(diagnosis.code))
    .map((diagnosis) => `${diagnosis.code}: ${diagnosis.name}`);

  return (
    <Box>
      {diagnosesError && <Typography>{diagnosesError}</Typography>}
      {formattedDiagnoses.map((diagnosis) => (
        <Typography key={diagnosis}>{diagnosis}</Typography>
      ))}
    </Box>
  );
};

export default Diagnoses;
