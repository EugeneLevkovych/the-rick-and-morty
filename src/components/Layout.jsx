import { Outlet } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import MobileMenu from './MobileMenu';
import { useState } from 'react';

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(open => !open);
  };
  return (
    <div>
      {isOpen && <MobileMenu onToggleMenu={toggleMenu} />}
      <Header onToggleMenu={toggleMenu} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
