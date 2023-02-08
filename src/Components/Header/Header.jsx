import { Link } from 'react-router-dom'
import AuthenticationButton from '../auth0/AuthenticationButton'
import { useAuth0 } from '@auth0/auth0-react'
import Search from '../Search/Search'
import { UploadGift } from '../Modals/UploadGift/UploadGift'

export function Header(search, setSearch) {
    const { isAuthenticated } = useAuth0()
    

    return (
        <>
            <nav className="navbar">
                <Link to="/">
                    <button className='btn btn-primary btn-block'>Home</button>
                </Link>
                <Link to="/trending">
                    <button className='btn btn-primary btn-block'>Trendings</button>
                </Link>
                <Link to="/random">
                    <button className='btn btn-primary btn-block'>Random</button>
                </Link>
                {
                    !!isAuthenticated ?
                        <div><UploadGift /></div>
                        : ''
                }
                {
                    !!isAuthenticated ?
                    <Link to="/mygifts">
                        <button className='btn btn-primary btn-block'>My Gifts</button>
                    </Link> : ''
                }
                {
                    !!isAuthenticated ?
                    <Link to="/profile">
                        <button className='btn btn-primary btn-block'>Profile</button>
                    </Link> : ''
                }
                <AuthenticationButton />
            </nav>
            <Search setSearch={setSearch} />
        </>
    )
}