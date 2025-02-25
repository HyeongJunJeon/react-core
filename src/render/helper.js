import { handleEventListeners } from "../event/handleEventListeners";
import { validAttributes } from "../util/const";

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

  // 컴포넌트를 렌더링하는 경우
  if (typeof vnode.type === "function") {
    const childVnode = vnode.type(vnode.props || {});
    return renderVirtualDom(childVnode);
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
      handleEventListeners({ element, key, value, type: "add" });
    }

    // className -> class 속성
    else if (key === "className") {
      element.setAttribute("class", value);
    }

    // 각 CSS 속성을 element.style에 할당
    else if (key === "style" && typeof value === "object") {
      Object.entries(value).forEach(([styleKey, styleValue]) => {
        element.style[styleKey] = styleValue;
      });
    }

    // 허용된 속성인 경우
    else if (validAttributes.includes(key)) {
      switch (typeof value) {
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
