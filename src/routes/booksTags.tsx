import { useEffect, useState, type SubmitEventHandler } from "react";
import { useParams } from "react-router";
import type { Tag } from "../types";
import {
    add_tag_to_book,
    delete_one_from_book,
    get_all_tags_of_book,
    get_tags,
} from "../api";

export function BooksTags() {
    let { book_id } = useParams();
    const [allTags, setAllTags] = useState<Tag[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);
    //const [loading, setLoading] = useState(true);
    const [isTagAddOrRemove, setIsTagAddOrRemove] = useState(false);

    useEffect(() => {
        loadAllTags();
    }, []);

    useEffect(() => {
        loadTagsOfBook();
    }, [book_id, isTagAddOrRemove]);

    async function loadAllTags() {
        try {
            const res: Tag[] = await get_tags();
            setAllTags(res);
        } catch (error) {
            console.log("failed to load all tags");
            setAllTags([]);
        }
        setIsTagAddOrRemove(false);
    }

    async function loadTagsOfBook() {
        try {
            const res: Tag[] = await get_all_tags_of_book(Number(book_id));
            setTags(res);
        } catch (error) {
            console.log("failed to load tags of book");
            setTags([]);
        }
        setIsTagAddOrRemove(false);
    }

    async function removeTagFromBook(tag_id: number) {
        setIsTagAddOrRemove(true);
        delete_one_from_book(Number(book_id), tag_id);
    }

    const handleAddTagToBook: SubmitEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        const selectedTag = form.elements.namedItem("tag") as HTMLInputElement;
        const tag_id = Number(selectedTag.value);

        if (tag_id == 0) return;

        try {
            setIsTagAddOrRemove(true);
            add_tag_to_book(Number(book_id), tag_id);
            form.reset();
        } catch (error) {}
    };

    return (
        <>
            <p>
                Tags:
                {tags.map((tag) => {
                    return (
                        <span className="badge" key={tag.id}>
                            {tag.name}
                            <button onClick={() => removeTagFromBook(tag.id)}>
                                x
                            </button>
                        </span>
                    );
                })}
            </p>
            <form onSubmit={handleAddTagToBook}>
                <select name="tag" id="tag">
                    <option value={0}>{"- select tag -"}</option>
                    {allTags.map((tag) => {
                        return (
                            <option key={tag.id} value={tag.id}>
                                {tag.name}
                            </option>
                        );
                    })}
                </select>{" "}
                <button>Add</button>
            </form>
        </>
    );
}
