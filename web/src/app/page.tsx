'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
interface Todo {
  id: number;
  title: string;
  done: boolean;
}
export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  async function load() {
    const { data } = await axios.get('http://localhost:3001/todos');
    setTodos(data);
  }
  async function add() {
    await axios.post('http://localhost:3001/todos', { title });
    setTitle('');
    load();
  }
  async function toggle(id: number) {
    await axios.put(`http://localhost:3001/todos/${id}/done`);
    load();
  }
  useEffect(() => { load(); }, []);
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Todos</h1>
      <input
        className="border px-2 py-1 mr-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New todo"
      />
      <button className="bg-blue-500 text-white px-4 py-1" onClick={add}>Add</button>
      <ul className="mt-4">
        {todos.map((t) => (
          <li key={t.id} className="flex items-center space-x-2">
            <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} />
            <span>{t.title}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
