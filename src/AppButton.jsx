export function AppButton({title, onClick, disabled}) {
    return (
    <>
        <button disabled={disabled} onClick={onClick}>{title}</button>
    </>)
}