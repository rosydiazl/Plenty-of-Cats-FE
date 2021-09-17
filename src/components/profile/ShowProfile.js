/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
import React, { Component } from 'react'
import { indexUserProfile } from '../../api/profile'
import { withRouter } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'

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
          heading: 'Success',
          message: 'Here\'s the profiles',
          variant: 'success'
        })
      )
      .catch((err) =>
        msgAlert({
          heading: 'Index failed :(',
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
    const { userprofile } = this.state
    // This is what prevents the "cannot read property map of undefined" or other similar errors because on the first render, `movies` state will be `null`
    if (userprofile === null) {
      return 'Loading...'
    }

    let profileJsx
    console.log('This is the user profile', this.state.userprofile)
    if (this.state.userprofile.length === 0) {
      profileJsx = 'You do not have a profile yet. Create one!'
    } else {
      // I want movieJsx to be a bunch of li or Link or something with all my movies info in them
      // .map gives us back a new array that we can display
      profileJsx = this.state.userprofile.map((profile) => (
        <Card key={profile.id} style={{ width: '18rem', marginTop: '40px' }}>
          <Card.Body></Card.Body>
          <Card.Body>
            <Card.Title>{profile.name}</Card.Title>
            <Card.Text>{profile.age}</Card.Text>
            <Card.Text>{profile.breed}</Card.Text>
            <Card.Text>{profile.bio}</Card.Text>
            <Card.Text>{profile.image}</Card.Text>
            <Button variant='danger'>Delete</Button>
            <Button variant='dark'>Update</Button>
          </Card.Body>
        </Card>
      ))
    }

    return <div style={cardContainerLayout}>{profileJsx}</div>
  }
}
export default withRouter(ShowProfile)
