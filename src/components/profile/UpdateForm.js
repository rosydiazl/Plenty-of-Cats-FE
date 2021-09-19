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
          <Form.Select
            aria-label='Default select example'
            required
            name='breed'
            value={profile.breed}
            style={{ marginBottom: '10px' }}
            onChange={handleChange}>
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
            value={profile.bio}
            type='textarea'
            placeholder='Bio'
            style={{ height: '100px', marginBottom: '10px' }}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
			Submit
        </Button>
      </Form>
    </div>
  </div>
)

export default UpdateForm
