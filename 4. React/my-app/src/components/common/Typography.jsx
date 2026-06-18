function Typography({
  variant = "p",
  children,
  className = ""
}) {
  const Component = variant;

  return (
    <Component className={className}>
      {children}
    </Component>
  );
}

export default Typography;