import React from 'react'
import { Route } from 'react-router-dom'
import LandingPage from './components/landing-page'

const Routes = () => {
    return (
        <Route exact path = "/" component={LandingPage} />
    )
}

export default Routes;
