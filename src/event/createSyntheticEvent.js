export function createSyntheticEvent(nativeEvent) {
  return {
    nativeEvent,
    target: nativeEvent.target,
    _isPropagationStopped: false,

    preventDefault() {
      nativeEvent.preventDefault();
    },
    stopPropagation() {
      this._isPropagationStopped = true;
      nativeEvent.stopPropagation();
    },
  };
}
