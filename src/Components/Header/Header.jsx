import { Link } from 'react-router-dom'
import AuthenticationButton from '../auth0/AuthenticationButton'
import { useAuth0 } from '@auth0/auth0-react'
import Search from '../Search/Search'
import { UploadGif } from '../Modals/UploadGif/UploadGif'
import Dropdown from '../Dropdown/Dropdown'

export function Header() {
    const { isAuthenticated } = useAuth0()


    return (
        <>
            <nav className="navbar">
                <div className='nav--container'>
                    <Link to="/">
                        <button className='btn btn-primary btn-block'>Home</button>
                    </Link>
                    <Link to="/trending">
                        <button className='btn btn-primary btn-block'>Trendings</button>
                    </Link>
                    <Dropdown />
                    <Link to="/random">
                        <button className='btn btn-primary btn-block'>Random</button>
                    </Link>
                    {
                        !!isAuthenticated ?
                        <div><UploadGif /></div>
                        : ''
                    }
                    {
                        !!isAuthenticated ?
                        <Link to="/mygifs">
                                <button className='btn btn-primary btn-block'>My gifs</button>
                            </Link> : ''
                    }
                    {
                        !!isAuthenticated ?
                        <Link to="/profile">
                                <button className='btn btn-primary btn-block'>Profile</button>
                            </Link> : ''
                    }
                    <AuthenticationButton />
                </div>
            <Search />
            </nav>
        </>
    )
}