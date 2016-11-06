import React, { Component } from 'react'
import VerticalLinearStepper from './components/VerticalLinearStepper'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <VerticalLinearStepper />
      </MuiThemeProvider>
    );
  }
}

export default App; 
