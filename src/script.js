 let todos = [];
        let totalPoints = 0;

        function showModal() {
            document.getElementById('todo-modal').style.display = 'block';
            document.getElementById('overlay').style.display = 'block';
        }

        function hideModal() {
            document.getElementById('todo-modal').style.display = 'none';
            document.getElementById('overlay').style.display = 'none';
        }

        function addTodo() {
            const title = document.getElementById('todo-title').value;
            const desc = document.getElementById('todo-desc').value;
            const dueDate = document.getElementById('todo-date').value;
            const points = parseInt(document.getElementById('todo-points').value);
            if (!title || !dueDate || isNaN(points) || points < 1 || points > 5) return alert("Title, Due Date, and Points (1-5) are required");
            
            const todo = { title, desc, dueDate, points, isCompleted: false };
            todos.push(todo);
            renderTodos();
            hideModal();
        }

        function toggleComplete(index) {
            todos[index].isCompleted = !todos[index].isCompleted;
            updatePoints();
            renderTodos();
        }

        function updatePoints() {
            totalPoints = todos.filter(todo => todo.isCompleted).reduce((sum, todo) => sum + todo.points, 0);
            document.getElementById('points-counter').innerText = totalPoints;
        }

        function renderTodos() {
            const list = document.getElementById('todo-list');
            list.innerHTML = '';
            todos.forEach((todo, index) => {
                list.innerHTML += `
                    <div class="todo-item ${todo.isCompleted ? 'completed' : ''}">
                        <span onclick="toggleComplete(${index})">${todo.title} - ${new Date(todo.dueDate).toLocaleString()} (Points: ${todo.points})</span>
                        <button onclick="toggleComplete(${index})">${todo.isCompleted ? 'Undo' : 'Complete'}</button>
                    </div>
                `;
            });
            updatePoints();
        }