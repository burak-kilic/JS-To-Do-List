const input = document.querySelector("#task");
const add = document.querySelector("#liveToastBtn");  
const list = document.querySelector("#list");
let taskListArray = [];

loadedPage();

add.addEventListener("click", newElement);
input.addEventListener("keyup", function(e){
    if(e.keyCode === 13){
        newElement();
    }
})
list.addEventListener("click", deleteElement);
list.addEventListener("click", taskComplete);

function crtElement(){
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.classList.add("close");
    span.innerHTML = "X";
    li.innerHTML = `<span> ${input.value} </span>`;
    taskListArray.push(input.value);
    li.appendChild(span);
    list.appendChild(li);
}

function newElement(){
    if(input.value.trim() != "" && input.value.trim() != " "){
        if(taskListArray.includes(input.value)){
            $('.error2').toast('show')
        }
        else{
            $('.success').toast('show')
            crtElement();
            loadStorage(input.value);
            input.value = "";
        }
        
    }
    else{
        $('.error1').toast('show')
    }
}
function deleteElement(e){
    if(e.target.className === "close"){
        if(confirm("Silmek istediğinize emin misiniz?")){
            e.target.parentElement.remove();
            let prm = e.target.parentElement.firstChild.nextElementSibling.textContent.trim();
            deleteStorage(prm);
            let index = taskListArray.indexOf(e.target.parentElement.firstChild.nextElementSibling.textContent.trim());
            taskListArray.splice(index, 1);
        }
        else{
            e.target.parentElement.classList.toggle("checked");
        }
    }
}
function taskComplete(event){
    event.target.parentElement.classList.toggle("checked");
}

function loadStorage(param){
    let storage = JSON.parse(localStorage.getItem("todo"));
    let toDoArr;
    if(storage == null){
        toDoArr = [];
    }
    else{
        toDoArr = getStorage();
    }
    toDoArr.push(param);
    localStorage.setItem("todo", JSON.stringify(toDoArr));
}
function getStorage(){
    let toDo = JSON.parse(localStorage.getItem("todo"));
    return toDo;
}

function deleteStorage(prm){
    let toDo = getStorage();
    toDo.forEach(function(element, id){
        if(element === prm){
            toDo.splice(id, 1);
        }       
    });
    localStorage.setItem("todo", JSON.stringify(toDo));
}

function loadedPage(){
    let toDo = getStorage();
    
    if(toDo != null){
        let content;
        for(let i = 0; i < toDo.length; i++){
            taskListArray.push(toDo[i]);
            content = `<li> <span> ${toDo[i]}</span> <span class= "close"> X </span> </li>`;
            list.innerHTML += content;
        }

    }
}