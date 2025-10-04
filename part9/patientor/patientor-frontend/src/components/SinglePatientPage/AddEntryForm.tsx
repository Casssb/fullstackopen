import { Alert, Box, Button, ButtonGroup, Modal, Stack } from '@mui/material';
import {
  MultiSelectElement,
  SelectElement,
  SubmitHandler,
  TextFieldElement,
  useForm,
} from 'react-hook-form-mui';
import { Dispatch, SetStateAction, useState } from 'react';
import { Diagnosis, Patient } from '../../types';
import patientService from '../../services/patients';
import axios from 'axios';

type AddEntryFormProps = {
  diagnoses: Diagnosis[];
  id: string;
  setPatient: Dispatch<SetStateAction<Patient | null>>;
};

interface FormInput {
  type: 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare';
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: string[];
  healthCheckRating: number;
  discharge?: {
    date: string;
    criteria: string;
  };
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

const AddEntryForm = ({ diagnoses, id, setPatient }: AddEntryFormProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    control,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: {
      type: 'HealthCheck',
    },
  });

  const type = watch('type');

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    try {
      const newEntry = await patientService.createEntry(data, id);
      setPatient((prevState) => {
        if (prevState !== null) {
          return {
            ...prevState,
            entries: [...prevState.entries, newEntry],
          };
        }
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError('root.serverError', {
          type: 'manual',
          message: error.response?.data ?? error.message,
        });
      } else {
        setError('root.serverError', {
          type: 'manual',
          message: 'an unkown error occured',
        });
      }
    } finally {
      handleClose();
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>Open Entry Form</Button>
      {errors.root?.serverError && (
        <Alert severity="error">{errors.root.serverError.message}</Alert>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Box sx={{ backgroundColor: 'white' }}>
          <form onSubmit={handleSubmit((data) => onSubmit(data))} noValidate>
            <Stack spacing={2} sx={{ padding: '1rem' }}>
              <SelectElement
                name="type"
                label={'Type'}
                options={[
                  { id: 'HealthCheck', label: 'HealthCheck' },
                  { id: 'Hospital', label: 'Hospital' },
                  {
                    id: 'OccupationalHealthcare',
                    label: 'OccupationalHealthcare',
                  },
                ]}
                control={control}
              />
              <TextFieldElement
                name={'description'}
                label={'Description'}
                control={control}
                required
              />
              <TextFieldElement
                name={'date'}
                label={'Date'}
                type={'date'}
                control={control}
                required
              />
              <TextFieldElement
                name={'specialist'}
                label={'Specialist'}
                control={control}
                required
              />
              {diagnoses.length && (
                <MultiSelectElement
                  name="diagnosisCodes"
                  label={'Diagnosis Codes'}
                  options={diagnoses.map((diagnosis) => diagnosis.code)}
                  control={control}
                />
              )}
              {type === 'HealthCheck' && (
                <SelectElement
                  name="healthCheckRating"
                  label={'Rating'}
                  options={[0, 1, 2, 3].map((elem) => ({
                    id: elem,
                    label: elem,
                  }))}
                  control={control}
                />
              )}
              {type === 'Hospital' && (
                <>
                  <TextFieldElement
                    name={'discharge.date'}
                    label={'Discharge Date'}
                    type={'date'}
                    control={control}
                    required
                  />
                  <TextFieldElement
                    name={'discharge.criteria'}
                    label={'Discharge Criteria'}
                    control={control}
                    required
                  />
                </>
              )}
              {type === 'OccupationalHealthcare' && (
                <>
                  <TextFieldElement
                    name={'employerName'}
                    label={'Employer Name'}
                    control={control}
                    required
                  />
                  <TextFieldElement
                    name={'sickLeave.startDate'}
                    label={'Sick Leave Start Date'}
                    control={control}
                    type={'date'}
                  />
                  <TextFieldElement
                    name={'sickLeave.endDate'}
                    label={'Sick Leave End Date'}
                    control={control}
                    type={'date'}
                  />
                </>
              )}
              <ButtonGroup>
                <Button type="submit" color="primary">
                  Submit
                </Button>
                <Button color="error" onClick={handleClose}>
                  Cancel
                </Button>
              </ButtonGroup>
            </Stack>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default AddEntryForm;
