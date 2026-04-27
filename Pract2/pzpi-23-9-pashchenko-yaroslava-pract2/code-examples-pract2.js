//Створення нової картки
async function createNewCard(listId, name, desc, key, token) {
    const endpoint = `https://api.trello.com/1/cards`;
    const params = new URLSearchParams({
        idList: listId, name, desc, key, token
    });

    try {
        const response = await fetch(`${endpoint}?${params}`, {
            method: 'POST',
            headers: { 'Accept': 'application/json' }
        });

        if (!response.ok) throw new Error(`Помилка: ${response.status}`);

        const result = await response.json();
        console.log(`Картку створено з ID: ${result.id}`);
        return result;
    } catch (error) {
        console.error(`Помилка запиту:`, error);
    }
}

//Отримання списку карток з дошки
async function getBoardData(boardId, key, token) {
    const endpoint = `https://api.trello.com/1/boards/${boardId}/cards`;
    const params = new URLSearchParams({ key, token, fields: 'id,name' });

    try {
        const response = await fetch(`${endpoint}?${params}`, { method: 'GET' });
        if (!response.ok) throw new Error(`Помилка: ${response.status}`);

        const cards = await response.json();
        return cards;
    } catch (error) {
        console.error(`Помилка отримання даних:`, error);
    }
}
