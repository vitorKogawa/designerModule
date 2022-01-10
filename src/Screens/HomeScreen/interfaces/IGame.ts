interface IPosition {
    _id: string,
    x: number,
    y: number
}

interface INextNode {
    _id: string,
    id: string,
    choice: string
}

interface INode {
    startNode: boolean,
    endNode: boolean,
    labels: [],
    form: [],
    _id: string,
    name: string,
    position: IPosition,
    nodeColor: string,
    textColor: string,
    backgroundColor: string,
    duration: number,
    markdownContent: string,
    nextNodes: INextNode[],
    nodeType: string,
    __v: number,
    nodeImage?: string,
    theme: string,
    compiled_content?: string
}

interface IGame {
    default_node_color: string,
    default_text_color: string,
    template: boolean,
    background_color: string,
    nodes: INode[],
    _id: string,
    title: string,
    description: string,
    background_image: string,
    image: string,
    userID: string,
    __v: number
}

export type { IGame, INode, INextNode, IPosition }
