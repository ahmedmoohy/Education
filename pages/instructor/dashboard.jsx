import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function StudentDashboard() {
  return (
    <div>
      <Navbar />
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-4">Student Dashboard</h1>
        <p>Here you can see your courses, materials, and messages.</p>
      </main>
      <Footer />
    </div>
  );
}
