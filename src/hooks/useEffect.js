// useState와 같이 여러 개의 useEffect를 쓸 수 있으므로 index로 관리
let currentEffectIndex = 0;

/**
 * effect 정보를 저장할 배열
 * 각 원소: { deps, cleanup, effect }
 */
let effects = [];

/**
 * useEffect 자체는 컴포넌트가 렌더링 될 때, deps가 변경되면 callback을 실행하겠다는 일종의 저장 역할.
 * 여기서 저장된 effect객체의 정보로 필요할 곳에서 runEffects함수로 실행한다.
 */
export function useEffect(callback, deps) {
  const index = currentEffectIndex;

  // 해당 index에 아직 없으면 초기화
  if (!effects[index]) {
    effects[index] = {
      deps: undefined,
      cleanup: null,
      effect: null,
    };
  }

  const currentEffect = effects[index];
  const oldDeps = currentEffect.deps;

  // 바뀌었다고 가정해야 초기 렌더링 시 실행 가능
  let hasChanged = true;
  if (oldDeps && deps) {
    // 받은 deps와 이전 deps를 하나씩 비교하여 하나라도 달라졌으면 true
    hasChanged = deps.some((dep, i) => !Object.is(dep, oldDeps[i]));
  }

  currentEffect.deps = deps;

  // 의존성이 바뀌었으면 렌더 후에 실행할 effect를 저장, 아니면 null

  currentEffect.effect = hasChanged ? callback : null;

  currentEffectIndex++;
}

/**
 * - cleanup 함수는 컴포넌트가 언마운트 될 때만 실행되는게 아니라 *****effect가 다시 실행될 때 이전 effect(필요없어진 타이머나 이벤트 리스터)를 정리하기 위해 호출된다.*****
 * - 그래서 1. cleanup이 있다면 먼저 실행해서 이전 effect를 정리하고, 2. 새 effect를 실행하고, 3. 새로운 effect를 새로운 cleanup으로 저장하는 순서를 따라야한다.
 */
export function runEffects() {
  for (let i = 0; i < effects.length; i++) {
    const { effect, cleanup } = effects[i];
    if (effect) {
      if (typeof cleanup === "function") {
        cleanup();
      }

      //effect가 return(cleanup)하는 함수가 있다면 newCleanup에 해당 로직만 저장된다.
      const newCleanup = effect();

      if (typeof newCleanup === "function") {
        effects[i].cleanup = newCleanup;
      } else {
        effects[i].cleanup = null;
      }
    }
  }
}

/**
 * 매 렌더링마다 currentEffectIndex 0으로 초기화
 */
export function resetEffectIndex() {
  currentEffectIndex = 0;
}

/**
 * 현재 컼포넌트가 App.js 하나라서 root를 강제로 비워서 cleanup을 테스트하기 위한 함수
 */
export function unmountApp() {
  for (const effect of effects) {
    if (typeof effect.cleanup === "function") {
      effect.cleanup();
    }
  }

  const root = document.getElementById("root");
  if (root) root.innerHTML = "";
}
