import { handleEventListeners } from "@/event/handleEventListeners";
import { VALID_ATTRIBUTES } from "@/util/const";
import { renderVirtualDom } from "@/render/helper";

export function diff(parent, oldNode, newNode, index = 0) {
  if (!oldNode && !newNode) return;

  // newNode에서 없어졌다면 삭제된 요소
  if (oldNode && !newNode) {
    const oldDom = parent.childNodes[index];
    if (oldDom) parent.removeChild(oldDom);
    return;
  }

  const oldDom = parent.childNodes[index];

  // 맨 처음 비교 때는 oldNode가 없고 newNode만 있으므로 새 요소 추가
  if (!oldNode && newNode) {
    parent.appendChild(renderVirtualDom(newNode));
    return;
  }

  // newNode에서 없어졌다면 삭제된 요소
  if (oldNode && !newNode) {
    if (oldDom) parent.removeChild(oldDom);
    return;
  }

  // 노드가 변경되었는지 판단 후 새로운 노드로 교체
  if (isChangedNode(oldNode, newNode)) {
    const newDom = renderVirtualDom(newNode);
    if (oldDom && newDom instanceof Node) {
      parent.replaceChild(newDom, oldDom);
    }
    return;
  }

  // children을 재귀적으로 diff
  // 문자열이거나 숫자같은 리프 노드인 경우 비교가 불필요하며 이미 비교 완료
  if (typeof newNode !== "string" && typeof newNode !== "number") {
    updateProps(oldDom, oldNode.props, newNode.props);

    // 두 children의 길이를 비교해 더 긴 쪽을 기준으로 재귀적으로 비교
    const oldChildren = oldNode.props?.children || [];
    const newChildren = newNode.props?.children || [];
    const maxLength = Math.max(oldChildren.length, newChildren.length);

    for (let i = 0; i < maxLength; i++) {
      diff(oldDom, oldChildren[i], newChildren[i], i);
    }
  }
}

/**
 * 타입(태그), 문자, 숫자가 다르면 변경되었다고 판단
 */
function isChangedNode(oldNode, newNode) {
  if (oldNode == null || newNode == null) return oldNode !== newNode;

  if (typeof oldNode !== typeof newNode) return true;

  if (typeof oldNode === "string" && oldNode !== newNode) return true;
  if (typeof oldNode === "number" && oldNode !== newNode) return true;

  if (oldNode.type !== newNode.type) return true;

  return false;
}

/**
 * oldProps와 newProps를 비교해 변경된 부분만 업데이트
 */
function updateProps(dom, oldProps = {}, newProps = {}) {
  const allKeys = new Set([...Object.keys(oldProps), ...Object.keys(newProps)]);

  for (const key of allKeys) {
    const oldVal = oldProps[key];
    const newVal = newProps[key];

    if (key.startsWith("on")) {
      if (typeof oldVal === "function" && oldVal !== newVal) {
        handleEventListeners({
          element: dom,
          key,
          value: oldVal,
          type: "remove",
        });
      }

      if (typeof newVal === "function" && oldVal !== newVal) {
        handleEventListeners({ element: dom, key, value: newVal, type: "add" });
      }

      continue;
    }

    // style 처리
    if (key === "style") {
      if (newVal && typeof newVal === "object") {
        handleStyle(dom, oldVal, newVal);
      } else {
        // 새로운 style이 객체가 아니면 전체 제거
        if (typeof oldVal === "object") {
          for (const styleKey in oldVal) {
            dom.style[styleKey] = "";
          }
        }
      }
      continue;
    }

    // className -> class
    if (key === "className") {
      if (newVal == null) {
        dom.removeAttribute("class");
      } else {
        dom.setAttribute("class", String(newVal));
      }
      continue;
    }

    // 이전과 동일하므로 아무 작업도 안 함
    if (oldVal === newVal && newVal != null) {
      continue;
    }

    if (newVal == null) {
      dom.removeAttribute(key);
      continue;
    }

    if (typeof newVal === "boolean") {
      if (newVal) dom.setAttribute(key, "true");
      else dom.removeAttribute(key);
      continue;
    }

    // input의 경우 DOM 프로퍼티에 직접 할당
    if (key === "value") {
      dom.value = newVal;
      continue;
    }

    // 허용된 속성인 경우
    if (VALID_ATTRIBUTES.includes(key)) {
      if (newVal == null) {
        dom.removeAttribute(key);
      } else if (oldVal !== newVal) {
        dom.setAttribute(key, String(newVal));
      }
      continue;
    }
  }
}

// 스타일을 비교하여 변경된 부분만 업데이트
function handleStyle(dom, oldStyle = {}, newStyle = {}) {
  for (const key in oldStyle) {
    if (!(key in newStyle)) {
      dom.style[key] = "";
    }
  }

  for (const [key, value] of Object.entries(newStyle)) {
    if (oldStyle[key] !== value) {
      dom.style[key] = value;
    }
  }
}
