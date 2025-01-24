export type TButton = {
    children: React.ReactNode,
    style?: React.CSSProperties,
    className?: string,
    type?: "submit" | "button" | 'reset' | undefined,
    onSubmit?: () => void,
    disabled?: boolean,
    onClick?: () => void
}