let todoItems = [];

let condition = true;
function initialisation() {
  if (condition) {
    document.querySelector("#blur-2").style.display = "none";
    document.querySelector("#blur").style.display = "block";
  } else {
    document.querySelector("#blur").style.display = "none";
    document.querySelector("#blur-2").style.display = "block";
  }
  if (todoItems.length === 0) {
    document.querySelector("#instruction").style.display = "block";
  } else {
    document.querySelector("#instruction").style.display = "none";
  }
}
initialisation();
function CardAdding(todo) {
  initialisation();
  const list = document.querySelector(".to-do-list");
  var child = list.lastElementChild;
  while (child) {
    list.removeChild(child);
    child = list.lastElementChild;
  }

  for (let i = 0; i < todoItems.length; i++) {
    const node = document.createElement("div");
    node.setAttribute("class", `card`);
    node.setAttribute("data-key", todoItems[i].id);
    node.innerHTML = `<p class="card-heading" onclick="DescribeTask(this)">${todoItems[i].heading}</p>
      <ul style="list-style-type:none;">
      </ul>
      <div class='add-remove'>
          <button class='btn-remove' onclick="removeToDo(this)"><i class="fa fa-trash"></i></button> 
          <p class = 'btn-add' onclick="Add_item_popup(this)"><i class="fa fa-plus-circle"></i></p>
      </div>
      `;
    list.append(node);
    let currentTodo = todoItems[i];
    for (let j = 0; j < currentTodo.subTask.length; j++) {
      let classToPut = currentTodo.subTask[j].marked
        ? "card-item card-item-checked"
        : "card-item";
      let rest = currentTodo.subTask[j].marked
        ? ""
        : '<button class = "markDone" onclick="markCompleted(this)">Mark Done</button>';
      const liNode = document.createElement("li");
      liNode.setAttribute("class", classToPut);
      liNode.setAttribute("data-key", currentTodo.subTask[j].id);
      liNode.innerHTML = ` ${currentTodo.subTask[j].name} ${rest}`;
      node.childNodes[2].append(liNode);
    }
  }
}

function Add_list_popup() {
  var blur;
  if (condition) {
    blur = document.querySelector("#blur");
  } else {
    blur = document.querySelector("#blur-2");
  }
  blur.classList.toggle("active");

  var popup = document.querySelector("#pop");
  popup.classList.toggle("active");
}

let currentChange;
function Add_item_popup(item) {
  currentChange = item;
  var blur;
  if (condition) {
    blur = document.querySelector("#blur");
  } else {
    blur = document.querySelector("#blur-2");
  }
  blur.classList.toggle("active");

  var popup = document.querySelector("#popAddItem");
  popup.classList.toggle("active");
}

function addTodo() {
  let heading = document.querySelector("#listHeading").value;
  if (heading !== "") {
    const todo = {
      heading,
      completed: false,
      subTask: [],
      id: Date.now(),
    };
    todoItems.push(todo);
    Add_list_popup();
    goBack();
  }
}

function addSubTodo() {
  let taskHeading = document.querySelector("#subListHeading").value;
  if (taskHeading !== "") {
    let list;
    if (condition) {
      list = currentChange.parentNode.parentNode.childNodes[2];
    } else {
      list = currentChange.parentNode.parentNode.childNodes[3];
    }
    let id = currentChange.parentNode.parentNode.getAttribute("data-key");

    const node = document.createElement("li");
    node.setAttribute("class", condition ? `card-item` : `card-item-2`);
    node.setAttribute("data-key", Date.now());
    node.innerHTML = ` ${taskHeading}<button class = 'markDone' onclick="markCompleted(this)">Mark Done</button>`;

    let currentTodo;
    for (let i = 0; i < todoItems.length; i++) {
      if (todoItems[i].id == id) {
        todoItems[i].subTask.push({
          name: taskHeading,
          marked: false,
          id: node.getAttribute("data-key"),
        });
      }
    }

    list.append(node);
    Add_item_popup();
  }
  console.log(todoItems);
}


function markCompleted(element) {
  let classToPut = condition
    ? "card-item card-item-checked"
    : "card-item-2 card-item-checked";
  element.parentNode.setAttribute("class", classToPut);
  let id = element.parentNode.parentNode.parentNode.getAttribute("data-key");
  let subTaskId = element.parentNode.getAttribute("data-key");
  for (let i = 0; i < todoItems.length; i++) {
    if (todoItems[i].id == id) {
      for (let j = 0; j < todoItems[i].subTask.length; j++) {
        if (todoItems[i].subTask[j].id == subTaskId) {
          todoItems[i].subTask[j].marked = true;
        }
      }
    }
  }
  element.parentNode.removeChild(element);
}

function goBack() {
  condition = true;
  CardAdding();
}

function removeToDo(element) {
  let tempElement = element.parentNode.parentNode;

  for (let i = 0; i < todoItems.length; i++) {
    if (todoItems[i].id == tempElement.getAttribute("data-key")) {
      todoItems.splice(i, 1);
    }
  }
  if (!condition) {
    goBack();
  } else {
    tempElement.parentNode.removeChild(tempElement);
    initialisation();
  }
}
function DescribeTask(element) {
  let id = element.parentNode.getAttribute("data-key");

  let currentTodo;
  for (let i = 0; i < todoItems.length; i++) {
    if (todoItems[i].id == id) {
      currentTodo = todoItems[i];
    }
  }
  condition = false;
  initialisation();
  document.querySelector("#currentHeading").textContent = currentTodo.heading;
  document.querySelector("#currentHeading-1").textContent = currentTodo.heading;
  document.querySelector("#currentHeading-1").parentNode.setAttribute("data-key", currentTodo.id);

  console.log(currentTodo);
  let e = document.querySelector("#subTaskList");
  var child = e.lastElementChild;
  while (child) {
    e.removeChild(child);
    child = e.lastElementChild;
  }
  for (let i = 0; i < currentTodo.subTask.length; i++) {
    let classToPut = currentTodo.subTask[i].marked
      ? "card-item-2 card-item-checked"
      : "card-item-2";
    let rest = currentTodo.subTask[i].marked
      ? ""
      : '<button class = "markDone" onclick="markCompleted(this)">Mark Done</button>';
    const node = document.createElement("li");
    node.setAttribute("class", classToPut);
    node.setAttribute("data-key", currentTodo.subTask[i].id);
    node.innerHTML = ` ${currentTodo.subTask[i].name} ${rest}`;
    e.append(node);
  }
}

