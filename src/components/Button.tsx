import React, { ButtonHTMLAttributes, CSSProperties } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  id?: string;
  title: React.ReactNode | string;
  type?: 'button' | 'submit';
  style?: CSSProperties;
};

export default function Button({
  id,
  title,
  type = 'submit',
  style,
  ...props
}: ButtonProps) {
  return (
    <button data-testid={id} type={type} style={style} {...props}>
      {title}
    </button>
  );
}
