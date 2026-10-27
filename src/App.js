// import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  //Link
} from "react-router-dom";
import LoginPage from './pages/LoginPage';
import Unauthorized from './components/Unauthorized';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateAccount from './pages/CreateAccount';

function App() {

  return (
    <>
      <Router>
        <Routes>
          {/* Login page */}
          <Route path="/auth/loginpage" element={<LoginPage />} />
          <Route path="/auth/createAccount" element={<CreateAccount />} />
          <Route path="*" element={<Unauthorized />} />
        </Routes>
      </Router >
    </>
  );
}

export default App;


