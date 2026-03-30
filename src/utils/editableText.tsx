import { Check, Pencil, X } from "lucide-react";
import { useState, type SubmitEventHandler } from "react";

const EditableTextState = {
    Display: 0,
    Editing: 1,
    Saving: 2,
} as const;

type EditableTextState =
    (typeof EditableTextState)[keyof typeof EditableTextState];

type EditableTextProps = {
    value?: string;
    onUpdate: (value: string) => Promise<void>;
};

export function EditableText({ value, onUpdate }: EditableTextProps) {
    const [editState, setEditState] = useState<EditableTextState>(
        EditableTextState.Display,
    );
    const [errorMsg, setErrorMsg] = useState("");

    const handleUpdate: SubmitEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        const valueInput = form.elements.namedItem(
            "valueInput",
        ) as HTMLInputElement;
        setEditState(EditableTextState.Saving);
        try {
            await onUpdate(valueInput.value);
            setErrorMsg("");
            setEditState(EditableTextState.Display);
        } catch (error) {
            setErrorMsg(String(error));
            setEditState(EditableTextState.Editing);
        }
    };

    return editState == EditableTextState.Display ? (
        <span style={{ display: "inline-flex" }}>
            {value}
            <span style={{ width: "0.5em" }}></span>
            <Pencil
                style={{ cursor: "pointer" }}
                onClick={() => setEditState(EditableTextState.Editing)}
            />
        </span>
    ) : (
        <>
            <form style={{ display: "inline-flex" }} onSubmit={handleUpdate}>
                <input
                    type="text"
                    name="valueInput"
                    defaultValue={value}
                    disabled={editState === EditableTextState.Saving}
                    autoFocus
                />
                <button
                    type="submit"
                    className="small"
                    disabled={editState === EditableTextState.Saving}
                >
                    <Check />
                </button>
                <button
                    type="button"
                    className="small"
                    onClick={() => setEditState(EditableTextState.Display)}
                    disabled={editState === EditableTextState.Saving}
                >
                    <X />
                </button>
            </form>
            {errorMsg && <span> {errorMsg}</span>}
        </>
    );
}
