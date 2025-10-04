import axios, { AxiosError } from 'axios';
import { useForm, type SubmitHandler } from 'react-hook-form';

type Weather = 'sunny' | 'rainy' | 'cloudy' | 'stormy' | 'windy';

type Visibility = 'great' | 'good' | 'ok' | 'poor';

interface FormInput {
  date: string;
  visibility: Visibility;
  weather: Weather;
  comment: string;
}

const EntryForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormInput>();
  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/diaries`, data);
    } catch (error) {
      if (error instanceof AxiosError) {
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
    }
  };
  return (
    <div className="flex flex-col items-center gap-1 mb-2">
      <p className="text-2xl font-bold text-cyan-900">Add New Entry</p>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <label className="font-semibold">Date</label>
        <input type="date" {...register('date', { required: true })} />
        <label className="font-semibold">Visibility</label>
        <select
          className="bg-amber-100"
          {...register('visibility', { required: true })}
        >
          <option value="great">great</option>
          <option value="good">good</option>
          <option value="ok">ok</option>
          <option value="poor">poor</option>
        </select>
        <label className="font-semibold">Weather</label>
        <select
          className="bg-amber-100"
          {...register('weather', { required: true })}
        >
          <option value="sunny">sunny</option>
          <option value="rainy">rainy</option>
          <option value="cloudy">cloudy</option>
          <option value="stormy">stormy</option>
          <option value="windy">windy</option>
        </select>
        <label className="font-semibold">Comment</label>
        <input type="text" {...register('comment')} />
        <input className="bg-cyan-200" type="submit" />
        {errors.root?.serverError && (
          <p className="text-red-500 font-bold">
            {errors.root.serverError.message}
          </p>
        )}
      </form>
    </div>
  );
};

export default EntryForm;
