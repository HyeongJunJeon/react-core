//왠지 모르겠는데 children이 props에 포함되어 있음
export function createElement(type, props) {
  console.log(type, props);
  return { type, props: { ...props } };
}
