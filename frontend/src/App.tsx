import { Route, Routes } from "react-router-dom"
import Home from "./components/layout/Home"
import DashboardPage from "./pages/DashboardPage"
import LoginPage from "./pages/Auth/LoginPage"
import SignupPage from "./pages/Auth/SignupPage"
// import PrivateRoute from "./PrivateRoute"
import Profile from "./components/profile/Profile"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/signup" element={<SignupPage/>}/>
      <Route path="/profile" element={<Profile/>}/>
      {/* <Route path="/dashboard" element={<PrivateRoute/>}> */}
        <Route path="/dashboard" element={<DashboardPage/>}/>
      {/* </Route> */}
    </Routes>
  )
}

export default App
