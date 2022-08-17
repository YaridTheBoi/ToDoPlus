
fetch("http://127.0.0.1:8000/myTasks/"+ localStorage.getItem('token'))
.then((response) => {
    return response.json()
}).then((data)=>{
    console.log(data);
    displayTasks(data);
})



function displayTasks(data){

    const element=document.getElementById("all-tasks")
    for (let i=0; i<data.length; i++){
        let cont=document.createElement("div")
        cont.classList.add("container")

        let task=document.createElement("div")
        task.classList.add("task-card")

        let title=document.createElement("h1")
        title.classList.add("task-title")

        let title_text=document.createTextNode(data[i].title)
        let description=document.createTextNode( data[i].description)
        let date=document.createTextNode( data[i].create_date)
        let p=document.createElement("p")
        p.classList.add("task-description")
        let p2=document.createElement("p")
        p2.classList.add("task-date")

        title.appendChild(title_text)
        task.appendChild(title)

        p.appendChild(description)
        task.appendChild(p)
        
        p2.appendChild(date)
        task.appendChild(p2)
        cont.appendChild(task)

        element.appendChild(cont)
    }
}