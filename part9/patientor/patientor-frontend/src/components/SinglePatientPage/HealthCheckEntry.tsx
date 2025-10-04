import { Box, Typography } from '@mui/material';
import type { HealthCheckEntry } from '../../types';

type HealthCheckProps = {
  entry: HealthCheckEntry;
};

const HealthCheckEntry = ({ entry }: HealthCheckProps) => {
  return (
    <Box>
      <Typography>Rating: {entry.healthCheckRating}</Typography>
    </Box>
  );
};

export default HealthCheckEntry;
