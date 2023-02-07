import { Routes, Route } from 'react-router-dom'
import HomePage from '../Pages/Homepage'
// import { PrivateRoutes } from './PrivateRoutes'

const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path="*" element={<HomePage />} />
                <Route path="/" element={<HomePage />} />

                {/* <Route path='/profile' element={<PrivateRoutes><ProfilePage /></PrivateRoutes>} /> */}
            </Routes>
        </>
    )
}

export default AppRouter