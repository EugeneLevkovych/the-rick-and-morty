export default function Select({
  onChange,
  value,
  children,
  name,
  className = '',
}) {
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        name={name}
        className={`appearance-none h-14 w-full border rounded-lg border-gray1 p-4`}
        onChange={onChange}
      >
        <option value="" disabled hidden>
          {name}
        </option>
        {children}
      </select>
      <svg className="absolute top-4 right-4 size-6">
        <use href="./sprite.svg#icon-triangle-down"></use>
      </svg>
    </div>
  );
}
