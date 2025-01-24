export type TInput = {
    onClick?: any,
    type: string,
    name?: string,
    placeholder?: string,
    style?: React.CSSProperties,
    value?: string
    onFocus?: () => void
    onChange?: (e: any) => void,
    register?: object
}