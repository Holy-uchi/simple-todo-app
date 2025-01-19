import { getAllTodos, addTodo, deleteTodo, updateTodo } from '@/lib/actions';
import { Todo } from '@/lib/types';

describe('Todo Integration Tests', () => {
  let createdTodoId: number;

  // テストデータのクリーンアップ
  afterAll(async () => {
    try {
      if (createdTodoId) {
        await deleteTodo(createdTodoId);
      }
    } catch (error) {
      console.error('Cleanup failed:', error);
    }
  });

  it('Todo操作の一連のフローをテスト', async () => {
    // 1. 新しいTodoを作成
    const newTodo = await addTodo('統合テスト用Todo');
    expect(newTodo).toBeDefined();
    expect(newTodo.title).toBe('統合テスト用Todo');
    expect(newTodo.completed).toBe(false);
    createdTodoId = newTodo.id;

    // 2. 作成したTodoが一覧に含まれていることを確認
    const todos = await getAllTodos();
    const createdTodo = todos.find((todo) => todo.id === createdTodoId);
    expect(createdTodo).toBeDefined();
    expect(createdTodo?.title).toBe('統合テスト用Todo');

    // 3. Todoを更新
    const updatedTodo = await updateTodo(createdTodoId, {
      completed: true,
      title: '更新された統合テスト用Todo',
    });
    expect(updatedTodo.completed).toBe(true);
    expect(updatedTodo.title).toBe('更新された統合テスト用Todo');

    // 4. 更新が反映されていることを確認
    const updatedTodos = await getAllTodos();
    const updatedCreatedTodo = updatedTodos.find((todo) => todo.id === createdTodoId);
    expect(updatedCreatedTodo?.completed).toBe(true);
    expect(updatedCreatedTodo?.title).toBe('更新された統合テスト用Todo');

    // 5. Todoを削除
    await deleteTodo(createdTodoId);

    // 6. 削除されていることを確認
    const finalTodos = await getAllTodos();
    const deletedTodo = finalTodos.find((todo) => todo.id === createdTodoId);
    expect(deletedTodo).toBeUndefined();
  });

  it('存在しないTodoの更新でエラーが発生することを確認', async () => {
    await expect(updateTodo(99999, { completed: true })).rejects.toThrow(
      'Todoの更新に失敗しました'
    );
  });

  it('存在しないTodoの削除でエラーが発生することを確認', async () => {
    await expect(deleteTodo(99999)).rejects.toThrow('Todoの削除に失敗しました');
  });

  it('不正なTodoデータの作成でエラーが発生することを確認', async () => {
    // @ts-ignore - 意図的に不正なデータを渡す
    await expect(addTodo(null)).rejects.toThrow('Todoの追加に失敗しました');
  });
});
