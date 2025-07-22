import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-128px)] flex flex-col items-center justify-center p-8 bg-background text-center">
      <Head>
        <title>EduPlatform - Home</title>
        <meta name="description" content="Welcome to the educational platform!" />
      </Head>

      <div className="bg-white rounded-xl shadow-apple-medium p-10 max-w-2xl w-full">
        <h1 className="text-5xl font-bold text-text mb-6">
          Learn, Teach, Grow.
        </h1>
        <p className="text-xl text-lightText mb-10 leading-relaxed">
          Your comprehensive platform for education. Discover courses, manage learning, and inspire students.
        </p>

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 justify-center">
          <Link href="/login" className="btn-primary">
            Student Login
          </Link>
          <Link href="/instructor/login" className="btn-secondary"> {/* Assuming instructors use the same login page for now */}
            Instructor Login
          </Link>
        </div>
        <p className="mt-8 text-lightText">
          New here? <Link href="/register" className="text-primary hover:underline">Register Now</Link>
        </p>
      </div>
    </div>
  );
}
