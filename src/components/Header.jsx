import { NavLink } from 'react-router';
import logoBlack from '../assets/images/logo-black.png';

export default function Header() {
  return (
    <div className="border-b-0 shadow-md py-[6px]">
      <div className="container flex justify-between items-center cont-p-m">
        <img src={logoBlack} alt="logo" />
        <div className="flex gap-6">
          <NavLink to={'/'}>Characters</NavLink>
          <NavLink to={'locations'}>Locations</NavLink>
          <NavLink to={'episodes'}>Episodes</NavLink>
        </div>
      </div>
    </div>
  );
}
