import type { ReactNode } from 'react';

import { CssBaseline, ThemeProvider } from '@mui/material';

import GraphqlProvider from './ApolloProvider';

import theme from '../../theme/theme';

type Props = {
  children: ReactNode;
};

export default function AppProviders({ children }: Props) {
  return (
    <GraphqlProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {children}
      </ThemeProvider>
    </GraphqlProvider>
  );
}