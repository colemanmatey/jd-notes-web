import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo, Icon, Button } from '../';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        <Link to="/dashboard">
          <Logo />
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/dashboard" className="text-slate-700 hover:text-blue-600">Dashboard</Link>
          <Link to="/new" className="text-slate-700 hover:text-blue-600">New Note</Link>
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            <Icon name="logout" className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </nav>

        <button 
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Icon name={isMobileMenuOpen ? "x" : "menu"} />
        </button>
      </div>
      
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-3">
          <Link to="/dashboard" className="block text-slate-700">Dashboard</Link>
          <Link to="/new" className="block text-slate-700">New Note</Link>
          <button className="block text-red-600">Logout</button>
        </div>
      )}
    </header>
  );
}

export default Header;
