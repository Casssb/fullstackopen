type BMICategory =
  | 'Underweight'
  | 'Healthy Weight'
  | 'Overweight'
  | 'Obese'
  | 'Hippo';

const processBMIArguments = (args: string[]) => {
  if (args.length < 4)
    throw new Error('Not enough arguments (two numbers required)');
  if (args.length > 4)
    throw new Error('Too many arguments (two numbers required)');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      heightCM: Number(args[2]),
      weightKG: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBMI = (
  heightCM: number,
  weightKG: number
): BMICategory => {
  const heightMeters = heightCM / 100;
  const bmiCalculation = weightKG / heightMeters ** 2;

  if (bmiCalculation > 40) {
    return 'Hippo';
  } else if (bmiCalculation > 30) {
    return 'Obese';
  } else if (bmiCalculation > 25) {
    return 'Overweight';
  } else if (bmiCalculation > 18.5) {
    return 'Healthy Weight';
  } else {
    return 'Underweight';
  }
};

if (import.meta.filename === process.argv[1]) {
  try {
    const { heightCM, weightKG } = processBMIArguments(process.argv);
    console.log(calculateBMI(heightCM, weightKG));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log('An unkown error occured');
    }
  }
}
