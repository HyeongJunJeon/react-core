/**
 * Virtual DOM을 실제 DOM에 렌더링
 */
export function renderVirtualDom(vnode) {
  if (vnode === null || vnode === undefined) {
    return;
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

  //key가 on으로 시작하고, value가 function이면 이벤트 핸들러 이므로 이벤트 핸들러 등록
  const isEventElement = (key, value) =>
    key.startsWith("on") && typeof value === "function";

  Object.entries(props).forEach(([key, value]) => {
    if (isEventElement(key, value)) {
      handleEvent(element, key, value);
    } else {
      handleAttribute(element, key, value);
    }
  });
}

/**
 * 대상이되는 element에 이벤트 핸들러 등록
 */
function handleEvent(element, eventName, handler) {
  // on이벤트 이름을 소문자로 변환하고, on을 제거하여 addEventListener에 사용
  const convertedEventName = eventName.toLowerCase().substring(2);
  element.addEventListener(convertedEventName, handler);
}

/**
 * element에 function이 아닌 일반 속성 설정.
 * id, className 등이 있다.
 */
function handleAttribute(element, key, value) {
  // children은 render와 관련된 속성이므로 setAttribute하면 안된다!
  if (key === "children") return;

  if (value !== null && value !== undefined && typeof value !== "object") {
    element.setAttribute(key, String(value));
  }
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
