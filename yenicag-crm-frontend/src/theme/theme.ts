import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',

    primary: {
      main: '#2563eb',
    },

    secondary: {
      main: '#7c3aed',
    },

    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
  },

  shape: {
    borderRadius: 16,
  },

  typography: {
    fontFamily:
      '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',

    h4: {
      fontWeight: 800,
    },

    h5: {
      fontWeight: 800,
    },

    h6: {
      fontWeight: 700,
    },
  },

  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          textTransform: 'none',
          fontWeight: 700,
        },
      },
    },
  },
});

export default theme;