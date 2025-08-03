// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ratings = {
  1: 'not good',
  2: 'ok',
  3: 'good',
} as const;

type Rating = keyof typeof ratings;
type RatingDescription = (typeof ratings)[Rating];

interface ExerciseReport {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: Rating;
  ratingDescription: RatingDescription;
  target: number;
  average: number;
}

interface RatingOutcome {
  rating: Rating;
  ratingDescription: RatingDescription;
}

const processExcersieCalculatorArguments = (args: string[]) => {
  if (args.length < 4)
    throw new Error('Not enough arguments (two numbers required)');

  const formattedNumbers = args.slice(2).map((arg) => {
    if (!isNaN(Number(arg))) {
      return Number(arg);
    } else {
      throw new Error(`Provided value ${arg} is not a number!`);
    }
  });

  return {
    targetHours: formattedNumbers[0],
    dailyExerciseHours: formattedNumbers.slice(1),
  };
};

const calculateRating = (
  averageHours: number,
  targetHours: number
): RatingOutcome => {
  const result = targetHours - averageHours;
  if (result < 0) {
    return {
      rating: 3,
      ratingDescription: 'good',
    };
  } else if (result < 0.5) {
    return {
      rating: 2,
      ratingDescription: 'ok',
    };
  } else {
    return {
      rating: 1,
      ratingDescription: 'not good',
    };
  }
};

export const calculateExercises = (
  dailyExerciseHours: number[],
  targetHours: number
): ExerciseReport => {
  const periodLength = dailyExerciseHours.length;
  const totalDaysExcercised = dailyExerciseHours.filter(Boolean).length;
  const sumOfDailyHours = dailyExerciseHours.reduce((acc, current) => {
    return acc + current;
  }, 0);
  const averageHoursExercised = sumOfDailyHours / periodLength;

  const ratingOutcome = calculateRating(averageHoursExercised, targetHours);

  return {
    periodLength: periodLength,
    trainingDays: totalDaysExcercised,
    success: totalDaysExcercised === periodLength,
    rating: ratingOutcome.rating,
    ratingDescription: ratingOutcome.ratingDescription,
    target: targetHours,
    average: parseFloat(averageHoursExercised.toFixed(2)),
  };
};

if (import.meta.filename === process.argv[1]) {
  try {
    const { targetHours, dailyExerciseHours } =
      processExcersieCalculatorArguments(process.argv);
    console.log(calculateExercises(dailyExerciseHours, targetHours));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log('An unkown error occured');
    }
  }
}
// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
