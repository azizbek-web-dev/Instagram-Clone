import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Search from './pages/Search';
import Activity from './pages/Activity';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Live from './pages/Live';
import MyLive from './pages/MyLive';
import Story from './pages/Story';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/live/:username" element={<Live />} />
        <Route path="/my-live" element={<MyLive />} />
        <Route path="/stories/:username" element={<Story />} />
      </Routes>
    </Router>
  );
}

export default App;
