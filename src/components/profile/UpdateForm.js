/* eslint-disable no-tabs */
import React from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const UpdateForm = ({ profile, handleSubmit, handleChange }) => (
  <div className='row'>
    <div className='col-sm-10 col-md-8 mx-auto mt-5'>
      <h3>Update Profile</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='name'>
          <Form.Control
            required
            name='name'
            value={profile.name}
            type='text'
            placeholder='Name'
            style={{ marginBottom: '10px' }}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId='age'>
          <Form.Control
            required
            name='age'
            value={profile.age}
            type='number'
            placeholder='Age'
            style={{ marginBottom: '10px' }}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId='breed'>
          <Form.Control
            required
            name='breed'
            value={profile.breed}
            type='text'
            placeholder='Breed'
            style={{ marginBottom: '10px' }}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId='bio'>
          <Form.Control
            required
            name='bio'
            value={profile.bio}
            type='textarea'
            placeholder='Bio'
            style={{ height: '100px', marginBottom: '10px' }}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant='dark' type='submit'>
					Submit
        </Button>
      </Form>
    </div>
  </div>
)

export default UpdateForm
