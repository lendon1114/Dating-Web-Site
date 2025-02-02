import React, { useEffect, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import LoadingModal from "../../component/loadingPage";

export default function Matches() {
    const { user } = UserAuth();
    const navigate = useNavigate();
    const [numbers, setNumbers] = useState();
    const [likedUserAvatar, setLikedUserAvatar] = useState();
    const [likedTime, setLikedTime] = useState();
    const [likedUserName, setLikedUserName] = useState();
    const [loading, setLoading] = useState(false);

    const Lookingprofile = async (userId) => {
        navigate(`/likedUsers/${userId}`)
    }

    useEffect(() => {
        const getUserInfo = async () => {
            setLoading(true);
            const likedUserid = [];
            const likedUserImage = [];
            const likedUserTime = [];
            const likedUserName = [];
            const querySnapshot = await getDocs(collection(db, "Users", user.uid, "Matches"));
            querySnapshot.forEach((doc) => {
                likedUserid.push(doc.id)
                if (doc.data().pictureUrl) {
                    likedUserImage.push(doc.data().pictureUrl)
                } else {
                    console.error("Missing pictureUrl for doc:", doc.id);
                }
                if (doc.data().timestamp) {
                    likedUserTime.push(doc.data().timestamp)
                } else {
                    console.error("Missing timestamp for doc:", doc.id);
                }
                if (doc.data().userName) {
                    likedUserName.push(doc.data().userName)
                } else {
                    console.error("Missing userName for doc:", doc.id);
                }
            });
            setNumbers(likedUserid);
            setLikedUserAvatar(likedUserImage);
            setLikedTime(likedUserTime);
            setLikedUserName(likedUserName);
            setLoading(false);
        }
        if (user && user.uid) {
            getUserInfo();
        }
    }, [user]);

    const listItems = numbers && numbers.length > 0 ? numbers.map((numbers, index) =>
        <div key={index} className="w-full flex mb-2 md:my-0" onClick={() => Lookingprofile(numbers)}>
            <div className="md:hover:border-l-pinkLight md:hover:bg-[#bebebe] md:border-l-white md:border-l-2 gap-5 flex w-full px-5 py-3 cursor-pointer md:border-b-[0.1px] md:border-b-black/10 items-center bg-[#5a5a5a]/10 rounded-lg md:rounded-none md:bg-none">
                <img src={likedUserAvatar[index]} alt="avatar" className="w-12 h-12 mx-1 my-auto object-cover rounded-full" />
                <div className="w-full text-block text-start px-1 text-base justify-between sm:flex">
                    <div className="w-[75%] md:w-48  truncate">You are matched with {likedUserName[index]}</div>
                    <div className="text-sm">{likedTime[index].toDate().toLocaleString()}</div>
                </div>
            </div>
        </div>
    ) :
        <div className="text-[#5a5a5a] text-lg pt-4 font-mono justify-center">
            <p>No users are connected.</p>
        </div>;


    return (
        <div>
            {listItems}
            {loading && <LoadingModal />}
        </div>
    );
}