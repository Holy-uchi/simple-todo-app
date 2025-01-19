'use client';

import { Todo } from '@/utils/interface';

type Props = {
  todos: Todo[];
  // かんすうをpropで取る
  handleDelete: (id: number) => Promise<void>;
};

export const TodoList = ({ todos, handleDelete }: Props) => {
  console.log(todos);
  return (
    <div>
      <ul>
        {todos.map((todo) => {
          return (
            <div
              key={todo.id}
              className="flex justify-between items-center bg-orange-200 rounded-md mt-2 p-2"
            >
              <li className="font-medium">✅ {todo.title}</li>
              <span className="cursor-pointer" onClick={() => handleDelete(todo.id)}>
                ✖️
              </span>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
