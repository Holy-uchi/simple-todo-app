'use client';

import { Todo } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { TodoItem } from './TodoItem';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
  todos: Todo[];
  handleDelete: (id: number) => Promise<void>;
  handleToggle: (id: number, completed: boolean) => Promise<void>;
  deletingTodoIds: number[];
  updatingTodoIds: number[];
};

export const TodoList = ({
  todos,
  handleDelete,
  handleToggle,
  deletingTodoIds,
  updatingTodoIds,
}: Props) => {
  if (todos.length === 0) {
    return (
      <Card>
        <CardContent className="p-4 text-center text-muted-foreground">
          Todoがありません
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full space-y-2">
      <AnimatePresence mode="popLayout">
        {todos.map((todo) => (
          <motion.div
            key={todo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.2 }}
          >
            <TodoItem
              todo={todo}
              onDelete={handleDelete}
              onToggle={handleToggle}
              isDeleting={deletingTodoIds.includes(todo.id)}
              isUpdating={updatingTodoIds.includes(todo.id)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
