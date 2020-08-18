/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react'
import { Helmet } from 'react-helmet-async'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import { GlobalStyle } from 'styles/global-styles'

import { PostsPage } from './containers/PostPage/Loadable'

import { NotFoundPage } from './components/NotFoundPage/Loadable'
import Notificator from './components/shared/Notificator/Notificator'

export function App() {
    return (
        <React.Fragment>
            <Notificator />
            <BrowserRouter>
                <Helmet
                    titleTemplate="%s - Challenge TiARG"
                    defaultTitle="Challenge TiARG"
                >
                    <meta name="description" content="Challenge TiARG" />
                </Helmet>

                <Switch>
                    <Route exact path="/:id?" component={PostsPage} />
                    <Route component={NotFoundPage} />
                </Switch>
                <GlobalStyle />
            </BrowserRouter>
        </React.Fragment>
    )
}
