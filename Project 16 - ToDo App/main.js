const bodyBg = document.querySelector('.bg');
const darkModeIcon = document.querySelector('.dark-mode img');
const taskValue = document.querySelector('.add-task input');
const addTask = document.querySelector('.add-task .check');
const taskContainer = document.querySelector('.body-task .tasks');
const taskCounter = document.querySelector('.items-counter');
const allTasks = document.querySelector('#all');
const activeTasks = document.querySelector('#active');
const completedTasks = document.querySelector('#completed');
const clearCompletedTasks = document.querySelector('.clear-completed');
counter()



window.addEventListener('load', resposive)
taskContainer.addEventListener('click', deletefinish);
addTask.addEventListener('click', createTask);
allTasks.addEventListener('click', menu);
activeTasks.addEventListener('click', menu);
completedTasks.addEventListener('click', menu);
clearCompletedTasks.addEventListener('click', menu)

function resposive() {
    if (window.innerWidth <= 720) {
        bodyBg.src = "images/bg-mobile-light.jpg";
      } else {
        bodyBg.src = "images/bg-mobile-dark.jpg";
      }
}

darkModeIcon.addEventListener('click', ()=> {
    darkModeIcon.src = darkModeIcon.src.includes('sun') ? "images/icon-moon.svg" : "images/icon-sun.svg";
    
    if(document.body.classList.contains('dark')) {
        document.body.classList.remove('dark');
        if(window.innerWidth <= 375) {
            bodyBg.src = "images/bg-mobile-light.jpg";
        }else {
            bodyBg.src = "images/bg-desktop-light.jpg"
        }
    }else {
        document.body.classList.add('dark')
        if(window.innerWidth <= 375) {
            bodyBg.src = "images/bg-mobile-dark.jpg";
        }else {
            bodyBg.src = "images/bg-desktop-dark.jpg"
        }
    }
})



function createTask() {

    if(taskValue.value == '') {
        taskValue.parentElement.classList.add('error');
    }else {
        let taskContaine = document.createElement('div');
            taskContaine.className = 'task-container';
            taskContaine.setAttribute('draggable', 'true')

        let checkBtn = document.createElement('div');
            checkBtn.className = 'check';
        let iconCheck = document.createElement('img');
            iconCheck.src = "images/icon-check.svg";
            checkBtn.appendChild(iconCheck);

        let taskContent = document.createElement('p');
            taskContent.appendChild(document.createTextNode(taskValue.value))

        let cross = document.createElement('div');
            cross.className = 'cross';
        let iconCross = document.createElement('img');
            cross.appendChild(iconCross);
            iconCross.src = "images/icon-cross.svg";

        taskContaine.appendChild(checkBtn);
        taskContaine.appendChild(taskContent);
        taskContaine.appendChild(cross);
        taskContainer.appendChild(taskContaine);


        taskValue.value = '';
        taskValue.focus();
        taskValue.parentElement.classList.remove('error');
        
    }
    
    counter();
}

function deletefinish(e) {
    let item = e.target;
    
    if(item.classList[0] === 'check') {
        item.classList.toggle("completed");
        item.parentElement.classList.toggle("completed");
    }
    if(item.classList[0] === 'cross') {
            item.parentElement.remove();
    }
    
    counter()
}


function counter() {
    let taskArray = [...document.querySelectorAll('.task-container')];
    taskCounter.innerHTML = taskArray.length + " items left";
    

    taskArray.forEach(draggable => {
        draggable.addEventListener('dragstart', ()=> {
            draggable.classList.add('dragging');
        });
    
        draggable.addEventListener('dragend', ()=> draggable.classList.remove('dragging'))
    })

    const initSortableList = (e)=> {
        e.preventDefault()
        const draggingItem = taskContainer.querySelector('.dragging');

        const sibling = [...document.querySelectorAll('.task-container:not(.dragging)')];
        
        let nextSibling = sibling.find(sibling => {
            return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
        })
        
        taskContainer.insertBefore(draggingItem, nextSibling)
    }

    taskContainer.addEventListener('dragover', initSortableList);
}


function menu(e) {
    let items = Array.from(document.querySelectorAll('.task-container'));
    let itemsmenu = Array.from(document.querySelectorAll('.task-footer .container p'));

    items.forEach(function(todo) {
        switch (e.target.innerHTML) {
            case 'All':
                itemsmenu.forEach(link => {
                    link.style.color = 'var(--Dark-Grayish-Blue)';
                })
                e.target.style.color = 'var(--Bright-Blue)';
                todo.style.display = 'flex';
                break;
            case 'Active':
                itemsmenu.forEach(link => {
                    link.style.color = 'var(--Dark-Grayish-Blue)';
                })
                if(!todo.classList.contains('completed')) {
                    e.target.style.color = 'var(--Bright-Blue)';
                    todo.style.display = 'flex';
                }else {
                    e.target.style.color = 'var(--Dark-Grayish-Blue)';
                    todo.style.display = 'none';                    
                }
                break;
            case 'Completed':
                itemsmenu.forEach(link => {
                    link.style.color = 'var(--Dark-Grayish-Blue)';
                })
                if(todo.classList.contains('completed')) {
                    e.target.style.color = 'var(--Dark-Grayish-Blue)';
                    todo.style.display = 'flex';
                }else {
                    e.target.style.color = 'var(--Bright-Blue)';
                    todo.style.display = 'none';                    
                }
                break;
            case 'Clear Completed':
                items.forEach(task => {
                    if(task.classList.contains('completed')) {
                        task.remove()
                    }
                });
                counter()
                break;
                
        }
    })


}
