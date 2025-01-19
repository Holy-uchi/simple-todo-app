import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className="text-red-400">Hello World</h1>
      </main>
    </div>
  );
}

// 静的なメタデータの場合
export const metadata = {
  title: 'Create Next App',
};
