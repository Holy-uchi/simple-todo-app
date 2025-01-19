import supabase from '@/lib/supabase';
import { Todo } from '@/lib/types';

export const getAllTodos = async (): Promise<Todo[]> => {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching todos:', error);
    throw new Error('Todoの取得に失敗しました');
  }

  return data || [];
};

export const addTodo = async (title: string): Promise<Todo> => {
  if (!title) {
    throw new Error('Todoの追加に失敗しました');
  }

  const { data, error } = await supabase
    .from('todos')
    .insert({ title, completed: false })
    .select()
    .single();

  if (error) {
    console.error('Error adding todo:', error);
    throw new Error('Todoの追加に失敗しました');
  }

  return data;
};

export const deleteTodo = async (id: number): Promise<void> => {
  const { data, error } = await supabase.from('todos').delete().eq('id', id).select();

  if (error || !data || data.length === 0) {
    console.error('Error deleting todo:', error);
    throw new Error('Todoの削除に失敗しました');
  }
};

export const updateTodo = async (id: number, updates: Partial<Todo>): Promise<Todo> => {
  const { data, error } = await supabase
    .from('todos')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating todo:', error);
    throw new Error('Todoの更新に失敗しました');
  }

  return data;
};
