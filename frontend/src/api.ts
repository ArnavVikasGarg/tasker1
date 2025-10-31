export interface TaskItem {
    id: string;
    description: string;
    isCompleted: boolean;
}
  
const API_URL = "http://localhost:5000/api/tasks";
  
export async function fetchTasks(): Promise<TaskItem[]> {
    const res = await fetch(API_URL);
    if (!res.ok) {
        throw new Error(`GET /api/tasks failed: ${res.status}`);
    }
    return res.json();
}
  
export async function addTask(description: string): Promise<TaskItem> {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description, isCompleted: false }),
    });
    if (!res.ok) {
        throw new Error(`POST /api/tasks failed: ${res.status}`);
    }
    return res.json();
}
  
export async function updateTask(id: string, updated: Partial<TaskItem>) {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
}
  
export async function deleteTask(id: string) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}

export {};