// === Package Imports ===
import React, { useEffect, useState } from "react";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { Link } from 'react-router-dom';
import { FaPlusCircle } from "react-icons/fa"

// === File Imports ===
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import { ADD_BANDMATE } from "../utils/mutations";
import Auth from "../utils/auth";
import ReviewList from "../components/ReviewList";

const Profile = () => {
  const [stateIncluded, setStateIncluded] = useState(false);

  const { username: userParam } = useParams();
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });
  const { data:me } = useQuery(QUERY_ME);

  // console.log(me.me.bandmates);

  const [addBandmate] = useMutation(ADD_BANDMATE);
  const user = data?.me || data?.user || {};

  const navigate = useNavigate();


  const isIncluded = (username, array) => {
    return array.some((user) => user.username === username)
  }

  useEffect(() => {
    if (me && user) {
      setStateIncluded(isIncluded(user.username, me.me.bandmates))
    } 
    // eslint-disable-next-line
  }, [])

  
  // navigate to personal profile page if username is the logged-in user's
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links
        above to sign up or log in!
      </h4>
    );
  }


  const handleClick = async () => {
    try {
      await addBandmate({
        variables: { id: user._id },
      });
    } catch (e) {
      console.error(e);
    }

    navigate(`/profile`)
  };

  return (
    <div>
      <div className="flex-row justify-space-between mt-3 mb-3">
        <h2 className="bg-dark text-secondary p-4 display-inline-block profile-title-container">
          Viewing {userParam ? `${user.username}'s` : "your"} profile.
        </h2>
        <div className="col-12 col-lg-4 mb-3 mt-3">
          <Link to={`/profile/bandmates/${user.username}`}>
            <h3 className="mx-auto">{user.username}'s Bandmates: {user.bandmateCount}</h3>
          </Link>
          {userParam && !stateIncluded ? (
          <button className="btn ml-auto" onClick={handleClick}>
            <FaPlusCircle
            className="" /> Add Bandmate
          </button>
        ) : (
          <></>
        )}
        </div>
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mx-auto col-lg-10">
          <ReviewList
            reviews={user.reviews}
            title={`${user.username} left these reviews`}
          />
        </div>

      </div>
    </div>
  );
};

export default Profile;
