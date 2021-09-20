/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
import React, { Component } from 'react'
import { indexProfile } from '../../api/profile'
import { withRouter } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'
import { Image } from 'cloudinary-react'

import { likeProfiles } from '../../api/likes'

class IndexProfile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      profiles: []
    }
  }

  componentDidMount () {
    const { user, msgAlert } = this.props
    indexProfile(user)
      .then((response) => {
        this.setState({
          profiles: response.data.profiles
        })
      })
      .then(() =>
        msgAlert({
          heading: 'Profiles',
          message: 'Here are all the profiles!',
          variant: 'success'
        })
      )
      .catch((err) =>
        msgAlert({
          heading: 'Oh, no! Something went wrong.',
          message: 'Something went wrong: ' + err.message,
          variant: 'danger'
        })
      )
  }

  handleClick = (event) => {
    event.preventDefault()
    const { user, msgAlert } = this.props
    // const { profiles } = this.state
    // console.log('These are profiles', profiles)
    // console.log('This is the user', user)
    const profileData = {
      profile_id: event.target.attributes.getNamedItem('data-profile').value,
      user_id: event.target.attributes.getNamedItem('data-user').value
    }
    likeProfiles(profileData, user, msgAlert)
      .then(() =>
        msgAlert({
          heading: 'Liked',
          message: 'You have liked this profile.',
          variant: 'success'
        })
      )
      .catch((err) =>
        msgAlert({
          heading: 'Like failed :(',
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
    // console.log('THESE are profiles', profiles)
	  // This is what prevents the "cannot read property map of undefined" or other similar errors because on the first render, `profiles` state will be `null`
	  if (profiles === '') {
	    return 'Loading...'
	  }

    let profileJsx
	  if (this.state.profiles.length === 0) {
	    profileJsx = 'Loading...'
	  } else {
	    // I want movieJsx to be a bunch of li or Link or something with all my movies info in them
	    // .map gives us back a new array that we can display
	    profileJsx = this.state.profiles.map((profile) => (
        <Card key={profile.id} style={{ width: '18rem', marginTop: '40px' }}>
          <Card.Body>
            <Card.Title>{profile.name}</Card.Title>
            <Image
              style={{ width: 257 }}
              cloudName='doz8kotw7'
              publicId='https://res.cloudinary.com/doz8kotw7/image/upload/v1631985746/jqaomhzzofunvjn6jzt4.jpg'
            />
            <Card.Text>{profile.age}</Card.Text>
            <Card.Text>{profile.breed}</Card.Text>
            <Card.Text>{profile.liked_profiles}</Card.Text>
            <Card.Text style={{ fontFamily: 'Satisfy', fontSize: '25px' }}>
              {profile.bio}
            </Card.Text>
            <Button
              variant='success'
              onClick={this.handleClick}
              data-profile={profile.id}
              data-user={profile.owner}>
							Purr
            </Button>
          </Card.Body>
        </Card>
      ))
	  }

	  return <div style={cardContainerLayout}>{profileJsx}</div>
  }
}
export default withRouter(IndexProfile)
