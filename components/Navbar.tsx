import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="py-8">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-4xl font-bold text-text-brown">
            Jacopo Minniti
          </Link>
          <ul className="flex items-center space-x-10">
            <li>
              <Link href="/" className="text-xl text-text-brown hover:text-opacity-75 transition-opacity">
                Home
              </Link>
            </li>
            <li>
              <Link href="/projects" className="text-xl text-text-brown hover:text-opacity-75 transition-opacity">
                Projects
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-xl text-text-brown hover:text-opacity-75 transition-opacity">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/research" className="text-xl text-text-brown hover:text-opacity-75 transition-opacity">
                Research
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
