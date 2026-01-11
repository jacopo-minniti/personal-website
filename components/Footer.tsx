export default function Footer() {
  return (
    <footer className="mt-auto py-8 text-center text-sm text-gray-500 z-10 relative">
      <div className="container mx-auto px-4">
        <p>© {new Date().getFullYear()} The Valiant Fox. All rights reserved.</p>
      </div>
    </footer>
  );
}