/* eslint-disable no-tabs */
import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link, NavLink } from 'react-router-dom'

const authenticatedOptions = (
  <Fragment>
    <NavLink to='/userprofile' className='nav-link'>
			Profile
    </NavLink>
    <NavLink to='/likes' className='nav-link'>
			Likes
    </NavLink>
    <NavLink to='/change-password' className='nav-link'>
			Change Password
    </NavLink>
    <NavLink to='/sign-out' className='nav-link'>
			Sign Out
    </NavLink>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <NavLink to='/sign-up' className='nav-link'>Sign Up</NavLink>
    <NavLink to='/sign-in' className='nav-link'>Sign In</NavLink>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <NavLink to='/profiles' className='nav-link'>Home</NavLink>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar bg='primary' variant='dark' expand='md'>
    <Navbar.Brand>
      <Link to='/' style={{ color: '#FFF', textDecoration: 'none' }}>
				Plenty of Cats
      </Link>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls='basic-navbar-nav' />
    <Navbar.Collapse id='basic-navbar-nav' className='justify-content-end'>
      <Nav className='ml-auto'>
        {user && (
          <span className='navbar-text mr-2'>Welcome, {user.email}</span>
        )}
        {alwaysOptions}
        {user ? authenticatedOptions : unauthenticatedOptions}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
