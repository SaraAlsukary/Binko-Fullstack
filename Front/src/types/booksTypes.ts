export type TBooks = {
    id?: number,
    content?: string,
    is_liked?: boolean,
    is_accept?: boolean,
    user?: {
        name: string,
        id: number
    },
    average_rating: number,
    name?: string,
    image?: string,
    description?: string,
    dislikes_count: number,
    likes_count: number,
    categories?: [],
    publication_date?: string
}