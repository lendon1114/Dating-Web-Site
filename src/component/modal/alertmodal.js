import React from "react";
import ModelLogo from "../../assets/Modal-Logo.png";
import { IoMdClose } from "react-icons/io";

export default function ContactModal({ text, onCloseModal }) {

    return (
        <>
            <h2 className="w-10 lg:w-16 absolute justify-center flex top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <img src={ModelLogo} alt="ModelLogo" />
            </h2>
            <div className="p-2 rounded-full text-pinkLight text-xl absolute justify-center flex top-3 right-1 cursor-pointer bg-white">
                <IoMdClose onClick={() => onCloseModal()}/>
            </div>
            <span className="text-sm xl:text-lg 2xl:text-xl lg:leading-relaxed">
                {text}
            </span>
        </>
    )
}