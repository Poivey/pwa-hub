const b64DecodeUnicode = str => {
  return decodeURIComponent(
    atob(str)
      .split('')
      .map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )
}

export default function(body) {
  return body && JSON.parse(b64DecodeUnicode(body))
}
