import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import diagnosisService from '../../services/diagnosis';
import axios from 'axios';
import { Diagnosis, Patient } from '../../types';
import { Box, Stack, Typography } from '@mui/material';
import Entries from './Entries';
import AddEntryForm from './AddEntryForm';

const SinglePatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [patientError, setPatientError] = useState('');
  const [diagnosesError, setDiagnosesError] = useState('');

  useEffect(() => {
    const fetchPatient = async (patientId: string) => {
      try {
        const data = await patientService.getSingle(patientId);
        setPatient(data);
        setPatientError('');
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setPatientError(error.message);
        }
      }
    };

    if (id) {
      fetchPatient(id);
    }
  }, [id]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const data = await diagnosisService.getAll();
        setDiagnoses(data);
        setPatientError('');
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setDiagnosesError(error.message);
        }
      }
    };

    fetchDiagnoses();
  }, []);

  if (!id) {
    return (
      <Box>
        <Typography>Unkown ID</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {patient && (
        <>
          <Typography sx={{ fontWeight: 'bold', my: 2 }}>
            {patient.name}
          </Typography>
          <Stack spacing={2}>
            <Typography>Gender: {patient.gender}</Typography>
            <Typography>SSN: {patient.ssn}</Typography>
            <Typography>Occupation: {patient.occupation}</Typography>
          </Stack>
          <AddEntryForm diagnoses={diagnoses} id={id} setPatient={setPatient} />
          {patient.entries?.length ? (
            <Entries
              entries={patient.entries}
              diagnoses={diagnoses}
              diagnosesError={diagnosesError}
            />
          ) : null}
        </>
      )}
      {patientError && <Typography color="red">{patientError}</Typography>}
    </Box>
  );
};

export default SinglePatientPage;
