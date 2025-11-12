import { API_URL } from './config';

export async function listTodos() {
    const res = await fetch(`${API_URL}/todo`);
    return res.json();
}

export async function createTodo(data) {
    const res = await fetch(`${API_URL}/todo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function toggleTodo(id) {
    const res = await fetch(`${API_URL}/todo/${id}/toggle`, { method: 'PATCH' });
    return res.json();
}

export async function deleteTodo(id) {
    const res = await fetch(`${API_URL}/todo/${id}`, { method: 'DELETE' });
    return res.json();
}
