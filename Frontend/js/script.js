/*Components */
const element=document.getElementById("all-tasks")
const taskForm=document.getElementById("task-form")

//when Create form is fine send request
taskForm.addEventListener("submit", function(e){
    e.preventDefault()
    
    createTask()
})

const backBtn=document.getElementById('back-btn')
backBtn.addEventListener("click", function(e){
    window.location.href="/Frontend/main.html"
})

//download my tasks
fetch("http://127.0.0.1:8000/myTasks/"+ localStorage.getItem('token'))
.then((response) => {
    return response.json()
}).then((data)=>{
    console.log(data);
    displayTasks(data);
})


//send createe task request
async function createTask(){
    let title=taskForm.elements["taskField"]
    let desc=taskForm.elements["descriptionField"]
    task={'title': title.value, 'description':desc.value }
    const response= await fetch("http://127.0.0.1:8000/myTasks/"+ localStorage.getItem('token'), {
        method: "POST",
        headers:{'Content-type': 'application/json'},
        body: JSON.stringify(task)
    })
    
    if(!response.ok){
        throw Error(response.statusText)
    }
    const data= await response.json();

}

//send request with change task status
async function checkboxClick(id, task){
    let cBox=document.getElementById(id)
    task.is_done=!task.is_done
    const response= await fetch("http://127.0.0.1:8000/myTasks/"+ localStorage.getItem('token')+"/"+id, {
        method: "PUT",
        headers:{'Content-type': 'application/json'},
        body: JSON.stringify(task)
    })
    
    if(!response.ok){
        throw Error(response.statusText)
    }
    const data= await response.json();
    console.log(data)
    cBox.checked=data.is_done
    

}

//generate all tasks as task cards
function displayTasks(data){

    
    for (let i=0; i<data.length; i++){

        //============Create all needed elements============
        let cont=document.createElement("div")
        cont.classList.add("container")

        let task=document.createElement("div")
        task.classList.add("task-card")

        let title=document.createElement("h1")
        title.classList.add("task-title")

        let p=document.createElement("p")
        p.classList.add("task-description")

        let row=document.createElement("div")
        row.classList.add("row")
        
        let col1=document.createElement("div")
        col1.classList.add("column")
        col1.classList.add("task-date")

        let col2=document.createElement("div")
        col2.classList.add("column")

        //============Checkbox generate with logic============
        let checkbox = document.createElement("input")
        checkbox.setAttribute("type", "checkbox")
        checkbox.setAttribute("id", data[i].id)
        checkbox.checked=data[i].is_done
        checkbox.addEventListener('change', function(e){
            
            checkboxClick(checkbox.id, data[i])
        })

        //============Inject data============
        let title_text=document.createTextNode(data[i].title)
        let description=document.createTextNode( data[i].description)
        let date=document.createTextNode( data[i].create_date)



        


        //============Connect components into task card============
        title.appendChild(title_text)
        task.appendChild(title)

        p.appendChild(description)
        task.appendChild(p)
        
        col1.appendChild(date)
        col2.appendChild(checkbox)

        row.appendChild(col1);
        row.appendChild(col2);

        task.appendChild(row)
        

        cont.appendChild(task)

        element.appendChild(cont)
    }
}