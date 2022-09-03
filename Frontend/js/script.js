//if there is no token redirect to login
if(localStorage.getItem('token') == ""){
    window.location.href="/Frontend/login.html"
}


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
        checkbox.style.zIndex="20";
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
        task.setAttribute("id", data[i].id)

        title.appendChild(title_text)
        task.appendChild(title)

        p.appendChild(description)
        task.appendChild(p)
        
        col1.appendChild(date)
        col2.appendChild(checkbox)

        row.appendChild(col1);
        row.appendChild(col2);

        task.appendChild(row)

        //create popup
        let editPopup=document.createElement("div")
        editPopup.classList.add("popup")
        editPopup.classList.add("task-create")


        //create form
        let editForm=document.createElement("form")

        //title input
        let firstEditInput=document.createElement("div")
        firstEditInput.classList.add("form-input")

        let firstEditInputIcon=document.createElement("i")
        firstEditInputIcon.classList.add("fa-solid")
        firstEditInputIcon.classList.add("fa-bars")

        let firstEditInputText=document.createElement("input")
        firstEditInputText.setAttribute("type", "text")
        firstEditInputText.setAttribute("id", "task-field")
        firstEditInputText.setAttribute("name", "taskField")
        firstEditInputText.setAttribute("value", title_text.nodeValue)
        firstEditInputText.setAttribute("placeholder", "Task Title")


        firstEditInput.appendChild(firstEditInputIcon)
        firstEditInput.appendChild(firstEditInputText)
        editForm.appendChild(firstEditInput)

        

        //description input
        let secondEditInput=document.createElement("div")
        secondEditInput.classList.add("form-input")

        let secondEditInputIcon=document.createElement("i")
        secondEditInputIcon.classList.add("fa-solid")
        secondEditInputIcon.classList.add("fa-comment")

        let secondEditInputText=document.createElement("input")
        secondEditInputText.setAttribute("type", "text")
        secondEditInputText.setAttribute("id", "description-field")
        secondEditInputText.setAttribute("name", "descriptionField")
        secondEditInputText.setAttribute("value", description.nodeValue)
        secondEditInputText.setAttribute("placeholder", "Description")


        secondEditInput.appendChild(secondEditInputIcon)
        secondEditInput.appendChild(secondEditInputText)
        editForm.appendChild(secondEditInput)


        //close popup button
        let editExit=document.createElement("i")
        editExit.classList.add("fa-solid")
        editExit.classList.add("fa-x")
        editExit.classList.add("fa-2x")
        editExit.addEventListener("mouseover", function(e){
            editExit.style.cursor="pointer"
        } )

        editExit.addEventListener("click", function(e){
            editPopup.style.opacity="0";
            editPopup.style.transform="scale(0)";
            secondEditInputText.setAttribute("value", description.nodeValue)
            firstEditInputText.setAttribute("value", title_text.nodeValue)
        } )



        //buttons
        let editButton=document.createElement("button")
        editButton.appendChild(document.createTextNode("Edit"))
        editButton.addEventListener("click", function(e){
            editTask(data[i], firstEditInputText.value, secondEditInputText.value)
        })


        let removeButton=document.createElement("button")
        removeButton.appendChild(document.createTextNode("Remove"))
        removeButton.addEventListener("click", function(e){
            editPopup.style.opacity="0";
            editPopup.style.transform="scale(0)";
            task.style.opacity="0";
            task.style.transform="scale(0)";
            removeTask(data[i])
        })

        let popupRow=document.createElement("div")
        popupRow.classList.add("row")
        popupRow.style.width="50%";
        popupRow.style.justifyContent="center"


        //connect all stuff
        popupRow.appendChild(removeButton)
        popupRow.appendChild(editButton)
        

        editPopup.appendChild(editExit)
        editPopup.appendChild(editForm)
        editPopup.appendChild(popupRow)





        //============Add event lsitener to task card============

        task.addEventListener("click", function(e){
            
            if(e.target.nodeName!="INPUT"){
                editPopup.style.opacity="1";
                editPopup.style.transform="scale(1)";
                editPopup.style.height="95%";
                editPopup.style.width="60%";
            }

            

        })

        if(data[i].is_done){
            task.style.opacity="0.3";
        }

        //EventListener do task, popup do cont
        cont.appendChild(task)
        cont.appendChild(editPopup)
        element.appendChild(cont)
    }
}

async function editTask(task, newTitle, newDescription){

    task.title=newTitle
    task.description=newDescription
    const response= await fetch("http://127.0.0.1:8000/myTasks/"+ localStorage.getItem('token')+"/"+task.id, {
        method: "PUT",
        headers:{'Content-type': 'application/json'},
        body: JSON.stringify(task)
    })
    if(!response.ok){
        throw Error(response.statusText)
    }
    const data= await response.json();
    console.log(data)
    
}

async function removeTask(task){
    const response= await fetch("http://127.0.0.1:8000/myTasks/"+ localStorage.getItem('token')+"/"+task.id,{
        method: "DELETE",
        headers:{'Content-type': "application/json"},
        body: JSON.stringify(task)
    })
    if (!response.ok){
        throw Error(response.statusText)
    }
}