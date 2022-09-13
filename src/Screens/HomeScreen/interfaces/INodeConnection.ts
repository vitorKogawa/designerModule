interface INodeConnection {
    __id: string,
    source: string,
    target: string,
    gameId: string,
    __v: number,
    animated?: boolean,
    arrowHeadType?: any,
    sourceHandle?: string,
    targetHandle?: string
}

export type { INodeConnection }