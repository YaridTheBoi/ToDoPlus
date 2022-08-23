
//get login link component
const loginLink=document.getElementById("login-link")
//console.log(localStorage.getItem('token') )

//function added to login link to change to logout
const logoutHandler=function(e){
    e.preventDefault()
    logout()
}

//if there is token change login to logout
if(localStorage.getItem('token') != ""){
    loginLink.innerHTML="LOGOUT"
    loginLink.addEventListener("click",logoutHandler)
    
}


//send logout request
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
