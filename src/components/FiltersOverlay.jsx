export default function FiltersOverlay({ onClickClose, children }) {
  return (
    <div
      onClick={onClickClose}
      className="fixed inset-0 z-50 bg-overlay md:hidden"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="w-[80%] absolute top-1/2 left-1/2 -translate-1/2 bg-white rounded-sm pt-4 pb-5 px-3.5"
      >
        <div className="flex justify-between pb-4">
          <p>Filters</p>
          <svg onClick={onClickClose} className="size-6 fill-gray10">
            <use href="./sprite.svg#icon-close"></use>
          </svg>
        </div>
        <div className="flex flex-col gap-4 mb-8">{children}</div>
        <button
          onClick={onClickClose}
          className="w-full h-9 bg-blue2 text-blue1 rounded-sm shadow-adv-filters-btn"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
