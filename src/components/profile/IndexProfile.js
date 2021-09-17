/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
import React, { Component } from 'react'
import { indexProfile } from '../../api/profile'
import { withRouter } from 'react-router-dom'
import { Card } from 'react-bootstrap'

class IndexProfile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      profiles: []
    }
  }

  componentDidMount () {
    const { msgAlert, user } = this.props
    indexProfile(user)
      .then((response) => {
        this.setState({
          profiles: response.data.profiles
        })
      })
      .then(() =>
        msgAlert({
          heading: 'Yay',
          message: 'Here\'s the profiles',
          variant: 'success'
        })
      )
      .catch((err) =>
        msgAlert({
          heading: 'Nay :(',
          message: 'Something went wrong: ' + err.message,
          variant: 'danger'
        })
      )
  }

  render () {
	  const cardContainerLayout = {
	    display: 'flex',
	    justifyContent: 'center',
	    flexFlow: 'row wrap'
	  }
	  const { profiles } = this.state
	  // This is what prevents the "cannot read property map of undefined" or other similar errors because on the first render, `movies` state will be `null`
	  if (profiles === null) {
	    return 'Loading...'
	  }

	  let profileJsx
    console.log('This is the profile!!!!!!!', this.state.profiles)
	  if (this.state.profiles.length === 0) {
	    profileJsx = 'Opps! Something went wrong.'
	  } else {
	    // I want movieJsx to be a bunch of li or Link or something with all my movies info in them
	    // .map gives us back a new array that we can display
	    profileJsx = this.state.profiles.map((profile) => (
	      <Card key={profile.id} style={{ width: '18rem', marginTop: '40px' }}>
	        <Card.Body></Card.Body>
	        <Card.Body>
	          <Card.Title>{profile.name}</Card.Title>
	          <Card.Text>{profile.age}</Card.Text>
	          <Card.Text>{profile.breed}</Card.Text>
	          <Card.Text>{profile.bio}</Card.Text>
	          <Card.Text>{profile.image}</Card.Text>
	        </Card.Body>
	      </Card>
	    ))
	  }

	  return <div style={cardContainerLayout}>{profileJsx}</div>
  }
}
export default withRouter(IndexProfile)
