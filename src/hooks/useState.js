import App from "../App";
import { render } from "../render";

/**
 * useState를 여러개 사용할 수 있으므로 올바른 위치에 저장하고 식별하여 사용하기 위해 사용
 */
let currentStateIndex = 0;

/**
 * 모든 state를 저장하는 배열
 */
let states = [];

export function useState(initialValue) {
  // useState가 컴포넌트에서 선언될 때의 인덱스를 저장하여, 이후에도 올바른 state를 참조할 수 있도록 함
  const index = currentStateIndex;

  // 초기 값 설정
  if (!states[index]) {
    states[index] = initialValue;
  }

  const setState = (newValue) => {
    states[index] = newValue;

    rerender();
  };

  currentStateIndex++;

  return [states[index], setState];
}

/**
 * currentStateIndex는 매렌더링마다 0으로 초기화하여, 컴포넌트에서 사용되는 state들의 순서를 매 랜더링마다 저장.
 * states는 기존 값들을 보존해야 하므로 초기화하지 않음.
 */
function rerender() {
  currentStateIndex = 0;

  const rootElement = document.getElementById("root");

  rootElement.innerHTML = "";
  const app = App();
  render(app, rootElement);
}
