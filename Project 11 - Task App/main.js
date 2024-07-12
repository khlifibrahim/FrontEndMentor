let addTaskInput = document.querySelector(".add-task-section input");
let addTaskBtn = document.querySelector(".add-task-section .add-btn");
let taskContaine = document.querySelector(".task-containe");
let totalTask = document.querySelector(".info .tasks");
let taskCompleted = document.querySelector(".info .completed");
let deleteAll = document.querySelector(".delete-all");
let completeAll = document.querySelector(".complete-all");

window.onload = function () {
  addTaskInput.focus();
  noTaskMsg();
};

addTaskBtn.addEventListener("click", () => {
  // check if the field is empty
  
  // console.log(pg.innerHTML)
  if (addTaskInput.value !== "" ) {

    let pg = document.querySelector('.paragraph');

      if(document.body.contains(pg) && addTaskInput.value !== pg.innerHTML) {
        console.log("this item already exist")
        
      }else {
        console.log(pg)
      }

      let taskContent = document.createElement("div");
      taskContent.className = "task-content";
      let paragraph = document.createElement("p");
      paragraph.className = "paragraph";
      paragraph.appendChild(document.createTextNode(addTaskInput.value));
      let left = document.createElement("div");
      left.className = "left";
      let completeBtn = document.createElement("input");
      completeBtn.setAttribute("type", "checkbox");
      completeBtn.className = "complete";
      let deleteBtn = document.createElement("span");
      deleteBtn.className = "delete";
      taskContent.appendChild(left);
      left.appendChild(completeBtn);
      left.appendChild(paragraph);
      taskContent.appendChild(deleteBtn);
      taskContaine.appendChild(taskContent);

      addTaskInput.value = "";
      addTaskInput.focus();
      noTaskMsg();
      
      

    } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No Task Added!",
    });
  }
});

// function to show no task message

function noTaskMsg() {
  let tasklength = Array.from(
    document.querySelectorAll(".task-containe .task-content")
  );

  if (tasklength >= 0) {
    let textMsg = document.createElement("p");
    textMsg.className = "no-task-message";
    let msgText = document.createTextNode("No task to show");
    textMsg.appendChild(msgText);
    taskContaine.appendChild(textMsg);
  } else {
    if (document.body.contains(document.querySelector(".no-task-message"))) {
      document.querySelector(".no-task-message").remove();
    }
  }
  totalTask.innerHTML = `Tasks: ${tasklength.length}`;
}

// delete task
document.addEventListener("click", (e) => {
  if (e.target.className == "delete") {
    e.target.parentNode.remove();
    if (taskContaine.childElementCount == 0) {
      noTaskMsg();
    }
  }

  if (e.target.classList.contains("complete")) {
    e.target.parentNode.parentNode.classList.toggle("finished");
  }
  let taskfinished = Array.from(
    document.querySelectorAll(".task-containe  .task-content.finished")
  );
  taskCompleted.innerHTML = `Completed: ${taskfinished.length}`;
});

// delete all tasks

deleteAll.addEventListener("click", () => {
  if (document.body.contains(document.querySelector(".no-task-message"))) {
    return false;
  } else {
    while (taskContaine.firstChild) {
      taskContaine.removeChild(taskContaine.firstChild);
    }
  }
  totalTask.innerHTML = `Tasks: ${0}`;
});
completeAll.addEventListener("click", () => {
  const children = taskContaine.children;
  if (document.body.contains(document.querySelector(".no-task-message"))) {
    return false;
  } else {
    for (i = 0; i < children.length; i++) {
      const child = children[i];
      child.classList.toggle("finished");
    }
  }
});
