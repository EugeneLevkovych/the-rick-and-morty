import axios from 'axios';

import { NavLink, useLocation } from 'react-router';

export default function LocationDetails() {
  return (
    <>
      <div className="container pt-6 pb-20.5 md:pt-10.5 md:pb-9 cont-p-m">
        <NavLink to={'/locations'}>
          <div className="flex items-center gap-2 font-bold text-lg text-black uppercase cursor-pointer mb-4">
            <svg className="size-6">
              <use href="./sprite.svg#icon-arrow-back"></use>
            </svg>
            <p>Go back</p>
          </div>
        </NavLink>
      </div>
    </>
  );
}
