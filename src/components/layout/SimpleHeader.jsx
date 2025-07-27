import { Link } from 'react-router-dom';
import { Logo } from '../';

function SimpleHeader() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        <Link to="/">
          <Logo />
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#home" className="text-slate-700 hover:text-blue-600">Home</a>
          <a href="#about" className="text-slate-700 hover:text-blue-600">About</a>
          <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default SimpleHeader;
