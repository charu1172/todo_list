const todoinput = document.querySelector('.todo-input'); //textfield
const todobtn = document.querySelector('.todo-btn');   //add btn
const todolist = document.querySelector('.todo-list'); //ul
const filteroption =  document.querySelector('.filter-todo'); 
const date = document.querySelector('.date');


// Date

//const obj = {weekday : "long", month: "long", day: "numeric"};
const today = new Date();
date.innerHTML = today.toDateString("en-us", today);

//Event listeners

document.addEventListener('DOMContentLoaded', getlocal);
todobtn.addEventListener('click', addtodo);
todolist.addEventListener('click', listbtns);
filteroption.addEventListener('click', filterTodo);

//Functions

function addtodo(event){

    event.preventDefault();
    //console.log("hi");

    // Todo div
    const tododiv = document.createElement('div');
    tododiv.classList.add('todo');
    
    // Create li
    const newtodo = document.createElement('li');
    //newtodo.innerText = "hey";
    newtodo.innerText = todoinput.value;
    newtodo.classList.add('todo-item');
    tododiv.appendChild(newtodo);

    savelocal(todoinput.value);

    // Checked btn
    const compbtn = document.createElement('button');
    compbtn.innerHTML = '<i class = "fas fa-check"></i>';
    compbtn.classList.add("comp-btn");
    tododiv.appendChild(compbtn);
    
    // Delete btn
    const delbtn = document.createElement('button');
    delbtn.innerHTML = '<i class = "fas fa-trash"></i>';
    delbtn.classList.add("del-btn");
    tododiv.appendChild(delbtn);

    // Append the above i.e; todo-list class
    todolist.appendChild(tododiv);
    
    
    // To clear todoinput value
    todoinput.value = "";

}

function listbtns(e){


    const li = e.target;
    if(li.classList[0] === "del-btn")
    {
       const todo = li.parentElement;
       removefromlocal(todo);
       todo.remove();
    }

    if(li.classList[0] === "comp-btn")
    {
        const todo = li.parentElement;
        todo.classList.toggle("completed");  
    
    }
}

    function filterTodo(e)
    {
        const todos = todolist.childNodes;
        console.log(todos);
        todos.forEach(function(todo){
              console.log(todo);
            switch(e.target.value){
                case "all":
                    todo.style.display = "flex";
                    break;
                case "completed":
                    if(todo.classList.contains('completed'))
                    {
                        todo.style.display = "flex";
                    }
                    else
                    {
                        todo.style.display = "none";
                    }
                    break;

                case "left":
                    if(!todo.classList.contains("completed"))
                    {
                        todo.style.display = "flex";
                    }
                    else
                    {
                        todo.style.display = "none";
                    }
                    break;
            }
        });
        
    }

    function savelocal(todo){

        let todos;
        if(localStorage.getItem('todos') === null)
        {
            todos = [];
        }
        else
        {
            todos = JSON.parse(localStorage.getItem('todos'));
        }
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    
    function getlocal(){

        let todos;
        if(localStorage.getItem('todos') === null)
        {
            todos = [];
        }
        else
        {
            todos = JSON.parse(localStorage.getItem('todos'));
        }

    todos.forEach(function(todo){

        // Todo div
        const tododiv = document.createElement('div');
        tododiv.classList.add('todo');
        
        // Create li
        const newtodo = document.createElement('li');
        //newtodo.innerText = "hey";
        newtodo.innerText = todo;
        newtodo.classList.add('todo-item');
        tododiv.appendChild(newtodo);
    
        // Checked btn
        const compbtn = document.createElement('button');
        compbtn.innerHTML = '<i class = "fas fa-check"></i>';
        compbtn.classList.add("comp-btn");
        tododiv.appendChild(compbtn);
        
        // Delete btn
        const delbtn = document.createElement('button');
        delbtn.innerHTML = '<i class = "fas fa-trash"></i>';
        delbtn.classList.add("del-btn");
        tododiv.appendChild(delbtn);
    
        // Append the above i.e; todo-list class
        todolist.appendChild(tododiv);
    
    })
   }


   function removefromlocal(todo){

    let todos;
    if(localStorage.getItem('todos') === null)
    {
        todos = [];
    }
    else
    {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
       const todoindex = (todo.children[0].innerText);
       //console.log(todos.indexOf())
       todos.splice(todos.indexOf(todoindex), 1);
       localStorage.setItem('todos', JSON.stringify(todos));
   }