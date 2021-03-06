/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
import React, { Component } from 'react'
import { showLikes, removeLike } from '../../api/likes'
import { withRouter } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'
import { Image } from 'cloudinary-react'

class ShowLikes extends Component {
  constructor (props) {
    super(props)
    this.state = {
      likes: []
    }
  }

  componentDidMount () {
    const { user, msgAlert } = this.props
    showLikes(user)
      .then((response) => {
        this.setState({
          likes: response.data.likes
        })
      })
      .then(() =>
        msgAlert({
          heading: 'Your Purrs',
          message: 'Here are all your likes!',
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
	  const { user, msgAlert, history } = this.props
	  event.preventDefault()
	  const likeDataId = event.target.attributes.getNamedItem('data-id').value
	  removeLike(likeDataId, user)
	    .then(() =>
	      msgAlert({
	        heading: 'Hiss',
	        message: 'Profile has been removed from Purrs.',
	        variant: 'success'
	      })
	    )
	    .then(() => history.push('/likes'))
	    .then(() => showLikes(user)
	      .then((response) => {
	        this.setState({
	          likes: response.data.likes
	        })
	      })
	    )
	    .catch((err) =>
	      msgAlert({
	        heading: 'Removal failed',
	        message: 'Unable to remove profile from your Purrs: ' + err.message,
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
	  const { likes } = this.state
	  // console.log('THE LIKES', this.state.likes)
	  // This is what prevents the "cannot read property map of undefined" or other similar errors because on the first render, `likes` state will be `null`
	  if (likes === null) {
	    return 'Loading...'
	  }

	  let likesJsx
	  if (this.state.likes.length === 0) {
	    likesJsx = 'No likes yet. Go purr some profiles!'
	  } else {
	    // I want movieJsx to be a bunch of li or Link or something with all my movies info in them
	    // .map gives us back a new array that we can display
	    likesJsx = this.state.likes.map((like) => (
	      <Card key={like.id} style={{ width: '18rem', marginTop: '5px' }}>
	        <Card.Body>
	          <Card.Title>
	            <strong>{like.name}</strong>
	          </Card.Title>
	          <Image
	            cloudName='doz8kotw7'
	            style={{ objectFit: 'cover' }}
	            height='191'
	            publicId='https://res.cloudinary.com/doz8kotw7/image/upload/v1631985746/jqaomhzzofunvjn6jzt4.jpg'
	          />
	          <Card.Text>{like.age} years old</Card.Text>
	          <Card.Text>{like.breed}</Card.Text>
	          <Card.Text style={{ fontFamily: 'Satisfy', fontSize: '25px' }}>
	            {like.bio}
	          </Card.Text>
	          <Button
	            variant='dark'
	            data-id={like.id}
	            onClick={this.handleClick}
	            style={{ paddingRight: '200px', alignItems: 'center' }}>
							HISS
	          </Button>
	        </Card.Body>
	      </Card>
	    ))
	  }

	  return <div style={cardContainerLayout}>{likesJsx}</div>
	}
}
export default withRouter(ShowLikes)
