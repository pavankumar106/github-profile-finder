import React, { useEffect, useState } from "react";
import Card from "./Card";

const Home = () => {
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("search");
  const [users, setUsers] = useState([]);
  const url = "https://api.github.com/users";

  useEffect(() => {
    const fetchGitHubUsers = async () => {
      try {
        let response;

        if (query === "") {
          response = await fetch(url);
        } else {
          response = await fetch(`${url}/${query}`);
        }

        if (!response.ok) {
          if (response.status === 404) {
            setUsers([]);
          } else {
            throw new Error(`Error while fetching the data`);
          }
        } else {
          const data = await response.json();
          setUsers(Array.isArray(data) ? data : [data]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchGitHubUsers();
  }, [searchQuery]);

  const handleSearch = () => {
    setSearchQuery(query);
    console.log(query);
  };
  return (
    <div className="bg-gray-300 min-h-screen flex flex-col px-5">
      <div className="flex  justify-center items-center sm:flex-row sm:justify-center sm:items-start pt-6">
        <input
          type="text"
          placeholder="Search your query"
          className="mx-2 px-2 py-1 focus:outline-none rounded-md w-full sm:w-auto sm:max-w-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="px-2  bg-blue-500 rounded-md hover:bg-blue-300 transition duration-200 ease-in-out h-[30px]"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className="flex flex-wrap mt-5 justify-around">
        {users.length === 0 ? (
          <p>No users available</p>
        ) : (
          <>
            {users.map((user) => (
              <Card key={user.id} user={user} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
