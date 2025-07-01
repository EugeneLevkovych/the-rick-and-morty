import Select from '../components/Select';
import { SPECIES, GENDER, STATUS } from '../data/filtersData';

export default function FiltersOverlay({ onClickClose }) {
  return (
    <div
      onClick={onClickClose}
      className="fixed inset-0 z-50 bg-black opacity-60 md:hidden"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="absolute top-1/2 left-1/2 -translate-1/2 bg-white px-3.5"
      >
        <div className="flex justify-between">
          <p>Filters</p>
          <svg onClick={onClickClose} className="size-6 fill-gray10">
            <use href="./sprite.svg#icon-close"></use>
          </svg>
        </div>
        <div className="flex flex-col gap-4 mb-8">
          <Select className="w-full min-w-70" />
          <Select className="w-full min-w-70" />
          <Select className="w-full min-w-70" />
        </div>
        <button>Apply</button>
      </div>
    </div>
  );
}
