import { renderVirtualDom } from "./helper";

/**
 * Virtual DOM을 실제 DOM에 렌더링
 */
export function render(vdom, container) {
  const element = renderVirtualDom(vdom);
  if (element) {
    container.appendChild(element);
  }
}
