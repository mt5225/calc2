import React, { Component } from 'react'
import { redA100 } from 'material-ui/styles/colors'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import CircularProgress from 'material-ui/CircularProgress'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

class Landing extends Component {

    state = {
        completed: 0,
    }

    componentDidMount() {
        this.timer = setTimeout(() => this.progress(60), 500);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    progress(completed) {
        if (completed > 100) {
            this.setState({ completed: 100 });
            console.log('done, redirect to hospital list')
            this.props.dispatch(push('list'))
        } else {
            this.setState({ completed });
            const diff = Math.random() * 10;
            this.timer = setTimeout(() => this.progress(completed + diff), 500);
        }
    }

    render() {
        const style = {
            container: {
                position: 'fixed',
                top: '45%',
                left: '45%',
            },
            refresh: {
                display: 'inline-block',
                position: 'relative',
            },
        };
        return (
            <MuiThemeProvider>
                <div className='landing'>
                    <img className='logo ' src='images/logo.png' />
                    <div style={style.container}>
                        <CircularProgress color='#ffffff' />
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
    }
}

export default connect(null, mapDispatchToProps)(Landing)