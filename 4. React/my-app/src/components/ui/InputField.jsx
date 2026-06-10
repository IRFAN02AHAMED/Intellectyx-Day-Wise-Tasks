function InputField({
  value,
  onChange,
  placeholder,
  type = "text"
}) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

export default InputField;