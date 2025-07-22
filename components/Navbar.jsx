export default function Navbar() {
  return (
    <nav className="bg-white shadow p-4 flex justify-between">
      <h1 className="text-xl font-bold">EduPlatform</h1>
      <div className="space-x-4">
        <a href="/">Home</a>
        <a href="/student/dashboard">Student</a>
        <a href="/instructor/dashboard">Instructor</a>
        <a href="/admin/dashboard">Admin</a>
      </div>
    </nav>
  );
}
