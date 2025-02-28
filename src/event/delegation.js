import { createSyntheticEvent } from "@/event/createSyntheticEvent";

const ALL_EVENTS = ["click", "input", "change"];

function globalEventHandler(e) {
  const { type: eventType, target } = e;
  let currentTarget = target;

  while (currentTarget) {
    const listeners = currentTarget._listeners;
    if (listeners && listeners[eventType]) {
      const syntheticEvent = createSyntheticEvent(e);
      listeners[eventType](syntheticEvent);

      if (syntheticEvent._isPropagationStopped) {
        break;
      }
    }
    currentTarget = currentTarget.parentNode;
  }
}

export function initEventDelegation() {
  ALL_EVENTS.forEach((eventName) => {
    document.addEventListener(eventName, globalEventHandler);
  });
}
