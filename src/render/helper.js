/**
 * Virtual DOM을 실제 DOM에 렌더링
 */
export function renderVirtualDom(vnode) {
  if (vnode === null || vnode === undefined) {
    return null;
  }

  // string이거나, number type이면 텍스트 노드 생성
  if (typeof vnode === "string" || typeof vnode === "number") {
    return document.createTextNode(String(vnode));
  }

  const element = document.createElement(vnode.type);
  handleProps(element, vnode.props);
  handleChildren(element, vnode.props?.children);

  return element;
}

/**
 * 전달된 props를 토대로 이벤트 핸들러 등록을 하거나 속성을 설정
 */
function handleProps(element, props) {
  if (!props) return;

  Object.entries(props).forEach(([key, value]) => {
    if (key.startsWith("on") && typeof value === "function") {
      //TODO: onChange는 input 요쇼로 등록해야하는데
      // input으로 등록시 input에 한글자씩 글을 입력할 때마다 포커스가 빠짐
      // 입력할때마다 state가 리렌더링 되면서 발생하는 것으로 추정되어 좀 더 고민이 필요.
      const eventMap = {
        // onChange: "input",
        onClick: "click",
      };

      const eventName = eventMap[key] ?? key.toLowerCase().substring(2);
      return element.addEventListener(eventName, value);
    }

    if (key !== "children" && key !== "key") {
      switch (typeof value) {
        // checkbox가 계속 true 값을 가지게 되서 속성 자체를 제거
        case "boolean":
          value
            ? element.setAttribute(key, "true")
            : element.removeAttribute(key);
          break;

        default:
          element.setAttribute(key, String(value));
      }
    }
  });
}

/**
 * children을 array로 변환하고, 재귀적으로 renderVirtualDom을 호출하여,
 * 기존에 만들어진 element에 자식 요소를 추가
 */
function handleChildren(element, children) {
  if (!children) return;

  const childrenArray = Array.isArray(children) ? children : [children];
  childrenArray.forEach((child) => {
    if (child !== null && child !== undefined) {
      const childElement = renderVirtualDom(child);
      if (childElement) {
        element.appendChild(childElement);
      }
    }
  });
}
