import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from 'react';

import UserContext from './context/userContext';
import { AuthContextProvider, UserAuth } from "./context/AuthContext"
import Landing from "./pages/landing";
import FindPage from './pages/find';
import ProfileSetting from './pages/profile';
import Notification from './pages/notification';
import Message from './pages/messagepage';
import Setting from './pages/settings';
import Tutorial from './pages/tutorial';
import EditProfile from './pages/editProfile';
import Verify from './pages/verify';

import WelcomePage from "./pages/login/welcomePage";
import PhoneNumberPage from "./pages/login/phoneNumberPage";
import EnterCode from "./pages/login/enterCode";
import Age from "./pages/profile/age";
import FriendShip from "./pages/profile/friendship";
import ProfileData from "./pages/profile/profileData";
import Location from "./pages/profile/location";
import PhotoUpload from "./pages/profile/photoupload";
import PhotoAddMore from "./pages/profile/photoAddMore";
import Description from "./pages/profile/description";

function App() {
  const [phoneNumber, setPhoneNumber] = useState();
  const [userName, setUserName] = useState("");
  const [userBrithday, setUserBrithday] = useState();
  const [userSex, setUserSex] = useState("");
  const [userSexual, setUserSexual] = useState("");
  const [userStatus, setUserStatus] = useState("");
  const [userLooking, setUserLooking] = useState([]);
  const [userShow, setUserShow] = useState([]);
  const [userDescription, setUserDescription] = useState("");
  const [userAge, setUserAge] = useState();
  const [userId, setUserId] = useState();
  const [userImages, setUserImages] = useState([]);

  return (
    <AuthContextProvider>
      <UserContext.Provider value={{ phoneNumber, setPhoneNumber, userName, setUserName, userBrithday, setUserBrithday, userSex, setUserSex, userSexual, setUserSexual, userStatus, setUserStatus, userLooking, setUserLooking, userShow, setUserShow, userDescription, setUserDescription, userAge, setUserAge, userId, setUserId, userImages, setUserImages }}>
        <div className="App">
          <Router >
            <Routes>
              <Route exact path="/" element={<Landing />} />
              <Route exact path="/login" element={<WelcomePage />} />
              <Route exact path="/login/phoneinput" element={<PhoneNumberPage />} />
              <Route exact path="/login/enter" element={<EnterCode />} />

              <Route exact path="/profile/age" element={<Age />} />
              <Route exact path="/profile/friendship" element={<FriendShip />} />
              <Route exact path="/profile/profiledata" element={<ProfileData />} />
              <Route exact path="/profile/location" element={<Location />} />
              <Route exact path="/profile/photoupload" element={<PhotoUpload />} />
              <Route exact path="/profile/photoaddmore" element={<PhotoAddMore />} />
              <Route exact path="/profile/description" element={<Description />} />

              <Route exact path="/find" element={<FindPage />} />

              <Route exact path="/notification" element={<Notification />} />

              <Route exact path="/message" element={<Message />} />

              <Route exact path="/profile" element={<ProfileSetting />} />

              <Route exact path="/settings" element={<Setting />} />
              <Route exact path="/tutorial" element={<Tutorial />} />
              <Route exact path="/editprofile" element={<EditProfile />} />

              <Route exact path="/verifyprofile" element={<Verify />} />


            </Routes>
          </Router>
        </div>
      </UserContext.Provider>
    </AuthContextProvider>
  );
}

export default App;
