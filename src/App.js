/* eslint-disable no-tabs */
import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
import CreateProfile from './components/profile/CreateProfile'
import IndexProfile from './components/profile/IndexProfile'
import ShowProfile from './components/profile/ShowProfile'
import UpdateProfile from './components/profile/UpdateProfile'
// import pic from './pic.webp'
import newpic from './newpic.png'
import ShowLikes from './components/likes/ShowLikes'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = (user) => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter((msg) => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return {
        msgAlerts: [...state.msgAlerts, { heading, message, variant, id }]
      }
    })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert) => (
          <AutoDismissAlert
            key={msgAlert.id}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <main className='container'>
          <Route
            path='/sign-up'
            render={() => (
              <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
            )}
          />
          <Route
            path='/sign-in'
            render={() => (
              <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
            )}
          />
          <AuthenticatedRoute
            user={user}
            path='/sign-out'
            render={() => (
              <SignOut
                msgAlert={this.msgAlert}
                clearUser={this.clearUser}
                user={user}
              />
            )}
          />
          <AuthenticatedRoute
            user={user}
            path='/change-password'
            render={() => (
              <ChangePassword msgAlert={this.msgAlert} user={user} />
            )}
          />
          <AuthenticatedRoute
            user={user}
            exact
            path='/userprofile'
            render={() => <ShowProfile msgAlert={this.msgAlert} user={user} />}
          />
          <AuthenticatedRoute
            user={user}
            exact
            path='/userprofile'
            render={() => (
              <CreateProfile msgAlert={this.msgAlert} user={user} />
            )}
          />
          <AuthenticatedRoute
            user={user}
            exact
            path='/profiles'
            render={() => <IndexProfile msgAlert={this.msgAlert} user={user} />}
          />
          <AuthenticatedRoute
            user={user}
            exact
            path='/userprofile/:id/update'
            render={() => (
              <UpdateProfile msgAlert={this.msgAlert} user={user} />
            )}
          />
          <Route
            exact
            path='/'
            render={() => (
              <div>
                <img
                  className='pic'
                  src={newpic}
                  alt='Pic'
                  style={{ width: '40%' }}
                />
              </div>
            )}
          />
          {/* <Route
            exact
            path='/'
            render={() => (
              <div className='subtext'>
                <h1>Meet interesting cats nearby.</h1>
              </div>
            )}
          /> */}
          <AuthenticatedRoute
            user={user}
            exact
            path='/likes'
            render={() => <ShowLikes msgAlert={this.msgAlert} user={user} />}
          />
        </main>
      </Fragment>
    )
  }
}

export default App
