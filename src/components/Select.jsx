export default function Select({ onChange, value, children, name }) {
  return (
    <select
      value={value}
      name={name}
      className="inp-border"
      onChange={onChange}
    >
      <option value="" disabled hidden>
        {name}
      </option>
      {children}
    </select>
  );
}
