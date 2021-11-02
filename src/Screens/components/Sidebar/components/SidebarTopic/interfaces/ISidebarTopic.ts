interface ISidebarTopic {
    title: string,
    icon: JSX.Element,
    path: string
    isActive?: boolean
}

export type { ISidebarTopic };