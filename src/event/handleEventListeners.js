import { eventMap } from "../util/const";

export function handleEventListeners({ element, key, value, type = "add" }) {
  const eventName = eventMap[key] ?? key.toLowerCase().substring(2);

  if (type === "add") {
    // 전역 리스너가 syntheticEvent를 만들 수 있으므로
    // 여기서는 그냥 원본 함수만 저장
    element._listeners = element._listeners || {};

    element._listeners[eventName] = value;
  } else {
    if (element._listeners && element._listeners[eventName]) {
      delete element._listeners[eventName];
    }
  }
}
