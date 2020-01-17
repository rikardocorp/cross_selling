import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { configNotification } from '../../shared/MessageNotification'
import { route } from './route'
import { connect } from 'react-redux'
import ReactNotification from 'react-notifications-component'

import { route as myRoutes } from './route'
// import Header from '../../components/Layout/HeaderScroll';
class Index extends Component {

    constructor(props) {
        super(props)
        this.notificationDOMRef = React.createRef();
    }

    state = {
        routes: myRoutes.routes
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.notify.listener !== this.props.notify.listener && nextProps.notify.listener > 0) {
            const config = nextProps.notify.config
            this.addNotification(config)
            return false
        }
        return true
    }

    addNotification = (config = {}) => {
        const data = {
            ...configNotification,
            ...config,
        }
        this.notificationDOMRef.current.addNotification(data);
    }

    render() {

        const allRoutes = route.routes
        const _socials = this.props.socials
        let localClassName = ''
        let contentSwitch = null
        if (allRoutes) {
            contentSwitch = allRoutes.map((localRoute, key) => {
                if (localRoute.component == null) return null;
                const { requiredAuth = undefined, roles = undefined } = localRoute.meta ? localRoute.meta : {}
                if (this.props.location.pathname === localRoute.path) {
                    localClassName = localRoute.className
                }

                if (localRoute.collapse) {
                    return localRoute.views.map((prop, key) => {
                        return (
                            <Route path={prop.path}
                                exact={true}

                                key={key}
                                render={routeProps =>
                                    <prop.component {...routeProps} />
                                } />
                        );
                    })
                } else if (localRoute.redirect) {
                    return (
                        <Redirect from={localRoute.path} to={localRoute.to} key={key} />
                    );
                }

                const localPath = localRoute.path + (localRoute.params ? localRoute.params : '')
                return (
                    <Route
                        exact={true}
                        path={localPath}
                        key={key}
                        isAuthenticated={this.props.isAuth}
                        requiredAuth={requiredAuth}
                        component={localRoute.component} />
                );
            })
        }

        return (
            <div>
                <ReactNotification ref={this.notificationDOMRef} />
                {/* <Header routes={allRoutes} socials={_socials} /> */}
                <section>
                    <Switch>
                        {contentSwitch}
                    </Switch>
                </section>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        notify: state.general.notify,
        // isAuth: state.general.user.auth,
        socials: []
    }
}

export default connect(mapStateToProps)(Index);