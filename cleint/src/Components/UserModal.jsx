import React, { useEffect, useState } from "react";

const UserModel = ({ user, onClose }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const url = "https://api.github.com/users";
  useEffect(() => {
    const getUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.github.com/users/${user.login}`
        );

        if (!response.ok) {
          if (response.status === 404) {
            setData([]);
          } else {
            throw new Error(`Error while fetching the data`);
          }
        } else {
          const userData = await response.json();
          setData(userData);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getUserData();
  }, [user]);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
      {loading && (
        <div className="bg-white p-5 rounded-md transform scale-100 transition-transform">
          <div>Loading...</div>
        </div>
      )}
      {!loading && (
        <div className="bg-white p-5 rounded-md transform scale-100 transition-transform">
          <div className="flex ">
            <img
              src={data.avatar_url}
              alt="avatar"
              className="rounded-full mb-3 w-24 h-24"
            />
            <div className="ml-3 mt-3">
              <h5 className="text-black font-bold text-xl mt-0">{data.name}</h5>
              <p className="text-gray-500 text-sm ">{data.login}</p>
            </div>
          </div>

          <div className="">
            <p>Followers : {data.followers}</p>
            <p>Following : {data.following}</p>
            <p>Public repo's : {data.public_repos}</p>
            <p>Joined : {new Date(data.created_at).toLocaleDateString()}</p>
          </div>

          <div className="flex gap-2 justify-between">
            <button className="mt-3 px-2 py-1 bg-blue-500 text-white rounded-md">
              <a href={data.html_url} target="_blank" rel="noopener noreferrer">
                Visit Profile
              </a>
            </button>
            <button
              className="mt-3 px-2 py-1 bg-blue-500 text-white rounded-md"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserModel;
