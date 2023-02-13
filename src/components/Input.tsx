import React, { InputHTMLAttributes } from 'react';
import { Control, Controller } from 'react-hook-form';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  control: Control<any>;
  name: string;
};

export default function Input({ id, control, name, ...props }: InputProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <input
          data-testid={id}
          {...field}
          {...props}
          type={props.type || 'text'}
        />
      )}
    />
  );
}
