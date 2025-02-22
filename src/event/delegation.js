import { createSyntheticEvent } from "./createSyntheticEvent";

const ALL_EVENTS = ["click", "input", "change"];

function globalEventHandler(e) {
  const { type: eventType, target } = e;

  let currentTarget = target;

  // 버블링을 따라 올라가면서 _listeners가 있는지 확인
  while (currentTarget) {
    const listeners = currentTarget._listeners;
    if (listeners && listeners[eventType]) {
      const syntheticEvent = createSyntheticEvent(e);
      listeners[eventType](syntheticEvent);
    }
    currentTarget = currentTarget.parentNode;
  }
}

export function initEventDelegation() {
  ALL_EVENTS.forEach((eventName) => {
    document.addEventListener(eventName, globalEventHandler, true);
  });
}
