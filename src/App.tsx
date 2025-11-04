import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import SoundProvider from "./components/sound";
import Home from "./screens/home";
import Questions from "./screens/questions";
import Login from "./screens/login";
import Profile from "./screens/profile";
import EditProfile from "./screens/profile/EditProfile";
import ResultScreen from "./screens/resultScreen";
import { Provider } from "react-redux";
import Leaderboard from "./screens/leaderboard";
import { store } from "./store";
import "./index.css";


const App = () => {
  return (
    <Provider store={store}>
      <SoundProvider>
        <BrowserRouter>
          <div className="mainWrapper">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="/questions/:type" element={<Questions />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path = "/result/:type" element={<ResultScreen />} />
            </Routes>
          </div>
        </BrowserRouter>
      </SoundProvider>
    </Provider>
  );
}



export default App;