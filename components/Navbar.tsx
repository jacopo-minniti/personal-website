import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-primary py-4">
      <div className="container mx-auto flex justify-between items-center px-6">
        <div className="text-4xl font-bold">
          Jacopo Minniti
        </div>
        <ul className="flex space-x-8">
          <li>
            <Link href="/" className="hover:text-accent transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link href="/projects" className="hover:text-accent transition-colors">
              Projects
            </Link>
          </li>
          <li>
            <Link href="/blog" className="hover:text-accent transition-colors">
              Blog
            </Link>
          </li>
          <li>
            <Link href="/research" className="hover:text-accent transition-colors">
              Research
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
