import { ArrowHeadType } from "react-flow-renderer";

interface INodeConnection {
    __id: string,
    source: string,
    target: string,
    gameId: string,
    __v: number,
    animated?: boolean,
    arrowHeadType?: ArrowHeadType,
    sourceHandle?: string,
    targetHandle?: string
}

export type { INodeConnection }