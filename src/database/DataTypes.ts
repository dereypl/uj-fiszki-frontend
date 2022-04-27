export type TSet = {
    id: string,
    isPublic: boolean,
    name: string,
    userId: string
}

export type TWord = {
    id: string,
    definition: string,
    word: string,
    setId: string
}