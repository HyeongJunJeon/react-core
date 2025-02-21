import { eventMap } from "../util/const";

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
      handleEventListeners({ element, key, value, type: "add" });
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

function createSyntheticEvent(nativeEvent) {
  return {
    nativeEvent,
    target: nativeEvent.target,
    preventDefault: () => nativeEvent.preventDefault(),
    stopPropagation: () => nativeEvent.stopPropagation(),
  };
}

/**
 * 이벤트 핸들러 등록 또는 제거
 */
export function handleEventListeners({ element, key, value, type = "add" }) {
  const eventName = eventMap[key] ?? key.toLowerCase().substring(2);

  if (type === "add") {
    const syntheticCallback = (nativeEvent) => {
      const syntheticEvent = createSyntheticEvent(nativeEvent);
      // syntheticEvent 전달
      value(syntheticEvent);
    };

    element.addEventListener(eventName, syntheticCallback);

    // 생성시에 등록한 syntheticCallback을 저장해야한다.
    // 함수도 객체이므로 eventListener가 등록될때마다 참조가 변경되므로
    // 같은 참조의 함수를 추후 제거할 수 있도록 저장해야한다.
    element._listeners = element._listeners || {};
    element._listeners[key] = syntheticCallback;
  } else {
    const callback = element._listeners?.[key];
    if (callback) {
      element.removeEventListener(eventName, callback);
      delete element._listeners[key];
    }
  }
}
