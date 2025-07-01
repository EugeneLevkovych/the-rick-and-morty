import { Outlet } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import MobileMenu from './MobileMenu';
import { useState } from 'react';
import FiltersOverlay from './FiltersOverlay';

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [species, setSpecies] = useState('');
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('');

  const toggleMenu = () => {
    setIsOpen(open => !open);
  };
  return (
    <div>
      {isOpen && <MobileMenu onToggleMenu={toggleMenu} />}
      <Header onToggleMenu={toggleMenu} />
      <main>
        <Outlet
          context={{
            onClickAdvancedBtn: () => setIsOverlayOpen(true),
            species,
            setSpecies,
            gender,
            setGender,
            status,
            setStatus,
          }}
        />
      </main>
      <Footer />
      {isOverlayOpen && (
        <FiltersOverlay
          isOpen={isOverlayOpen}
          onClickClose={() => setIsOverlayOpen(false)}
          species={species}
          setSpecies={setSpecies}
          gender={gender}
          setGender={setGender}
          status={status}
          setStatus={setStatus}
        />
      )}
    </div>
  );
}
