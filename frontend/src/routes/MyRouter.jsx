import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';

// import components
import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';
import MainPagePlayer from '../components/MainPagePlayer';
import MainPageAdmin from '../components/MainPageAdmin';
import ResultsPageAdmin from '../components/ResultsPageAdmin';
import LivePage from '../components/LivePage';
import SignInAdmin from '../components/SignInAdmin';
import SignUpAdmin from '../components/SignUpAdmin';
import NotFoundPage from '../components/NotFoundPage';
import HomePage from '../components/HomePage';

function MyRouter() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<HomePage />}></Route>
                    <Route path='/SignUp' element={<SignUp />}></Route>
                    <Route path='/SignIn' element={<SignIn />}></Route>
                    <Route path='/SignUpAdmin' element={<SignUpAdmin />}></Route>
                    <Route path='/SignInAdmin' element={<SignInAdmin />}></Route>
                    <Route path='/MainPagePlayer' element={<MainPagePlayer />}></Route>
                    <Route path='/MainPageAdmin' element={<MainPageAdmin />}></Route>
                    <Route path='/ResultsPageAdmin' element={<ResultsPageAdmin />}></Route>
                    <Route path='/LivePage/:songId' element={<LivePage />}></Route>
                    <Route path="*" element={<NotFoundPage />}></Route>
                </Routes>
            </Router>
        </>
    )
}
export default MyRouter;