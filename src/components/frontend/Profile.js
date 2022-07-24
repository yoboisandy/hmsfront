import React, { useContext } from "react";
import UserContext from "../../contexts/UserContext";

const Profile = () => {
  const [user] = useContext(UserContext);
  console.log(user);
  return (
    <div>
      <div className="w-1/3 border-4 shadow-lg mx-auto my-10 py-5">
        <div>
          <div className="flex flex-col justify-center items-center">
            <i class="fas fa-user fa-5x bg-indigo-400 px-5 py-4 text-white rounded-full"></i>
            <div className="font-semibold text-2xl mt-4">{user.name}</div>
          </div>
          <div className="mt-8 space-y-4 mx-20">
            <div className="flex justify-between">
              <label className="font-semibold">Name</label>
              <span>{user.name}</span>
            </div>
            <div className="flex justify-between">
              <label className="font-semibold">Email</label>
              <span>{user.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
