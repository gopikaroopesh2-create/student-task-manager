let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showTasks() {
    let list = document.getElementById("list");
    list.innerHTML = "";

    tasks.forEach(function(task, index) {
        let li = document.createElement("li");
        li.textContent = task.text;

        if (task.done) {
            li.style.textDecoration = "line-through";
        }

        li.onclick = function() {
            tasks[index].done = !tasks[index].done;
            saveTasks();
            showTasks();
        };

        let del = document.createElement("button");
        del.textContent = "X";

        del.onclick = function(event) {
            event.stopPropagation();
            tasks.splice(index, 1);
            saveTasks();
            showTasks();
        };

        li.appendChild(del);
        list.appendChild(li);
    });

    document.getElementById("count").textContent =
        "Total Tasks: " + tasks.length;
}

function addTask() {
    let input = document.getElementById("task");
    let text = input.value.trim();

    if (text === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({ text: text, done: false });
    saveTasks();

    input.value = "";
    showTasks();
}

showTasks();