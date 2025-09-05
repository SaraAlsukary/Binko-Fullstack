export type TAuth = {

    user: {
        id: number,
        is_supervisor: boolean,
        is_admin: boolean,
        is_reader: boolean,
        is_accept: boolean,
        age: number,
        username: string,
        name: string,
        image: string,
        discriptions: string,
        category: string
    }
    message?: string,
    token: string,
} | null;