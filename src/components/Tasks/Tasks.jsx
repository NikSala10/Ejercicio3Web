import '../Tasks/Tasks.css';
import { useState } from "react";

export default function TodoTasks() {
  const [taskInput, setTaskInput] = useState('');
  const [priority, setPriority] = useState('baja');
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  const sendForm = (e) => {
    e.preventDefault();
    setTasks([...tasks, { title: taskInput, priority: priority }]);
    setTaskInput('');
    setPriority('baja');
  }

  const handleDelete = (id) => {
      const taskFiltered = tasks.filter((task, index) => id !== index);
      setTasks(taskFiltered);
  }

  const filteredTasks = () => {
    if (filter === "all") return tasks;
    return tasks.filter((task) => task.priority === filter);
  };

  return (
    <>
      <div className="todo-container">
        <label>Filtrar por prioridad: </label>
        <select onChange={(e) => setFilter(e.target.value) } value={filter}>
          <option value="all">Todas</option>
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
        </select>
      </div>
       <form onSubmit={(e) => sendForm(e)}>
          <input
          onChange={(e) => {setTaskInput(e.target.value)}}
          placeholder="Ingresa una tarea, ej: 'Comprar pan'"
          value={taskInput} 
          />

          <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}>
            
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>

          </select>
          <button type="submit">Agregar</button>
        </form>
        
        {
          filteredTasks().length > 0 && (
            <ul>
              {filteredTasks().map((task, index) => (
                <li key={index}>
                  {task.title} <span className={`priority-${task.priority}`}>{task.priority}</span>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </li>
              ))}
            </ul>
          )
        }
    </>
  );
}

