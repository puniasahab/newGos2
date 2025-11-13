import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import SoundProvider from "./components/sound";
import Home from "./screens/home";
import Questions from "./screens/questions";
import Login from "./screens/login";
import Profile from "./screens/profile";
import EditProfile from "./screens/profile/EditProfile";
import ResultScreen from "./screens/resultScreen";
import PrivacyPolicy from "./screens/privacyPolicy";
import TermsAndConditions from "./screens/t&C";
import { Provider } from "react-redux";
import Leaderboard from "./screens/leaderboard";
import { store } from "./store";
import { LanguageProvider } from "./contexts/LanguageContext";
import "./index.css";


const App = () => {
  return (
    <Provider store={store}>
      <LanguageProvider>
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
                <Route path="/result/:type" element={<ResultScreen />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              </Routes>
            </div>
          </BrowserRouter>
        </SoundProvider>
      </LanguageProvider>
    </Provider>
  );
}



export default App;