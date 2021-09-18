/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

// import axios from 'axios'
// import axios from 'axios'
import { createProfile } from '../../api/profile'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class CreateProfile extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      age: '',
      breed: '',
      bio: ''
    }
  }

	handleChange = (e) => {
	  this.setState({
	    [e.target.id]: e.target.value
	  })
	}

	onCreateProfile = (e) => {
	  e.preventDefault()

	  const { msgAlert, history, user } = this.props
	  // console.log('This state is', this.state)
	  // console.log('These are props', this.props)

	  createProfile(this.state, user)
	    .then((res) => {
	     // console.log('Res data is', res.data)
	    })
	    .then(() =>
	      msgAlert({
	        heading: 'Success',
	        message: 'Profile created successfully!',
	        variant: 'success'
	      })
	    )
	    .then(() => history.push('/'))
	    .catch((error) => {
	      this.setState({ name: '', age: '', breed: '', bio: '' })
	      msgAlert({
	        heading: 'Unable to create profile. Error: ' + error.message,
	        message: 'Create Profile failed.',
	        variant: 'danger'
	      })
	    })
	}

	render () {
	  return (
	    <div className='row'>
	      <div className='col-sm-10 col-md-8 mx-auto mt-5'>
	        <h3>Create Profile</h3>
	        <Form onSubmit={this.onCreateProfile}>
	          <Form.Group controlId='name'>
	            <Form.Control
	              required
	              name='name'
	              value={this.state.name}
	              type='text'
	              placeholder='Name'
	              style={{ marginBottom: '10px' }}
	              onChange={this.handleChange}
	            />
	          </Form.Group>
	          <Form.Group controlId='age'>
	            <Form.Control
	              required
	              name='age'
	              value={this.state.age}
	              type='number'
	              placeholder='Age'
	              style={{ marginBottom: '10px' }}
	              onChange={this.handleChange}
	            />
	          </Form.Group>
	          <Form.Group controlId='breed'>
	            <Form.Select
	              aria-label='Default select example'
	              required
	              name='breed'
	              value={this.state.breed}
	              style={{ marginBottom: '10px' }}
	              onChange={this.handleChange}>
	              <option>Breed</option>
	              <option value='1'>Russian Blue</option>
	              <option value='2'>Persian Cat</option>
	              <option value='3'>Ragdoll</option>
	              <option value='4'>Begal Cat</option>
	              <option value='5'>Birman</option>
	              <option value='6'>Siberian Cat</option>
	              <option value='7'>Bombay Cat</option>
	              <option value='8'>Korat Cat</option>
	              <option value='9'>Thai Cat</option>
	              <option value='10'>Sphynx Cat</option>
	            </Form.Select>
	          </Form.Group>
	          <Form.Group controlId='bio'>
	            <Form.Control
	              required
	              name='bio'
	              value={this.state.bio}
	              type='textarea'
	              placeholder='Bio'
	              style={{ height: '100px', marginBottom: '10px' }}
	              onChange={this.handleChange}
	            />
	          </Form.Group>
	          <Button variant='primary' type='submit'>
							Submit
	          </Button>
	        </Form>
	      </div>
	    </div>
	  )
	}
}

export default withRouter(CreateProfile)
