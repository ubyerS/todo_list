import { useState } from 'react'


interface Task {
    id : number;
    text : string;
    completed : boolean;
}

const Todo = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<string>('fdkgk');
    const [editingTaskId, setEditingTaskId] = useState <number | null > (null);
    const [editedTaskText, setEditedTaskText] = useState<string>('');
    const addTask = () => {
        if (newTask.trim() === "") return;
        const task: Task = {
            id : Date.now(),
            text : newTask,
            completed : false,
        };
    setTasks([...tasks, task]);
    setNewTask('');

  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  
  const startEditingTask = (id : number, text : string) => {
    setEditingTaskId(id);
    setEditedTaskText(text);
  };

  const saveEditedTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: editedTaskText } : task
      )
    );
    setEditingTaskId(null);
    setEditedTaskText('');
};
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div>
        <h1>Todo List</h1>
        <input
        type = "string"
        value = {newTask}
        onChange = {(e) => setNewTask(e.target.value)}
        placeholder='Task'
        />
        <button onClick={addTask}> Добавить </button>
        <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {editingTaskId === task.id ? (
                <>
                <input
                  type="text"
                  value={editedTaskText}
                  onChange={(e) => setEditedTaskText(e.target.value)}
                />
                <button onClick={() => saveEditedTask(task.id)}>Сохранить</button>
              </>
            ) : (
                <>
            <span
                  style={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                    cursor: 'pointer',
                  }}
                  onClick={() => toggleTask(task.id)}
                >
                  {task.text}
                </span>
                <button onClick={() => startEditingTask(task.id, task.text)}>
                  Изменить
                </button>
                <button onClick={() => deleteTask(task.id)}>Удалить</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;