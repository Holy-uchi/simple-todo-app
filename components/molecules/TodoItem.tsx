'use client';

import type { Todo } from '@/lib/types';

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: number) => Promise<void>;
  onToggle: (id: number, completed: boolean) => Promise<void>;
}

export function TodoItem({ todo, onDelete, onToggle }: TodoItemProps) {
  const handleToggle = async () => {
    await onToggle(todo.id, !todo.completed);
  };

  const handleDelete = async () => {
    await onDelete(todo.id);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
        />
        <span className={`${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
          {todo.title}
        </span>
      </div>
      <button onClick={handleDelete} className="text-red-500 hover:text-red-700 focus:outline-none">
        削除
      </button>
    </div>
  );
}
