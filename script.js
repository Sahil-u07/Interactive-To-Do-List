const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');

addButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim(); 

    if (taskText === '') return;

    const task = {
        text: taskText,
        completed: false
    };

    let tasks = JSON.parse(localStorage.getItem('tasks')) || []; 

    tasks.push(task); 

    localStorage.setItem('tasks', JSON.stringify(tasks)); 

    renderTasks();
    taskInput.value = '';
});

function renderTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    taskList.innerHTML = ''; 

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''}>
            ${task.text}
            <button class="delete-btn">Delete</button>
        `;

        if (task.completed) {
            listItem.classList.add('completed');
        }

        listItem.querySelector('input[type="checkbox"]').addEventListener('change', () => {
            task.completed = !task.completed;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks(); 
        });

        listItem.querySelector('.delete-btn').addEventListener('click', () => {
            tasks.splice(index, 1); 
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks(); 
        });

        taskList.appendChild(listItem);
    });
}

renderTasks();