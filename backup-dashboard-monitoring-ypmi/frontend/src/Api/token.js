// config
export const accessToken = () => {
  let config = {}
  if(localStorage.getItem('user')){
    config = {
      headers: {
          'x-access-token': `${JSON.parse(localStorage.getItem('user')).accessToken}`,
          'Content-Type': 'application/json'
      }
    }
    return config
  }
  else {
    return ''
  }
}