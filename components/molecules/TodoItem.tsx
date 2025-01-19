'use client';

import type { Todo } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: number) => Promise<void>;
  onToggle: (id: number, completed: boolean) => Promise<void>;
  isDeleting: boolean;
  isUpdating: boolean;
}

export function TodoItem({ todo, onDelete, onToggle, isDeleting, isUpdating }: TodoItemProps) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <Checkbox
            checked={todo.completed}
            onCheckedChange={(checked) => onToggle(todo.id, checked === true)}
            disabled={isUpdating}
          />
          <span
            className={cn(
              'transition-colors duration-200',
              todo.completed ? 'text-muted-foreground line-through' : 'text-foreground'
            )}
          >
            {todo.title}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(todo.id)}
          disabled={isDeleting}
          className={cn(
            'h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50',
            isDeleting && 'text-red-300'
          )}
        >
          {isDeleting ? <span className="animate-pulse">...</span> : <Trash2 className="h-4 w-4" />}
        </Button>
      </CardContent>
    </Card>
  );
}
