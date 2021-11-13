const apiUrl = 'https://dragonsofmugloar.com/api/v2';


async function request(url: string, method: string) {
    let options: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const response: null | Response = await fetch(url, options).catch((e) => {
        console.log(e);
        return null;
    });

    if (response?.['status'] === 200) {
        return await response.json();
    }
    return
}

function getRequest(url: string) {
    return request(url, 'GET');
}

function postRequest(url: string) {
    return request(url, 'POST');
}

function getGameApiUrl(gameId: string) {
    return `${apiUrl}/${gameId}`
}

export function postStartGame() {
    return postRequest(`${apiUrl}/game/start`)
}

export function postQueryReputation(gameId: string) {
    return postRequest(`${getGameApiUrl(gameId)}/investigate/reputation`);
}

export function getAllMessages(gameId: string) {
    return getRequest(`${getGameApiUrl(gameId)}/messages`);
}

export function postSolveMessage(gameId: string, adId: string) {
    return postRequest(`${getGameApiUrl(gameId)}/solve/${adId}`)
}

export function getShopListing(gameId: string) {
    return getRequest(`${getGameApiUrl(gameId)}/shop`)
}

export function postPurchaseItem(gameId: string, itemId: string) {
    return postRequest(`${getGameApiUrl(gameId)}/shope/buy/${itemId}`)
}