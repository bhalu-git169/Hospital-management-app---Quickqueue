function Dropdown({ label, value, onChange, options }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <select value={value} onChange={onChange} required>
        <option value="">-- Select Department --</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
