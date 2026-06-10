function TextAreaField({
  value,
  onChange,
  placeholder
}) {
  return (
    <textarea
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

export default TextAreaField;