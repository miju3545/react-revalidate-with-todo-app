import React, { ChangeEvent, useState } from 'react';

type ReturnType<T> = [
  T,
  (e: ChangeEvent<HTMLInputElement>) => void,
  () => void
];

const useInput = <T>(initialValue: T): ReturnType<T> => {
  const [value, setValue] = useState(initialValue);
  const handler = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value as unknown as T);

  const reset = () => setValue(initialValue);
  return [value, handler, reset];
};

export default useInput;
