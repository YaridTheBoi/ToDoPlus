const queryString= window.location.search
const urlParams= new URLSearchParams(queryString)

const token= urlParams.get('token')
const user_id= urlParams.get('user_id')



console.log(token)
console.log(user_id)

window.history.pushState({},"", '/Frontend/resetPassword.html')