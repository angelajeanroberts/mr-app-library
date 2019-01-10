import React from 'react'
import { Route } from 'react-router-dom'
import LandingPage from './components/landing-page'

//routes added in anticipation of additional features

const Routes = () => {
    return (
        <Route exact path = "/" component={LandingPage} />
    )
}

export default Routes;
