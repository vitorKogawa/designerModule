import React from 'react'

interface IButtonSidebar extends React.HTMLAttributes<HTMLButtonElement>
{
    label: string,
    icon?: JSX.Element
}

export type { IButtonSidebar }