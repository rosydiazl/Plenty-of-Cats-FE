import apiUrl from '../apiConfig'
import axios from 'axios'

export const createProfile = (profile, user) => {
  // console.log('this is user in createProfile', user)
  // console.log('this is profile in createProfile', profile)
  return axios({
    url: apiUrl + '/profiles/',
    method: 'POST',
    headers: {
      Authorization: `Token ${user.token}`
    },
    data: {
      profile: {
        name: profile.name,
        age: profile.age,
        breed: profile.breed,
        bio: profile.bio,
        image: profile.image
      }
    }
  })
}

export const indexUserProfile = (user) => {
  console.log('this is user in createProfile', user)
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

export const showProfile = (user, id) => {
  return axios({
    url: apiUrl + '/profiles/' + id,
    method: 'get',
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}
