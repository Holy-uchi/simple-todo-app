'use client';

import { TodoList } from '@/components/molecules/TodoList';
import { getAllTodos, addTodo, deleteTodo } from '@/utils/supabaseFunctions';
import { useEffect, useState, useCallback } from 'react';

export const TodoApp = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    console.log('useEffect');
    const fetchTodos = async () => {
      const todos = await getAllTodos();
      console.log(todos);
      setTodos(todos);
    };
    fetchTodos();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (title === '') return;
    e.preventDefault();
    await addTodo(title);
    const todos = await getAllTodos();
    setTodos(todos);

    setTitle('');
    // fetchTodos();
  };

  // useCallbackを使う
  const handleDelete = useCallback(async (id: number) => {
    console.log('handleDelete');
    await deleteTodo(id);
    const todos = await getAllTodos();
    setTodos(todos);
  }, []);

  return (
    <div className="text-center mb-2 text-2xl font-medium">
      <h3 className="">Supabase Todo App</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Todo"
          className="shadow-lg p-1 outline-none mr-2 rounded-lg"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="shadow-md border-2 px-1 py-1 rounded-lg bg-green-200">Add</button>
        <TodoList todos={todos} handleDelete={handleDelete} />
      </form>
    </div>
  );
};
