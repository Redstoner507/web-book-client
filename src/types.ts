export type Author = {
    id: number;
    firstname: string;
    lastname: string;
    books?: Book[];
};

export type AuthorCreationData = Partial<Omit<Author, "id">>;

export type Book = {
    id: number;
    title: string;
    publication_year?: number;
    authorId: number;
    tags?: Tag[];
};

export type BookCreationData = Partial<Omit<Book, "id">>;

export type Tag = {
    id: number;
    name: string;
    books?: Book[];
};
