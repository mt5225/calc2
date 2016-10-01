import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import VerticalLinearStepper from './components/VerticalLinearStepper'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <VerticalLinearStepper />
      </MuiThemeProvider>
    );
  }
}

export default App;
