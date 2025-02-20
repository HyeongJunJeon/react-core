import { handleEventListeners, renderVirtualDom } from "./helper";

export function diff(parent, oldNode, newNode, index = 0) {
  if (!oldNode && !newNode) return;
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
    parent.replaceChild(renderVirtualDom(newNode), oldDom);
    return;
  }

  // children을 재귀적으로 diff
  // 문자열이거나 숫자같은 리프 노드인 경우 비교가 불필요하며 이미 비교 완료
  if (typeof newNode !== "string" && typeof newNode !== "number") {
    updateProps(oldDom, oldNode.props, newNode.props);

    const oldChildren = oldNode.props?.children || [];
    const newChildren = newNode.props?.children || [];
    const maxLength = Math.max(oldChildren.length, newChildren.length);

    for (let i = 0; i < maxLength; i++) {
      diff(oldDom, oldChildren[i], newChildren[i], i);
    }
  }
}

/**
 * 타입, 문자열이 다르면 변경되었다고 판단
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
  // 기존 이벤트 리스너 속성 제거
  for (const key in oldProps) {
    if (!(key in newProps)) {
      dom.removeAttribute(key);
    }

    if (key.startsWith("on") && typeof oldProps[key] === "function") {
      handleEventListeners({
        element: dom,
        key,
        value: oldProps[key],
        type: "remove",
      });
    }
  }

  // 새롭게 들어온 props를 설정
  for (const [key, value] of Object.entries(newProps)) {
    if (key.startsWith("on") && typeof value === "function") {
      handleEventListeners({ element: dom, key, value, type: "add" });
    } //
    else if (typeof value === "boolean") {
      if (value) {
        dom.setAttribute(key, "true");
      } else {
        dom.removeAttribute(key);
      }
    } // input의 경우 DOM 프로퍼티에 직접 할당
    else if (key === "value") {
      dom.value = value;
    } //
    else {
      dom.setAttribute(key, String(value));
    }
  }
}
