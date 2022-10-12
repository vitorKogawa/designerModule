interface IEvents {
    name: string,
    source_type: string,
    source_id: string,
    operator: string,
    value: number,
    target_type: string,
    target_id: string,
    modifier: string
}

export type { IEvents }