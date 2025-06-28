import { NavLink } from 'react-router';

export default function CharacterDetails() {
  return (
    <div className="container cont-p-m">
      <NavLink to={'/'}>
        <p className="uppercase cursor-pointer">&larr; Go back</p>
      </NavLink>
      <p>Character Details</p>
    </div>
  );
}
