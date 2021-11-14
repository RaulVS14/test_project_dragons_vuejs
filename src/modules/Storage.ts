export function getStateFromStorage(): string | null {
  const storageState = localStorage.getItem("state");
  if (storageState) {
    return JSON.parse(storageState);
  }
  return null;
}
interface StateType {
  gameId?: string;
  lives?: number;
  gold?: number;
  level?: number;
  score?: number;
  highScore?: number;
  turn?: number;
}
export function setStateToStorage(state: StateType): string | null {
  localStorage.setItem("state", JSON.stringify(state));
  return getStateFromStorage();
}

export function unsetStateInStorage(): boolean {
  if (localStorage.getItem("state")) {
    localStorage.removeItem("state");
    return !localStorage.getItem("state");
  }
  return true;
}
