import React, { useEffect, useState } from "react";
import { TaskItem, fetchTasks, addTask, updateTask, deleteTask } from "./api";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [desc, setDesc] = useState<string>("");

  useEffect(() => {
    fetchTasks().then(setTasks);
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!desc.trim()) return;
    try {
      const newTask = await addTask(desc);
      setTasks([...tasks, newTask]);
      setDesc("");
    } catch (err) {
      alert((err as Error).message);
    }
  };

  const handleToggle = async (id: string, completed: boolean) => {
    await updateTask(id, { isCompleted: !completed });
    setTasks(tasks.map(t => t.id === id ? { ...t, isCompleted: !completed } : t));
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", fontFamily: 'sans-serif' }}>
      <h1>Task List</h1>
      <form onSubmit={handleAdd} style={{ marginBottom: 20 }}>
        <input
          value={desc}
          onChange={e => setDesc(e.target.value)}
          placeholder="Add a new task..."
          style={{ width: "70%", padding: 8 }}
        />
        <button type="submit" style={{ padding: 8, marginLeft: 8 }}>
          Add
        </button>
      </form>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map(task => (
          <li key={task.id} style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
            <input
              type="checkbox"
              checked={task.isCompleted}
              onChange={() => handleToggle(task.id, task.isCompleted)}
            />
            <span style={{
              flex: 1,
              marginLeft: 10,
              textDecoration: task.isCompleted ? "line-through" : "none"
            }}>{task.description}</span>
            <button onClick={() => handleDelete(task.id)} style={{ marginLeft: 10 }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;