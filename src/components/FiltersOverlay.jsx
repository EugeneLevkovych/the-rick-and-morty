export default function FiltersOverlay({ onClickClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-white md:hidden">
      <svg onClick={onClickClose} className="size-6 fill-gray10">
        <use href="./sprite.svg#icon-close"></use>
      </svg>
    </div>
  );
}
