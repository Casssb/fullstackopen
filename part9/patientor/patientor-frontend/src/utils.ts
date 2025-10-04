export const assertNever = (entry: never) => {
  throw new Error(`Unexpected Value ${entry}`);
};