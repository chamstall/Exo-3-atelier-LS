let form = document.querySelector("form");
let input = document.querySelector("#input");
let msg = document.querySelector("#msg");
let tasks = [];
let archivedTasks = [];  //tableau pour archiver les tâches ;

form.addEventListener("submit" , (e) =>{
    e.preventDefault();
    console.log("succes");
    addTask();
})
window.onload = function (){
    let savedTasks = localStorage.getItem("tasks");
    let savedArchivedTasks = localStorage.getItem("archivedTasks");
    if (savedTasks){
        let tasks = JSON.parse(savedTasks) ;
        for(let i = 0 ; i < tasks.length ; i++){
            addTaskToList(tasks[i]);
        }
    }
    if (savedArchivedTasks){
        let archivedTasks = JSON.parse(savedArchivedTasks) ;
        for(let i = 0 ; i < archivedTasks.length ; i++){
            addTaskToList(archivedTasks[i]);
        }
    }
}

// fonction qui permet de recuperer les donnés du LStorage lors du chargement de la page .

function addTask (){
    let input = document.querySelector("#input");
    let task = input.value;
    if (task === ""){
        msg.innerHTML = "You have to write something !" ;
    }
    else{
        console.log("success");
        msg.innerHTML = ""; 
        addTaskToList(task);
        input.value = "";
        tasks.push(task);
        saveToLocalStorage();
    }
}

function addTaskToList(task){
    let tasksList = document.querySelector("#tasksList");
    tasksList.innerHTML += ` 
    <tr> 
        <td class="border-2  td-task">
            <div class="td-8"> <p> ${task} </p> </div>
        </td>
        <td class="border-2 ">
            <div class="td-4 ">
                <span><i class="fa-solid fa-pen-to-square" onclick="edit(this)"></i></span>
                <span><i class="fa-solid fa-trash" onclick="supprimer(this)"></i></span>
                <span><i class="fa-solid fa-box-archive" onclick="archiveTasks('${task}')"></i></span>
            </div>
        </td>
    </tr> ` 
}

// fonction pour enregistrer les tâche dans le localstorage
function saveToLocalStorage (){
    localStorage.setItem("tasks" , JSON.stringify(tasks));
}

// fonction pour modifier une tâche
function edit(e){
    input.value = e.parentElement.parentElement.parentElement.previousElementSibling.innerText
    e.parentElement.parentElement.parentElement.parentElement.remove();
}


// fonction pour supprimer une tâche
function supprimer (e){
    e.parentElement.parentElement.parentElement.parentElement.remove();
    // const index = tasks.indexOf(task);
    // if (index !== -1){
    //     tasks.splice(index , 1);
    // }
}

// archive de taches 


// fonction pour archiver 
function archiveTasks(task){
    // je verifie si la tâche existe dans le tableau de taches enregistrées (le tableau tasks)
    const index = tasks.indexOf(task);
    if (index !== -1){
        // je supprime la tâche actuel 
        tasks.splice(index , 1);
        // j'ajoute la tâche supprimée au tableau d'archives
        archivedTasks.push(task)
        saveToLocalStorage();
        localStorage.setItem("archivedTasks" , JSON.stringify(archivedTasks));
    }
    else{
        console.log("tâche non trouvée :" , task)
    }
}


