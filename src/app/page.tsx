import styles from './page.module.css';
import { TodoApp } from '@/components/organisms/TodoApp';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className="flex justify-center items-center h-screen">
          <TodoApp />
        </section>
      </main>
    </div>
  );
}

// 静的なメタデータの場合
export const metadata = {
  title: 'Create Next App',
};
