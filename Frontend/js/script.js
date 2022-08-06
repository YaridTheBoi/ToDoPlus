function getTasks(){
    fetch("http://127.0.0.1:8000/myTasks/"+ localStorage.getItem('token'))
    .then((response) => {
        return response.json()
    }).then((data)=>{
        console.log(data);
        displayTasks(data);
    })

}

function displayTasks(data){


    for (var i=0; i<data.length; i++){
        var element=document.getElementById("all-tasks")
        var task=document.createElement("div")

        var title=document.createElement("H1")
        var title_text=document.createTextNode(data[i].title)
        var description=document.createTextNode("description: "+ data[i].description)
        var date=document.createTextNode("created: "+ data[i].create_date)
        var p=document.createElement("p")
        var p2=document.createElement("p")

        title.appendChild(title_text)
        task.appendChild(title)

        p.appendChild(description)
        task.appendChild(p)
        
        p2.appendChild(date)
        task.appendChild(p2)


        element.appendChild(task)
    }
}