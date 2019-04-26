import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { store, persistor, history } from './store';
import Root from './routes';
import { ThemeProvider } from 'styled-components';
import './app.scss';
import './styles/page.scss';
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0097A7',
    },
  },
  typography: {
    fontFamily: '"Play", sans-serif',
  },
});

const styledTheme = {
  breakpoints: {
    xs: '480px',
    sm: '576px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  colors: {
    primary: '#0097A7',
  },
  common: {
    padding: {
      default: '8px',
      md: '20px',
    },
    borderRadius: '2px',
  },
};

export default () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={styledTheme}>
          <Root history={history} />
        </ThemeProvider>
      </MuiThemeProvider>
    </PersistGate>
  </Provider>
);
