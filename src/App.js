import AppRouter from "./Routes/AppRouter";
import { Header } from './Components/Header/Header'
import './index.css'

function App() {

    return (
        <>
            <div>
                <Header />
                <div>
                    <AppRouter />
                </div>
            </div>
        </>
    )
}

export default App;
