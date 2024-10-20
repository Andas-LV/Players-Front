export type User = {
    id: number,
    email: string,
    username: string,
    avatar_url: string | null,
}

export type Register = {
    email: string,
    username: string,
    password: string,
}

export type Login = {
    username: string,
    password: string,
}