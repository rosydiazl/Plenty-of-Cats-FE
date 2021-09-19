import apiUrl from '../apiConfig'
import axios from 'axios'

export const createProfile = (profile, user) => {
  // console.log('this is user in createProfile', user)
  // console.log('this is profile in createProfile', profile)
  return axios({
    url: apiUrl + '/userprofile/',
    method: 'POST',
    headers: {
      Authorization: `Token ${user.token}`
    },
    data: {
      profile: {
        name: profile.name,
        age: profile.age,
        breed: profile.breed,
        bio: profile.bio
      }
    }
  })
}

export const indexUserProfile = (user) => {
  // console.log('this is user in createProfile', user)
  // console.log('this is profile in createProfile', profile)
  return axios({
    url: apiUrl + '/userprofile/',
    method: 'GET',
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

export const indexProfile = (user) => {
  // console.log('this is profile in createProfile', profile)
  return axios({
    url: apiUrl + '/profiles/',
    method: 'GET',
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

export const deleteProfile = (id, user) => {
  return axios({
    url: apiUrl + '/userprofile/' + id,
    method: 'DELETE',
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

export const updateProfile = (profile, id, user) => {
  console.log('This is user', user)
  console.log('This is profile', profile)
  console.log('This is ID', id)
  return axios({
    url: apiUrl + '/userprofile/' + id + '/',
    method: 'PATCH',
    headers: {
      Authorization: `Token ${user.token}`
    },
    data: {
      profile: {
        name: profile.name,
        age: profile.age,
        breed: profile.breed,
        bio: profile.bio
      }
    }
  })
}
