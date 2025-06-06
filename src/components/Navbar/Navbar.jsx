import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // No need for scrollToSection anymore as we're using direct navigation
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 shadow-md py-2' : 'bg-white/90 py-4'}`}>
      <div className="container mx-auto px-4 lg:px-16 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#" 
          className="text-primary text-2xl font-bold"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('hero');
          }}
        >
          SENNA
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          <NavLink to="/" onClick={closeMenu} isActive={location.pathname === "/"}>HOME</NavLink>
          <NavLink to="/about" onClick={closeMenu} isActive={location.pathname === "/about"}>ABOUT</NavLink>
          <NavLink to="/tech-stack" onClick={closeMenu} isActive={location.pathname === "/tech-stack"}>TECH STACK</NavLink>
          <NavLink to="/services" onClick={closeMenu} isActive={location.pathname === "/services"}>SERVICES</NavLink>
          <NavLink to="/portofolio" onClick={closeMenu} isActive={location.pathname === "/portofolio"}>PORTFOLIO</NavLink>
          <NavLink to="/contact" onClick={closeMenu} isActive={location.pathname === "/contact"}>CONTACT</NavLink>
        </div>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <Link to="/contact">
            <button 
              onClick={closeMenu}
              className="bg-primary text-white px-6 py-2 rounded-md font-medium hover:bg-primary/90 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5 flex items-center"
            >
              Let's Talk! <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-primary focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white shadow-lg absolute w-full left-0 py-4 px-4 transition-all duration-300`}>
        <div className="flex flex-col space-y-3">
          <MobileNavLink to="/" onClick={closeMenu}>HOME</MobileNavLink>
          <MobileNavLink to="/about" onClick={closeMenu}>ABOUT</MobileNavLink>
          <MobileNavLink to="/tech-stack" onClick={closeMenu}>TECH STACK</MobileNavLink>
          <MobileNavLink to="/services" onClick={closeMenu}>SERVICES</MobileNavLink>
          <MobileNavLink to="/portofolio" onClick={closeMenu}>PORTFOLIO</MobileNavLink>
          <MobileNavLink to="/contact" onClick={closeMenu}>CONTACT</MobileNavLink>
          <Link to="/contact">
            <button 
              onClick={closeMenu}
              className="bg-primary text-white py-2 rounded-md font-medium hover:bg-primary/90 transition-all duration-300 mt-4 w-full"
            >
              Let's Talk!
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

// Desktop Navigation Link Component
const NavLink = ({ children, onClick, isActive = false, to = "#" }) => {
  if (to === "#") {
    return (
      <a 
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
        className={`relative font-medium hover:text-primary transition-colors duration-300 ${isActive ? 'text-primary' : 'text-gray-700'}`}
      >
        <span className="relative">
          {children}
          <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 ${isActive ? 'w-full' : 'group-hover:w-full'}`}></span>
        </span>
      </a>
    );
  }
  
  return (
    <Link 
      to={to}
      onClick={onClick}
      className={`relative font-medium hover:text-primary transition-colors duration-300 ${isActive ? 'text-primary' : 'text-gray-700'}`}
    >
      <span className="relative">
        {children}
        <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 ${isActive ? 'w-full' : 'group-hover:w-full'}`}></span>
      </span>
    </Link>
  );
};

// Mobile Navigation Link Component
const MobileNavLink = ({ children, onClick, to = "#" }) => {
  if (to === "#") {
    return (
      <a 
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
        className="text-gray-700 hover:text-primary transition-colors duration-300 py-2 border-b border-gray-100 last:border-0"
      >
        {children}
      </a>
    );
  }
  
  return (
    <Link 
      to={to}
      onClick={onClick}
      className="text-gray-700 hover:text-primary transition-colors duration-300 py-2 border-b border-gray-100 last:border-0"
    >
      {children}
    </Link>
  );
};

export default Navbar;
