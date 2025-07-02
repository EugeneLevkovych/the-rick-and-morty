export default function AdvFiltBtn({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="relative md:hidden items-center bg-blue2 shadow-adv-filters-btn rounded-lg p-4 mb-12"
    >
      <svg className="absolute top-4 left-6 size-5 fill-gray4">
        <use href="./sprite.svg#icon-burger2"></use>
      </svg>
      <p className="text-center text-blue1">Advanced Filters</p>
    </div>
  );
}
