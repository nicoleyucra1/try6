export function readList<T>(key: string): T[]{
    return JSON.parse(localStorage.getItem(key) || '[]')
}

export function addItem<T extends{ id: number }>(key: string, item: T){
    const list = readList<T>(key);
    if (!list.some((x) => x.id === item.id)){
        localStorage.setItem(key, JSON.stringify([...list, item]));
    }
}

export function removeItem(key: string, id: number){
    const list = readList<{id: number}>(key).filter((x) => x.id !== id);
    localStorage.setItem(key, JSON.stringify(list));
}