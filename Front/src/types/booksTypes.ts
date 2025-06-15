export type TBooks = {
    id?: number,
    content?: string,
    is_liked?: boolean,
    is_accept?: boolean,
    user?: {
        name: string,
        id: number
    },
    name?: string,
    image?: string,
    description?: string,
    categories?: [],
    publication_date?: string
}