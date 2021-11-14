const apiUrl = "https://dragonsofmugloar.com/api/v2";

async function request(url: string, method: string): Promise<Response | void> {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response: null | Response = await fetch(url, options).catch((e) => {
    console.log(e);
    return null;
  });

  if (response?.["status"] === 200) {
    return await response.json();
  }
  return;
}

function getRequest(url: string) {
  return request(url, "GET");
}

function postRequest(url: string) {
  return request(url, "POST");
}

function getGameApiUrl(gameId: string) {
  return `${apiUrl}/${gameId}`;
}

export function postStartGame(): Promise<Response | void> {
  return postRequest(`${apiUrl}/game/start`);
}

export function postQueryReputation(gameId: string): Promise<Response | void> {
  return postRequest(`${getGameApiUrl(gameId)}/investigate/reputation`);
}

export function getAllMessages(gameId: string): Promise<Response | void> {
  return getRequest(`${getGameApiUrl(gameId)}/messages`);
}

export function postSolveMessage(
  gameId: string,
  adId: string
): Promise<Response | void> {
  return postRequest(`${getGameApiUrl(gameId)}/solve/${adId}`);
}

export function getShopListing(gameId: string): Promise<Response | void> {
  return getRequest(`${getGameApiUrl(gameId)}/shop`);
}

export function postPurchaseItem(
  gameId: string,
  itemId: string
): Promise<Response | void> {
  return postRequest(`${getGameApiUrl(gameId)}/shope/buy/${itemId}`);
}
