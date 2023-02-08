import { useAuth0 } from "@auth0/auth0-react"

const Profile = () => {
    const { user } = useAuth0();

    return (
        <>
            <h1>Profile</h1>
                    <img src={user.picture} alt={user.name} />
            <table>
                <thead>
                    <tr>
                        <th className="border">Nickname</th>
                        <th className="border">Name</th>
                        <th className="border">Last name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th className="border">{user.nickname}</th>
                        <th className="border">{user.given_name}</th>
                        <th className="border">{user.family_name}</th>
                    </tr>
                </tbody>
            </table>
        </>

    )
}

export default Profile