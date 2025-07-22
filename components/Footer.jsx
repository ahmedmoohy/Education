
export default function Footer() {
  return (
    <footer className="bg-white shadow-apple-light mt-auto py-6">
      <div className="container mx-auto px-6 text-center text-lightText text-sm">
        <p>&copy; {new Date().getFullYear()} EduPlatform. All rights reserved.</p>
        <p className="mt-2">Built with Next.js and Tailwind CSS.</p>
      </div>
    </footer>
  );
}
