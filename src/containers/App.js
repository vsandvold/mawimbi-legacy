import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import TransportContainer from './TransportContainer'
import { resetErrorMessage } from '../actions'

class App extends Component {

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleDismissClick = this.handleDismissClick.bind(this)
  }

  handleChange(nextValue) {
    browserHistory.push(`/${nextValue}`)
  }

  handleDismissClick(e) {
    this.props.resetErrorMessage()
    e.preventDefault()
  }

  renderErrorMessage() {
    const { errorMessage } = this.props
    if (!errorMessage) {
      return null
    }

    return (
      <p style={{ backgroundColor: '#e99', padding: 10 }}>
        <b>{errorMessage}</b>
        {' '}
        (<a href="#"
            onClick={this.handleDismissClick}>
          Dismiss
        </a>)
      </p>
    )
  }

  render() {
    return (
      <div className='mdl-layout mdl-js-layout mdl-layout--fixed-header'>
        <header className='mdl-layout__header mdl-color--grey-900'>
          <div className='mdl-layout-icon'></div>
          <div className='mdl-layout__header-row'>
            <span className='mdl-layout__title mdl-layout--large-screen-only'>Leamikk</span>
            <div className='mdl-layout-spacer'></div>
          </div>
        </header>
        <div className='mdl-layout__drawer'>
          <span className='mdl-layout__title'>Leamikk</span>
          <nav className='mdl-navigation'>
            <a className='mdl-navigation__link' href='/'>Mixer</a>
            <a className='mdl-navigation__link' href='/settings'>Settings</a>
            <a className='mdl-navigation__link' href='/help'>Help</a>
          </nav>
        </div>
        <main className='mdl-layout__content' style={{backgroundColor: '#303030'}}>
          <div className='mdl-grid'>
            <div className='mdl-cell mdl-cell--12-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--stretch'>
            </div>
            <div className='mdl-cell mdl-cell--12-col mdl-cell--8-col-tablet mdl-cell--4-col-phone mdl-cell--bottom mdl-grid mdl-grid--no-spacing'>
              <div className='mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-cell--2-col-phone'>
                <TransportContainer />
              </div>
            </div>
          </div>
          {this.renderErrorMessage()}
        </main>
      </div>
    )
  }
}

App.propTypes = {
  // Injected by React Redux
  errorMessage: PropTypes.string,
  resetErrorMessage: PropTypes.func.isRequired,
}

function mapStateToProps(state, ownProps) {
  return {
    errorMessage: state.errorMessage,
  }
}

export default connect(mapStateToProps, {
  resetErrorMessage
})(App)
