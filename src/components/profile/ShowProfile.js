/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
import React, { Component } from 'react'
import { indexUserProfile, deleteProfile } from '../../api/profile'
import { withRouter } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'
import { Image } from 'cloudinary-react'

class ShowProfile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userprofile: []
    }
  }

  componentDidMount () {
    const { user, msgAlert } = this.props
    indexUserProfile(user)
      .then((response) => {
        this.setState({
          userprofile: response.data.userprofile
        })
      })
      .then(() =>
        msgAlert({
          heading: 'Profile',
          message: 'Here\'s your profile!',
          variant: 'success'
        })
      )
      .catch((err) =>
        msgAlert({
          heading: 'Oh, no. Something went wrong!',
          message: 'Error: ' + err.message,
          variant: 'danger'
        })
      )
  }

	handleClick = (event) => {
	  const { user, msgAlert, history } = this.props
	  event.preventDefault()
	  const profileDataId = event.target.getAttribute('data-id')
	  // console.log('Data-id is', profileDataId)
	  deleteProfile(profileDataId, user)
	    .then(() =>
	      msgAlert({
	        heading: 'Deleted',
	        message: 'Profile deleted successfully',
	        variant: 'success'
	      })
	    )
	    .then(() => history.push('/userprofile'))
	    .then(() =>
	      indexUserProfile(user).then((response) => {
	        this.setState({
	          userprofile: response.data.userprofile
	        })
	      })
	    )
	    .catch((err) =>
	      msgAlert({
	        heading: 'Deletion failed',
	        message: 'Unable to delete your profile. Error: ' + err.message,
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
	  const { userprofile } = this.state
	  const { history } = this.props
	  // This is what prevents the "cannot read property map of undefined" or other similar errors because on the first render, `movies` state will be `null`
	  if (userprofile === null) {
	    return 'Loading...'
	  }

	  let profileJsx
	  // console.log('This is the user profile', this.state.userprofile)
	  if (this.state.userprofile.length === 0) {
	    profileJsx = 'You do not have a profile yet. Create one below!'
	  } else {
	    // I want movieJsx to be a bunch of li or Link or something with all my movies info in them
	    // .map gives us back a new array that we can display
	    profileJsx = this.state.userprofile.map((profile) => (
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
	          <Card.Text style={{ fontFamily: 'Satisfy', fontSize: '25px' }}>
	            {profile.bio}
	          </Card.Text>
	          <Button
	            variant='dark'
	            onClick={() => history.push(`/userprofile/${profile.id}/update`)}>
							Update
	          </Button>
	          <Button
	            data-id={profile.id}
	            variant='danger'
	            onClick={this.handleClick}>
							Delete
	          </Button>
	        </Card.Body>
	      </Card>
	    ))
	  }

	  return <div style={cardContainerLayout}>{profileJsx}</div>
	}
}
export default withRouter(ShowProfile)
