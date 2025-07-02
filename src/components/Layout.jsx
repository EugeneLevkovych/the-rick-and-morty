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
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
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
            onClickAdvancedBtn: () => setIsOverlayOpen(true),
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
        >
          <Select
            onChange={e => setSpecies(e.target.value)}
            value={species}
            name="Species"
            className="w-full"
          >
            {SPECIES.map(i => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </Select>
          <Select
            onChange={e => setGender(e.target.value)}
            value={gender}
            name="Gender"
            className="w-full"
          >
            {GENDER.map(i => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </Select>
          <Select
            onChange={e => setStatus(e.target.value)}
            value={status}
            name="Status"
            className="w-full"
          >
            {STATUS.map(i => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </Select>
        </FiltersOverlay>
      )}
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
