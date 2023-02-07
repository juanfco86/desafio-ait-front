import AuthenticationButton from '../auth0/AuthenticationButton'

export function Header() {
    return (
        <>
            <nav className="navbar">
                <AuthenticationButton />
            </nav>
        </>
    )
}