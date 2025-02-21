import { runEffects } from "../hooks/useEffect";
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

  // useEffect가 컴포넌트에서 실행(effect객체에 useEffect관련 정보가 저장)되고 모든 DOM이 렌더링 되고 나서야 runEffects를 실행한다.
  runEffects();
}
