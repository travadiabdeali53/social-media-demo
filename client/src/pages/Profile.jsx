import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Profile() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchProfile();
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");

      const currentUser = JSON.parse(localStorage.getItem("user"));

      const filteredUsers = res.data.users.filter(
        (user) => user._id !== currentUser._id,
      );

      setUsers(filteredUsers);
    } catch (error) {
      console.log(error);
    }
  };

  const followUser = async (userId) => {
    try {
      await API.put(`/users/follow/${userId}`);

      fetchProfile();
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const isFollowing = (userId) => {
    if (!user || !user.following) return false;

    return user.following.some(
      (followedUser) => followedUser._id === userId || followedUser === userId,
    );
  };

  const unfollowUser = async (userId) => {
    try {
      await API.put(`/users/unfollow/${userId}`);

      fetchProfile();
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await API.get("/users/me");

      setUser(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <Navbar />
      <div className="profile-page">
        <style>
          {`
.profile-page{
  max-width:900px;
  margin:30px auto;
  padding:0 15px;
}

.profile-container{
  background:white;
  border-radius:20px;
  padding:30px;
  box-shadow:0 4px 15px rgba(0,0,0,.08);
}

.profile-header{
  text-align:center;
}

.avatar{
  width:100px;
  height:100px;
  margin:0 auto 15px;

  border-radius:50%;

  background:#1877f2;
  color:white;

  display:flex;
  justify-content:center;
  align-items:center;

  font-size:40px;
  font-weight:bold;
}

.profile-header h2{
  margin-bottom:8px;
}

.profile-header p{
  color:#666;
}

.stats{
  display:flex;
  justify-content:center;
  gap:40px;
  margin-top:20px;
}

.stats span{
  display:flex;
  flex-direction:column;
  align-items:center;
}

.stats strong{
  font-size:22px;
  color:#1877f2;
}

.users-list{
  margin-top:30px;
}

.users-list h3{
  margin-bottom:15px;
  color:#1877f2;
}

.user-card{
  background:white;
  padding:18px;
  margin-bottom:12px;

  border-radius:15px;

  display:flex;
  justify-content:space-between;
  align-items:center;

  box-shadow:0 2px 10px rgba(0,0,0,.06);
}

.user-info{
  display:flex;
  align-items:center;
  gap:12px;
}

.small-avatar{
  width:50px;
  height:50px;
  border-radius:50%;
  background:#1877f2;
  color:white;

  display:flex;
  justify-content:center;
  align-items:center;

  font-weight:bold;
}

.follow-btn{
  background:#1877f2;
  color:white;
  border:none;
  padding:10px 18px;
  border-radius:10px;
  cursor:pointer;
}

.following-btn{
  background:#e5e7eb;
  border:none;
  padding:10px 18px;
  border-radius:10px;
  cursor:pointer;
}

@media(max-width:768px){

  .profile-container{
    padding:20px;
  }

  .stats{
    gap:20px;
  }

  .user-card{
    flex-direction:column;
    align-items:flex-start;
    gap:15px;
  }

  .follow-btn,
  .following-btn{
    width:100%;
  }
}

@media(max-width:480px){

  .avatar{
    width:80px;
    height:80px;
    font-size:30px;
  }

  .stats{
    flex-direction:column;
    gap:10px;
  }

  .profile-header h2{
    font-size:24px;
  }
}
`}
        </style>

        <div className="profile-container">
          <div className="profile-header">
            <div className="avatar">
              {user.username.charAt(0).toUpperCase()}
            </div>

            <h2>{user.username}</h2>

            <p>{user.email}</p>

            <div className="stats">
              <span>
                <strong>{user.followers.length}</strong>
                Followers
              </span>

              <span>
                <strong>{user.following.length}</strong>
                Following
              </span>
            </div>
          </div>
        </div>
        <div className="users-list">
          <h3>People You May Know</h3>

          {users.map((person) => (
            <div key={person._id} className="user-card">
              <div className="user-info">
                <div className="small-avatar">
                  {person.username.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h4>{person.username}</h4>
                  <p>{person.email}</p>
                </div>
              </div>

              {isFollowing(person._id) ? (
                <button
                  className="following-btn"
                  onClick={() => unfollowUser(person._id)}
                >
                  Following
                </button>
              ) : (
                <button
                  className="follow-btn"
                  onClick={() => followUser(person._id)}
                >
                  Follow
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Profile;
