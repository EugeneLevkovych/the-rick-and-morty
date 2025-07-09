import { Outlet } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import MobileMenu from './MobileMenu';
import { useState } from 'react';
import FiltersOverlay from './FiltersOverlay';
import Select from '../components/Select';
import { SPECIES, GENDER, STATUS, TYPE, DIMENSION } from '../data/filtersData';

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOverlay2Open, setIsOverlay2Open] = useState(false);
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
            onClickAdvanced2Btn: () => setIsOverlay2Open(true),
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

      {isOverlay2Open && (
        <FiltersOverlay
          isOpen={isOverlay2Open}
          onClickClose={() => setIsOverlay2Open(false)}
          type={type}
          setType={setType}
          dimension={dimension}
          setDimension={setDimension}
        >
          <Select
            onChange={e => setType(e.target.value)}
            value={type}
            name="type"
            className="w-full"
          >
            {TYPE.map(i => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </Select>
          <Select
            onChange={e => setDimension(e.target.value)}
            value={dimension}
            name="dimension"
            className="w-full"
          >
            {DIMENSION.map(i => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </Select>
        </FiltersOverlay>
      )}
    </div>
  );
}
