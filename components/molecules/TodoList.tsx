'use client';

import { Todo } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  todos: Todo[];
  handleDelete: (id: number) => Promise<void>;
};

export const TodoList = ({ todos, handleDelete }: Props) => {
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
            <Card>
              <CardContent className="flex justify-between items-center p-4">
                <span className="font-medium">✅ {todo.title}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(todo.id)}
                  className="h-8 w-8"
                >
                  ✖️
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
