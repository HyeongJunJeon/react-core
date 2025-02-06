import App from "./App";

const app = App();

/* {
<h1>Hello</h1>가 createElement함수를 통해 return된 예시
 {
  type: 'h1',
  props: {
    children: 'Hello'
  }
}

    1. document에 h1 태그를 생성
    2. 배열은 아니기 떄문에 else if 구문을 타게되고 재귀적으로 함수를 호출하여
       props.children은 'Hello'이기 때문에 텍스트 노드를 생성
    3. 텍스트 노드를 미리 생성된 h1 태그에 appendChild로 추가
    4. return 된 element는 root에 appendChild로 추가되어 dom에 그려진다.
    5. 중첩된 구조에서는 재귀적으로 함수를 호출하며 위의 과정을 반복한다.
} */

function renderByCreateElement(elementObject) {
  if (!elementObject) {
    return;
  }
  console.log("elementObject", elementObject);
  if (typeof elementObject === "string") {
    return document.createTextNode(elementObject);
  }

  const element = document.createElement(elementObject.type);

  if (Array.isArray(elementObject.props.children)) {
    elementObject.props.children.forEach((child) => {
      const childElement = renderByCreateElement(child);
      element.appendChild(childElement);
    });
  } else if (elementObject.props.children) {
    const childElement = renderByCreateElement(elementObject.props.children);
    element.appendChild(childElement);
  }

  return element;
}

const root = document.getElementById("root");
const element = renderByCreateElement(app);
//jsx가 아무것도 return 하지 않으면 element는 undefined가 되므로 appendChild가 실행 x
if (element) {
  root.appendChild(element);
}
