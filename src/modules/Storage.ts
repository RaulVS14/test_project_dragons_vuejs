export function getStateFromStorage(): string | null {
    const storageState = localStorage.getItem("state");
    if (storageState) {
        return JSON.parse(storageState);
    }
    return null;
}

export function setStateToStorage(state: Response): string | null {
    localStorage.setItem("state", JSON.stringify(state))
    return getStateFromStorage();
}

export function unsetStateInStorage() {
    if (localStorage.getItem('state')) {
        localStorage.removeItem('state')
        return !localStorage.getItem('state');
    }
    return;
}
