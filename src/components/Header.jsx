import { NavLink } from 'react-router';
import logoBlack from '../assets/images/logo-black.png';

export default function Header({ onToggleMenu }) {
  return (
    <div className="fixed w-full border-b-0 shadow-md py-[6px] bg-white">
      <div className="container flex justify-between items-center container-padding-margin">
        <img src={logoBlack} alt="logo" />
        <div className="hidden md:flex gap-6">
          <NavLink to={'/'}>Characters</NavLink>
          <NavLink to={'locations'}>Locations</NavLink>
          <NavLink to={'episodes'}>Episodes</NavLink>
        </div>
        <svg onClick={onToggleMenu} className="md:hidden size-6 fill-gray4">
          <use href="./sprite.svg#icon-burger1"></use>
        </svg>
      </div>
    </div>
  );
}
