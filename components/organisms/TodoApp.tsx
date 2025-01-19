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
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
        setIsLoading(true);
        setError(null);
        const todos = await getAllTodos();
        setTodos(todos);
      } catch (err) {
        setError('Todoの取得に失敗しました');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const onSubmit = async (data: TodoFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      await addTodo(data.title);
      const updatedTodos = await getAllTodos();
      setTodos(updatedTodos);
      reset();
    } catch (err) {
      setError('Todoの追加に失敗しました');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = useCallback(async (id: number) => {
    try {
      setIsLoading(true);
      setError(null);
      await deleteTodo(id);
      const updatedTodos = await getAllTodos();
      setTodos(updatedTodos);
    } catch (err) {
      setError('Todoの削除に失敗しました');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

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
                disabled={isLoading}
              />
              {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? '追加中...' : '追加'}
              </Button>
            </div>
            <TodoList todos={todos} handleDelete={handleDelete} />
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
