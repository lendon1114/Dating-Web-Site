import React, { useEffect, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import LoadingModal from "../../component/loadingPage";

export default function LikedBy() {
    const navigate = useNavigate();
    const { user } = UserAuth();
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
            console.log("user");
            const likedUserid = [];
            const likedUserImage = [];
            const likedUserTime = [];
            const likedUserName = [];
            const matchesUsers = [];
            const matchesSnapshot = await getDocs(collection(db, "Users", user.uid, "Matches"));
            matchesSnapshot.forEach((doc) => {
                matchesUsers.push(doc.id)
                console.log(matchesUsers)
            })

            const querySnapshot = await getDocs(collection(db, "Users", user.uid, "LikedBy"));
            const filteredSnapshot = await querySnapshot.docs.filter(doc => doc.data().userId !== matchesUsers);

            filteredSnapshot.forEach((doc) => {
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
        <div key={index} className="w-full flex cursor-pointer" onClick={() => Lookingprofile(numbers)}>
            <div className="hover:border-l-pinkLight hover:bg-[#bebebe] border-l-white border-l-2 gap-5 flex w-full pt-2">
                <img src={likedUserAvatar[index]} className="w-12 h-12 ml-2 mr-1 my-auto object-cover rounded-full " />
                <div className="w-full text-[#888888] text-start pl-1 py-3 text-base justify-between pr-3 sm:flex border-b-[0.1px] border-b-black/10">
                    <div className="w-32 md:w-48  truncate">{likedUserName[index]} like you.</div>
                    <div className=" text-sm">{likedTime[index].toDate().toLocaleString()}</div>
                </div>
            </div>

        </div>
    ) :
        <div className="text-[#5a5a5a] text-lg pt-4 font-mono justify-center">
            <p>No users are connected.</p>
        </div>;

    return (
        <div>
            <div>
                {listItems}
            </div>

            {loading && <LoadingModal />}
        </div>
    );
}