import { Box, Stack, Typography } from '@mui/material';
import { Diagnosis, Entry } from '../../types';
import { assertNever } from '../../utils';
import Diagnoses from './Diagnoses';
import HealthCheckEntry from './HealthCheckEntry';
import HospitalEntry from './HospitalEntry';
import OccupationalHealthcareEntry from './OccupationalHealthcareEntry';

type EntriesProps = {
  entries: Entry[];
  diagnoses: Diagnosis[];
  diagnosesError: string;
};
const EntryDetails = (entry: Entry) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntry entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntry entry={entry} />;
    case 'HealthCheck':
      return <HealthCheckEntry entry={entry} />;
    default:
      assertNever(entry);
  }
};

const Entries = ({ entries, diagnoses, diagnosesError }: EntriesProps) => {
  return (
    <Box>
      <Typography variant="h4" sx={{ my: 2 }}>
        Entries
      </Typography>
      {entries.map((entry) => (
        <Stack gap={1} key={entry.id}>
          <Typography sx={{ fontWeight: 'bold' }}>{entry.date}</Typography>
          <Typography sx={{ fontStyle: 'italic' }}>
            {entry.description}
          </Typography>
          {entry.diagnosisCodes && (
            <Diagnoses diagnosisCodes={entry.diagnosisCodes} diagnoses={diagnoses} diagnosesError={diagnosesError} />
          )}
          {EntryDetails(entry)}
          <Typography>Specialist: {entry.specialist}</Typography>
        </Stack>
      ))}
    </Box>
  );
};

export default Entries;
