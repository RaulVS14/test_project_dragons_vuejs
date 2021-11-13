interface gameState {
    gameId: string,
    lives: number,
    gold: number,
    level: number,
    score: number,
    highScore: number,
    turn: number
}

export function getStateFromStorage() {
    return localStorage.getItem("state") ? localStorage.getItem("state") : null;
}

export function setStateToStorage(state: gameState) {
    return localStorage.setItem("state", JSON.stringify(state));
}
