import styled from '@emotion/styled';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Container>{children}</Container>;
}

const Container = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 20px;
`;
