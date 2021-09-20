import apiUrl from '../apiConfig'
import axios from 'axios'

export const likeProfiles = (data, user) => {
  return axios({
    url: apiUrl + '/likes/',
    method: 'POST',
    data: { likes: data },
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

export const showLikes = (user) => {
  return axios({
    url: apiUrl + '/likes/',
    method: 'GET',
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}

export const removeLike = (id, user) => {
  return axios({
    url: apiUrl + '/likes/' + id + '/',
    method: 'DELETE',
    headers: {
      Authorization: `Token ${user.token}`
    }
  })
}
