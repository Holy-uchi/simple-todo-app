import supabase from '@/utils/supabase';

export const getAllTodos = async () => {
  const { data, error } = await supabase.from('todos').select('*');
  // データがない場合は空の配列を返す
  if (error) {
    console.error(error);
    return [];
  }
  return data;
};

export const addTodo = async (title: string) => {
  const { data, error } = await supabase.from('todos').insert({ title });
  if (error) {
    console.error(error);
  }
  return data;
};

// supabaseの型を使う。
export const deleteTodo = async (id: number) => {
  await supabase.from('todos').delete().eq('id', id);
};
