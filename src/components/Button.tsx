import styled from '@emotion/styled';
import React, { ButtonHTMLAttributes, CSSProperties } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  id: string;
  component: React.ReactNode | string;
  type?: 'button' | 'submit';
  style?: CSSProperties;
};

export default function Button({
  id,
  component,
  type = 'submit',
  style,
  ...props
}: ButtonProps) {
  return (
    <Container data-testid={id} type={type} style={style} {...props}>
      {component}
    </Container>
  );
}

const Container = styled.button`
  padding: 10px 12px;
  font-size: 14px;
`;
