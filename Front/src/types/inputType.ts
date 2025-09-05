export type TInput = {
    id?:number | string,
    onClick?: any,
    checked?: boolean,
    type: string,
    name?: string,
    placeholder?: string,
    style?: React.CSSProperties,
    value?: string,
    onFocus?: () => void
    onChange?: (e: any) => void,
    register?: object
}