import { useEffect, useState } from "react";

type WithId = { id: number };

export function useLocalStorage<T extends WithId>(
    key: string,
    initialValue: T[],
) {
    const [list, setList] = useState<T[]>(() => {
        try {
            const stored = localStorage.getItem(key);
            return stored ? (JSON.parse(stored) as T[]) : initialValue;
        } catch {
            return initialValue;
        }
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(list));
    }, [key, list]);

    function toggle(item: T) {
        const exists = list.some((fav) => fav.id === item.id);
        if (exists) remove(item.id);
        else add(item);
    }

    function isFavorite(item: T) {
        return list.some((fav) => fav.id === item.id);
    }

    function add(item: T) {
        console.log("Adding");
        setList((prev) => [...prev, item]);
    }

    function remove(id: number) {
        console.log("Removing");
        setList((prev) => prev.filter((item) => item.id !== id));
    }

    function update(id: number, newItem: Partial<T>) {
        setList((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, ...newItem } : item,
            ),
        );
    }

    function replace(newList: T[]) {
        setList(newList);
    }

    function clear() {
        setList([]);
    }

    return {
        list,
        setList,
        toggle,
        isFavorite,
        add,
        remove,
        update,
        replace,
        clear,
    };
}
