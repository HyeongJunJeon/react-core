import { diff } from "./diff";
import { renderVirtualDom } from "./helper";

let oldVDOM = null;

export function render(newVDOM, container) {
  if (!oldVDOM) {
    const dom = renderVirtualDom(newVDOM);
    container.appendChild(dom);
  } else {
    diff(container, oldVDOM, newVDOM, 0);
  }

  oldVDOM = newVDOM;
}
