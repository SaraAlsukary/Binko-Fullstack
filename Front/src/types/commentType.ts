export type TComment = {
    comment?: string,
    id?: number,
    name?: string,
    book_id?: number,
    image: string
    user: number,
    replies: [{
        content?: string,
        id?: number,
        name?: string,
        book_id?: number,
        image: string
        user: number,
        parent: number,
        children: []
    }]
}