import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css'; // قد تحتاج لإنشاء هذا الملف في مجلد styles

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Educational Platform</title>
        <meta name="description" content="Welcome to the Educational Platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to the <a href="#">Educational Platform!</a>
        </h1>

        <p className={styles.description}>
          Get started by logging in or registering.
        </p>

        <div className={styles.grid}>
          <Link href="/login" className={styles.card}>
            <h2>Student Login &rarr;</h2>
            <p>Access your student dashboard.</p>
          </Link>

          <Link href="/login" className={styles.card}>
            <h2>Instructor Login &rarr;</h2>
            <p>Manage your courses and students.</p>
          </Link>

          <Link href="/register" className={styles.card}>
            <h2>Register Now &rarr;</h2>
            <p>Create a new account.</p>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            {/* يمكنك استبدال هذا بشعار أو نص */}
            Vercel
          </span>
        </a>
      </footer>
    </div>
  );
}
