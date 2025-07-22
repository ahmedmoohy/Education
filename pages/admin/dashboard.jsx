import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function AdminDashboard() {
  return (
    <div>
      <Navbar />
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <p>Here you can manage students, instructors, and site content.</p>
      </main>
      <Footer />
    </div>
  );
}
