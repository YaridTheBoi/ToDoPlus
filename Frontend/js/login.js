
const loginFrom= document.getElementById('login-form')
loginFrom.addEventListener("submit", function(e){
    e.preventDefault()
    loginClick()
})


function loginClick(){
    
    const username=document.getElementById("username-field").value;
    const password=document.getElementById("password-field").value;
    let result={"login":username, "password":password};
    console.log(JSON.stringify(result))
    postLogin(result)
}

function postLogin(data){
    
    fetch("http://127.0.0.1:8000/users/login/" , {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(data)
    }).then((response) =>{
        if(!response.ok){
            throw Error (response.statusText)
        }
        return response.json()
    }).then((data)=>{
        localStorage.setItem("token", data.token)
        console.log(data)
        window.location.href="/Frontend/main.html"
        //console.log(localStorage.getItem('token'))
    }).catch((error)=> {
        console.log(error)
        localStorage.setItem("token", "")
        //window.alert("Incorrect password or username")
    });
}