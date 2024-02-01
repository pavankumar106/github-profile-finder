import React, { useState } from "react";
import UserModel from "./UserModal";

const Card = ({ user }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div className="border-none border px-3 py-2 m-2 mx-5 shadow-2xl bg-white rounded-md w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex flex-col">
      <img
        src={user?.avatar_url}
        alt=""
        className="rounded-full p-5"
        onClick={openModal}
      />
      <div className="flex-grow flex flex-col justify-end">
        <h5 className="font-bold text-center overflow-ellipsis overflow-hidden">
          {user?.login}
        </h5>
      </div>
      {isModalOpen && <UserModel user={user} onClose={closeModal} />}
    </div>
  );
};

export default Card;
