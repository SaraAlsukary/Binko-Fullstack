export type TComment = {
    comment?: string,
    id?: number,
    name?: string,
    book_id?: number,
    image: string
    user: {
        id: number,
        name: string
    }
}