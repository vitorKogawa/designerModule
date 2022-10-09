interface IAttribute {
    _id: string,
    name: string,
    type: string,
    max_value: number,
    default_value: number,
    player_attr: boolean,
    icon: string,
    __v: number
}

export type { IAttribute }