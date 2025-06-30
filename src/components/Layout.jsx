import { Outlet } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import MobileMenu from './MobileMenu';
import { useState } from 'react';
import FiltersOverlay from './FiltersOverlay';

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(open => !open);
  };
  return (
    <div>
      {isOpen && <MobileMenu onToggleMenu={toggleMenu} />}
      <Header onToggleMenu={toggleMenu} />
      <main>
        <Outlet
          context={{ onClickAdvancedBtn: () => setIsOverlayOpen(true) }}
        />
      </main>
      <Footer />
      {isOverlayOpen && (
        <FiltersOverlay
          isOpen={isOverlayOpen}
          onClickClose={() => setIsOverlayOpen(false)}
        />
      )}
    </div>
  );
}
