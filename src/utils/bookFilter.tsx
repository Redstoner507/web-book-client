import {
    useEffect,
    useState,
    type Dispatch,
    type SetStateAction,
    type SubmitEventHandler,
} from "react";
import type { Tag } from "../types";
import { get_tags } from "../api";

type BookFilterProps = {
    handleFilter: SubmitEventHandler<HTMLFormElement>;
    filterTag: Tag[];
    setFilterTag: Dispatch<SetStateAction<Tag[]>>;
};

export function BookFilter({
    handleFilter,
    filterTag,
    setFilterTag,
}: BookFilterProps) {
    const [allTags, setAllTags] = useState<Tag[]>([]);
    const [selectedTagId, setSelectedTagId] = useState<number>(0); // nouvel état pour le select

    useEffect(() => {
        loadAllTags();
    }, []);

    async function loadAllTags() {
        try {
            const res: Tag[] = await get_tags();
            setAllTags(res);
        } catch (error) {
            console.log("failed to load all tags");
            setAllTags([]);
        }
    }

    function addTagToFilter(tag_id: number) {
        if (!tag_id) return;
        const tagToAdd = allTags.find((tag) => tag.id === tag_id);
        if (!tagToAdd) return;
        setFilterTag((prev) => {
            if (prev.some((tag) => tag.id === tagToAdd.id)) return prev;
            return [...prev, tagToAdd];
        });
        setSelectedTagId(0); // reset du select après ajout
    }

    function removeTagFromFilter(tag_id: number) {
        setFilterTag((prev) => prev.filter((item) => item.id !== tag_id));
    }

    return (
        <>
            <h3>Filters</h3>
            <form onSubmit={handleFilter}>
                <label htmlFor="titleFilter">Title </label>
                <input type="text" id="titleFilter" name="titleFilter" />

                <br />
                <button type="submit">Filters</button>

                <p>
                    {filterTag.map((tag) => (
                        <span className="badge" key={tag.id}>
                            {tag.name}
                            <button
                                type="button"
                                onClick={() => removeTagFromFilter(tag.id)}
                            >
                                x
                            </button>
                        </span>
                    ))}
                </p>
                <select
                    name="selectedTag"
                    id="selectedTag"
                    value={selectedTagId}
                    onChange={(e) => setSelectedTagId(Number(e.target.value))}
                >
                    <option value={0}>{"- select tag -"}</option>
                    {allTags.map((tag) => (
                        <option key={tag.id} value={tag.id}>
                            {tag.name}
                        </option>
                    ))}
                </select>
                <button
                    type="button"
                    onClick={() => addTagToFilter(selectedTagId)}
                >
                    Add
                </button>
            </form>
        </>
    );
}
