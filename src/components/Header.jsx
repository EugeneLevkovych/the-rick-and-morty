import { NavLink } from 'react-router';

export default function Header() {
  return (
    <div>
      <NavLink to={'/'}>Characters</NavLink>
      <NavLink to={'locations'}>Locations</NavLink>
      <NavLink to={'episodes'}>Episodes</NavLink>
      <hr />
    </div>
  );
}
