const loginLink=document.getElementById("login-link")
console.log(localStorage.getItem('token') )
const logoutHandler=function(e){
    e.preventDefault()
    logout()
}

if(localStorage.getItem('token') != ""){
    loginLink.innerHTML="LOGOUT"
    loginLink.addEventListener("click",logoutHandler)
    
}



async function logout(){
    console.log("logging out")
    console.log(localStorage.getItem('token'))
    const response= await fetch("http://127.0.0.1:8000/users/logout/"+ localStorage.getItem('token'))
    if(!response.ok){
        throw Error(response.statusText)
    }else{
        localStorage.setItem('token', "")
        loginLink.innerHTML="LOGIN"
        loginLink.removeEventListener("click",logoutHandler)
    }
    
    

}
