
type TChild ={
    content: string,
    created_at: string,
    id: number,
    name: string,
    image: string,
    parent: number | null,
    user: number
}
export type TReplies = {
    children: TChild[],
    content: string,
    created_at: string,
    id: number,
    name: string,
    image: string,
    parent: number | null,
    user: number
}