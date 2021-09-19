/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { updateProfile, indexUserProfile } from '../../api/profile'
import UpdateForm from './UpdateForm'

class UpdateProfile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      profile: {
        name: '',
        age: '',
        breed: '',
        bio: ''
      }
    }
  }

  componentDidMount () {
    // one of the automatic router props we get is the match object - that has data about the params in our front-end route url
    const { user, match, msgAlert } = this.props

    indexUserProfile(user, match.params.id)
      .then(() =>
        msgAlert({
          heading: 'Update',
          message: 'Update your profile here!',
          variant: 'success'
        })
      )
      .catch((err) =>
        msgAlert({
          heading: 'Show Profile failed',
          message: 'Something went wrong: ' + err.message,
          variant: 'danger'
        })
      )
  }

	handleChange = (event) => {
	  // because `this.state.profile` is an object with multiple keys, we have to do some fancy updating
	  const userInput = { [event.target.name]: event.target.value }
	  this.setState((currState) => {
	    // "Spread" out current  profile state key/value pairs, then add the new one at the end
	    // this will override the old key/value pair in the state but leave the others untouched
	    return { profile: { ...currState.profile, ...userInput } }
	  })
	}

	handleSubmit = (event) => {
	  event.preventDefault()

	  const { user, msgAlert, history, match } = this.props

	  updateProfile(this.state.profile, match.params.id, user)
	    .then((res) => history.push('/userprofile'))
	    .then(() =>
	      msgAlert({
	        heading: 'Profile Updated!',
	        message: 'Nice work.',
	        variant: 'success'
	      })
	    )
	    .catch((err) => {
	      msgAlert({
	        heading: 'Profile update failed :(',
	        message: 'Something went wrong: ' + err.message,
	        variant: 'danger'
	      })
	    })
	}

	render () {
	  return (
	    <>
	      <UpdateForm
	        profile={this.state.profile}
	        handleSubmit={this.handleSubmit}
	        handleChange={this.handleChange}
	      />
	    </>
	  )
	}
}

export default withRouter(UpdateProfile)
