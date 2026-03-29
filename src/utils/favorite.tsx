import { Heart } from "lucide-react";

type FavoriteProps<T extends { id: number }> = {
    item: T | undefined;
    toggle: (item: T) => void;
    isFavorite: (item: T) => boolean;
};

export function Favorite<T extends { id: number }>({
    item,
    toggle,
    isFavorite,
}: FavoriteProps<T>) {
    if (!item) return null;

    const favorite = isFavorite(item);

    return (
        <span onClick={() => toggle(item)}>
            <Heart
                size={30}
                color={favorite ? "red" : "gray"}
                fill={favorite ? "red" : "none"}
            />
        </span>
    );
}
