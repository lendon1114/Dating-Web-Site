import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import Logo from "../../assets/Logo1.svg";
import { db } from '../../firebase';
import LoadingModal from "../../component/loadingPage";
import { UserAuth } from "../../context/AuthContext";
import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import AlertModal from "../../component/modal/alertmodal";

export default function ProfileDescription() {
    const navigate = useNavigate();
    const { user } = UserAuth();
    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState("");
    const [originalEditInfo, setOriginalEditInfo] = useState(null);
    const [inputText, setInputText] = useState(false)
    const [alertModal, setAlertModal] = useState(false);
    const menuDropdown = useRef(null);
    const [prevScrollPos, setPrevScrollPos] = useState(0);

    document.body.addEventListener('touchmove', function (event) {
        event.preventDefault();
    }, { passive: false });

    const updataProfileData = async () => {
        setLoading(true);
        const { about: _, ...temp } = originalEditInfo;
        const newEditInfo = { about: description, ...temp };
        try {
            await updateDoc(doc(db, "Users", user.uid), {
                editInfo: newEditInfo,
                listSwipedUser: [],
                age_range: {
                    max: 99,
                    min: 18
                },
                maximum_distance: 400,
                miles: false,
                verified: 0,
                matchesNotification: true,
                likesNotification: true,
                chatNotification: true
            });
            await setDoc(doc(db, "Relationship", user.uid), {
                isRelationship: false,
                partner: {
                    partnerId: "",
                    partnerImage: "",
                    partnerName: ""
                },
                updataAt: new Date(),
                userId: user.uid
            });
            setLoading(false);
            navigate("/profile");
        } catch (err) {
            setLoading(false);
            setInputText(true);
            setAlertModal(true);
        }
    }

    useEffect(() => {
        function handleScroll() {
            const currentScrollPos = window.pageYOffset;
            setPrevScrollPos(currentScrollPos);
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuDropdown.current && !menuDropdown.current.contains(event.target)) {
                setAlertModal(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuDropdown]);

    useEffect(() => {
        setLoading(true);
        const getUserInfo = async () => {
            const docSnap = await getDoc(doc(db, "Users", user.uid));
            if (docSnap.exists()) {
                const userData = docSnap.data();
                setOriginalEditInfo(userData.editInfo);
                setDescription(userData.editInfo?.about);
                setLoading(false);
            } else {
                console.log("No such document!");
            }
        }
        if (user && user.uid) {
            getUserInfo();
        }
    }, [user])

    return (
        <div className="bg-[#FFFBFE] rounded-xl w-full h-full min-h-screen justify-center pb-10">
            <div className="flex">
                <div className="pt-20 pl-2 md:pl-5 xl:pl-20 2xl:pl-40">
                    <Link to='/profile/photoaddmore'>
                        <FiArrowLeft className="text-pinkLight text-xl lg:text-2xl xl:text-4xl my-3" />
                    </Link>
                </div>
                <div className="w-full pr-4 md:pr-0">
                    <div className="w-full p-8 items-center">
                        <img src={Logo} alt="Logo" className="mx-auto" />
                    </div>
                    <div className="text-2xl font-bold">Description</div>
                    <div className="text-sm xl:text-xl font-semibold py-4 xl:leading-loose">
                        Please write something about yourself and let other members know<br />
                        why you’re here. You can skip this section for now and complete this later<br />
                        in your settings under Edit Info.
                    </div>
                    <div className="mt-10 text-sm lg:text-xl mb-20 leading-relaxed">
                        <textarea
                            className={`${inputText ? "border-red-600" : "border-[888888]"} border-2 mx-auto bg-white rounded-xl w-full p-4 sm:w-1/2 xl:w-1/3 h-[400px] placeholder:italic placeholder:text-slate-400 block  shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 resize-none`}
                            type="text"
                            name="discription"
                            placeholder="Write something about yourself."
                            rows={4}
                            cols={40}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        >
                        </textarea>
                    </div>
                    <button onClick={() => updataProfileData()} className="bg-pinkLight justify-center xl:text-2xl text-white rounded-xl py-2 px-10 xl:py-4 xl:px-20">Continue</button>
                </div>
                <div className="pt-20 pr-2 md:pr-5 xl:pr-20 2xl:pr-40">
                </div>
            </div>
            {
                loading &&
                <LoadingModal />
            }
            {
                alertModal &&
                <div className={`fixed z-50 w-full h-full min-h-screen top-0 `}>
                    <div className="w-full h-screen bg-cover flex px-8  justify-center items-center bg-black/90" >
                        <div ref={menuDropdown} className="w-5/6 md:w-3/5 bg-white rounded-xl px-3 relative  py-12">
                            <AlertModal text="Please tell me about yourself." onCloseModal={() => setAlertModal(false)} />
                        </div>
                    </div >
                </div>
            }
        </div>
    )
}