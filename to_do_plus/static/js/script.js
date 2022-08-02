function getTasks(){
    fetch("http://127.0.0.1:8000/myTasks")
    .then((response) => {
        return response.json()
    }).then((response)=>{
        console.log(response)
    })

}
/*
console.log("TEST")
*/