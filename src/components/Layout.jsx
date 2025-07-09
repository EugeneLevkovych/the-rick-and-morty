import { Outlet } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import MobileMenu from './MobileMenu';
import { useState } from 'react';

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);

  const [species, setSpecies] = useState('');
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('');
  const [type, setType] = useState('');
  const [dimension, setDimension] = useState('');

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
            species,
            setSpecies,
            gender,
            setGender,
            status,
            setStatus,
            type,
            setType,
            dimension,
            setDimension,
          }}
        />
      </main>
      <Footer />
    </div>
  );
}
