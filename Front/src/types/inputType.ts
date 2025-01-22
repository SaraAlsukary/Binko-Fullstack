export type TInput = {
    onClick?: () => void,
    type: string,
    placeholder?: string,
    style?: React.CSSProperties,
    value?: string
    onFocus?: () => void
    onChange?: (e: any) => void
}