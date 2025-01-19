import { getAllTodos, addTodo, deleteTodo, updateTodo } from '@/lib/actions';
import supabase from '@/lib/supabase';

// モックの結果を保持する変数
let mockResult: any = { data: null, error: null };

// Supabaseクライアントのモック
jest.mock('@/lib/supabase', () => ({
  __esModule: true,
  default: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        order: jest.fn(() => Promise.resolve(mockResult)),
      })),
      insert: jest.fn(() => ({
        select: jest.fn(() => ({
          single: jest.fn(() => Promise.resolve(mockResult)),
        })),
      })),
      delete: jest.fn(() => ({
        eq: jest.fn(() => Promise.resolve(mockResult)),
      })),
      update: jest.fn(() => ({
        eq: jest.fn(() => ({
          select: jest.fn(() => ({
            single: jest.fn(() => Promise.resolve(mockResult)),
          })),
        })),
      })),
    })),
  },
}));

describe('Supabase Actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockResult = { data: null, error: null };
  });

  describe('getAllTodos', () => {
    it('正常にTodoリストを取得できる', async () => {
      const mockTodos = [
        { id: 1, title: 'Test Todo 1', completed: false },
        { id: 2, title: 'Test Todo 2', completed: true },
      ];
      mockResult = { data: mockTodos, error: null };

      const result = await getAllTodos();
      expect(result).toEqual(mockTodos);
      expect(supabase.from).toHaveBeenCalledWith('todos');
    });

    it('エラー時に適切に例外を投げる', async () => {
      mockResult = { data: null, error: new Error('Database error') };

      await expect(getAllTodos()).rejects.toThrow('Todoの取得に失敗しました');
    });
  });

  describe('addTodo', () => {
    it('正常にTodoを追加できる', async () => {
      const mockTodo = { id: 1, title: 'New Todo', completed: false };
      mockResult = { data: mockTodo, error: null };

      const result = await addTodo('New Todo');
      expect(result).toEqual(mockTodo);
      expect(supabase.from).toHaveBeenCalledWith('todos');
    });

    it('エラー時に適切に例外を投げる', async () => {
      mockResult = { data: null, error: new Error('Database error') };

      await expect(addTodo('New Todo')).rejects.toThrow('Todoの追加に失敗しました');
    });
  });

  describe('deleteTodo', () => {
    it('正常にTodoを削除できる', async () => {
      mockResult = { error: null };

      await expect(deleteTodo(1)).resolves.not.toThrow();
      expect(supabase.from).toHaveBeenCalledWith('todos');
    });

    it('エラー時に適切に例外を投げる', async () => {
      mockResult = { error: new Error('Database error') };

      await expect(deleteTodo(1)).rejects.toThrow('Todoの削除に失敗しました');
    });
  });

  describe('updateTodo', () => {
    it('正常にTodoを更新できる', async () => {
      const mockTodo = { id: 1, title: 'Updated Todo', completed: true };
      mockResult = { data: mockTodo, error: null };

      const result = await updateTodo(1, { completed: true });
      expect(result).toEqual(mockTodo);
      expect(supabase.from).toHaveBeenCalledWith('todos');
    });

    it('エラー時に適切に例外を投げる', async () => {
      mockResult = { data: null, error: new Error('Database error') };

      await expect(updateTodo(1, { completed: true })).rejects.toThrow('Todoの更新に失敗しました');
    });
  });
});
