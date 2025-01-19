'use client';

import { TodoList } from '@/components/molecules/TodoList';
import { getAllTodos, addTodo, deleteTodo } from '@/lib/actions';
import { useEffect, useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Todo } from '@/lib/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const todoSchema = z.object({
  title: z.string().min(1, '内容を入力してください').max(100, '100文字以内で入力してください'),
});

type TodoFormData = z.infer<typeof todoSchema>;

export const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isAddingTodo, setIsAddingTodo] = useState(false);
  const [deletingTodoIds, setDeletingTodoIds] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoFormData>({
    resolver: zodResolver(todoSchema),
  });

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setError(null);
        const todos = await getAllTodos();
        setTodos(todos);
      } catch (err) {
        setError('Todoの取得に失敗しました');
        console.error(err);
      } finally {
        setIsInitialLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const onSubmit = async (data: TodoFormData) => {
    try {
      setIsAddingTodo(true);
      setError(null);
      const newTodo = await addTodo(data.title);
      setTodos((prev) => [newTodo, ...prev]);
      reset();
    } catch (err) {
      setError('Todoの追加に失敗しました');
      console.error(err);
    } finally {
      setIsAddingTodo(false);
    }
  };

  const handleDelete = useCallback(async (id: number) => {
    try {
      setDeletingTodoIds((prev) => [...prev, id]);
      setError(null);
      await deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      setError('Todoの削除に失敗しました');
      console.error(err);
    } finally {
      setDeletingTodoIds((prev) => prev.filter((todoId) => todoId !== id));
    }
  }, []);

  if (isInitialLoading) {
    return (
      <div className="flex justify-center w-full">
        <Card className="w-full max-w-md">
          <CardContent className="p-4 text-center">読み込み中...</CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Todo List</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-destructive/15 text-destructive px-4 py-2 rounded-md mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="新しいTodoを入力..."
                {...register('title')}
                disabled={isAddingTodo}
              />
              {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={isAddingTodo}>
                {isAddingTodo ? '追加中...' : '追加'}
              </Button>
            </div>
            <TodoList todos={todos} handleDelete={handleDelete} deletingTodoIds={deletingTodoIds} />
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
