export type TBooks = {
    id?: number,
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