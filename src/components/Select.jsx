export default function Select({
  onChange,
  value,
  children,
  name,
  className = '',
}) {
  return (
    <select
      value={value}
      name={name}
      className={`h-14 border rounded-lg border-gray1 p-4 ${className}`}
      onChange={onChange}
    >
      <option value="" disabled hidden>
        {name}
      </option>
      {children}
    </select>
  );
}
