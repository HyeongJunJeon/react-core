export function createSyntheticEvent(nativeEvent) {
  return {
    nativeEvent,
    target: nativeEvent.target,
    preventDefault: () => nativeEvent.preventDefault(),
    stopPropagation: () => nativeEvent.stopPropagation(),
  };
}
