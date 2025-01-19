import { TodoApp } from '@/components/organisms/TodoApp';

export default function Home() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold mb-2">Simple Todo App</h1>
        <p className="text-gray-600">Next.js + Supabase で作るシンプルなTodoアプリ</p>
      </header>
      <TodoApp />
    </div>
  );
}

export const metadata = {
  title: 'Supabase Todo App',
  description: 'A simple todo app built with Next.js, Supabase, and shadcn/ui',
};
