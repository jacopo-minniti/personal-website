export default function Footer() {
  return (
    <footer className="bg-transparent mt-12">
      <div className="container mx-auto px-4 py-6 text-center text-text-brown">
        <p>© {new Date().getFullYear()} Jacopo Minniti. All rights reserved.</p>
      </div>
    </footer>
  );
}