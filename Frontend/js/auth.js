function loginClick(){
    var username=document.getElementById("username-field").value;
    var password=document.getElementById("password-field").value;
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
        return response.json()
    }).then((data)=>{
        localStorage.setItem("token", data.token)
        //console.log(localStorage.getItem('token'))
    });
}