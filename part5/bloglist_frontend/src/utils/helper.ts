import { SetStateAction } from "react";

type messageSetter = (argument: SetStateAction<string>) => void


const setMessageAfterDelay = (callback: messageSetter, message: string, delay: number) => {
  setTimeout(() => {
    callback(message);
  }, delay);
};

export { setMessageAfterDelay };
