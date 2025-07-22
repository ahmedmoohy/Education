import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to EduPlatform</h1>
        <p className="mb-4">Choose your role to continue:</p>
        <div className="space-x-4">
          <a href="/student/dashboard" className="bg-blue-600 text-white px-4 py-2 rounded">Student</a>
          <a href="/instructor/dashboard" className="bg-green-600 text-white px-4 py-2 rounded">Instructor</a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
