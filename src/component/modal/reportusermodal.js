import React, { useEffect, useState, useRef } from "react";
import { BsFillShieldFill } from "react-icons/bs";
import { FcCompactCamera } from "react-icons/fc";
import { BiAngry } from "react-icons/bi";
import { AiFillWarning } from "react-icons/ai"
import { GiAlienEgg } from "react-icons/gi"

export default function ReportUserModal({ openModal }) {
    const [userModal, setUserModal] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const menuDropdown = useRef(null);

    useEffect(() => {
        function handleScroll() {
            const currentScrollPos = window.pageYOffset;
            setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
            setPrevScrollPos(currentScrollPos);
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuDropdown.current && !menuDropdown.current.contains(event.target)) {
                setUserModal(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuDropdown]);

    return (
        <>
            <BsFillShieldFill className="text-4xl text-pinkLight mx-auto" />
            <p className="text-lg lg:text-xl xl:text-3xl font-bold my-3 text-pinkLight">Report user</p>
            <span className="text-sm xl:text-lg 2xl:text-xl my-3 lg:leading-relaxed">
                Is this person bothering you? Tell us what they did.
            </span>
            {
                !userModal ?
                    <>
                        <div className="w-full md:w-2/3 xl:w-1/2 mx-auto">
                            <button className="w-full xl:w-80 items-center flex">
                                <div className="w-1/3">
                                    <FcCompactCamera className="mx-auto text-xl lg:text-3xl 2xl:text-5xl" />
                                </div>
                                <div onClick={openModal} className="w-2/3 text-start lg:text-base 2xl:text-xl">
                                    Inappropriate Photos
                                </div>
                            </button>
                            <button className="w-full xl:w-80 items-center flex">
                                <div className="w-1/3">
                                    <BiAngry className="mx-auto text-xl lg:text-3xl 2xl:text-5xl text-yellow-500" />
                                </div>
                                <div onClick={openModal} className="w-2/3 text-start lg:text-base 2xl:text-xl">
                                    Feels Like Spam
                                </div>
                            </button>
                            <button className="w-full xl:w-80 items-center flex">
                                <div className="w-1/3">
                                    <GiAlienEgg className="mx-auto text-xl lg:text-3xl 2xl:text-5xl text-yellow-500" />
                                </div>
                                <div onClick={openModal} className="w-2/3 text-start lg:text-base 2xl:text-xl">
                                    User is underage
                                </div>
                            </button>
                            <button className="w-full xl:w-80 items-center flex">
                                <div className="w-1/3">
                                    <AiFillWarning className="mx-auto text-xl lg:text-3xl 2xl:text-5xl text-green-900" />
                                </div>
                                <div onClick={() => setUserModal(true)} className="w-2/3 text-start lg:text-base 2xl:text-xl">
                                    Other
                                </div>
                            </button>
                        </div>
                    </>
                    :
                    <>
                        <div className="w-full py-3">
                            <input className="border-[0.5px] w-5/6 xl:w-2/3 border-[#888888] bg-white rounded-xl  2xl:text-2xl py-2 px-3 text-black text-base" placeholder="Additional Info(optional)" />
                            <button onClick={openModal} className="w-5/6 xl:w-2/3 px-6 py-3 text-pinkLight border-2 border-pinkLight hover:bg-pinkLight rounded-xl  mx-auto flex justify-center items-center my-3 hover:text-white gap-1" >
                                <div className="text-sm xl:text-lg">Continue</div>
                            </button>
                        </div>
                    </>
            }
        </>
    )
}