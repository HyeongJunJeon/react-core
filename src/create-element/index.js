export function createElement(type, props) {
  return { type, props: { ...props } };
}
