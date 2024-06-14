document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task-input');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;

            const taskInput = document.createElement('input');
            taskInput.type = 'text';
            taskInput.value = task.text;
            taskInput.readOnly = true;
            taskInput.addEventListener('dblclick', () => {
                taskInput.readOnly = false;
                taskInput.focus();
            });
            taskInput.addEventListener('blur', () => {
                taskInput.readOnly = true;
                task.text = taskInput.value;
                saveTasks();
                renderTasks();
            });

            const taskActions = document.createElement('div');
            taskActions.className = 'task-actions';

            const completeButton = document.createElement('button');
            completeButton.innerHTML = task.completed ? '&#x2714;' : '&#x2713;';
            completeButton.className = 'complete';
            completeButton.addEventListener('click', () => {
                task.completed = !task.completed;
                saveTasks();
                renderTasks();
            });

            const editButton = document.createElement('button');
            editButton.innerHTML = '&#9998;';
            editButton.className = 'edit';
            editButton.addEventListener('click', () => {
                taskInput.readOnly = false;
                taskInput.focus();
            });

            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = '&#10006;';
            deleteButton.className = 'delete';
            deleteButton.addEventListener('click', () => {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            });

            taskActions.appendChild(completeButton);
            taskActions.appendChild(editButton);
            taskActions.appendChild(deleteButton);

            taskItem.appendChild(taskInput);
            taskItem.appendChild(taskActions);

            taskList.appendChild(taskItem);
        });
    }

    addTaskButton.addEventListener('click', () => {
        const newTaskText = taskInput.value.trim();
        if (newTaskText !== '') {
            tasks.push({ text: newTaskText, completed: false });
            saveTasks();
            renderTasks();
            taskInput.value = '';
        }
    });

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTaskButton.click();
        }
    });

    renderTasks();
});
