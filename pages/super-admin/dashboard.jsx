import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function SuperAdminDashboard() {
  return (
    <div>
      <Navbar />
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-4">Super Admin Dashboard</h1>
        <p>Here you have full control of the platform, users, payments, and site settings.</p>
      </main>
      <Footer />
    </div>
  );
}
