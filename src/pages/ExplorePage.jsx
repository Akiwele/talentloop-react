import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, X, ThumbsUp, ThumbsDown } from "lucide-react";
import "../styles/ExplorePage.css";
import axios from "axios";
import CustomToast from "../components/CustomToast";
import clsx from "clsx";

const ExplorePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [sentRequests, setSentRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [userRatings, setUserRatings] = useState({});
  const [requesting, setRequesting] = useState(false);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const currentUserString = sessionStorage.getItem("tl_user");
  const currentUser = currentUserString ? JSON.parse(currentUserString) : null;
  const BaseUrl = import.meta.env.VITE_BACKEND_URL;

  const showToast = (type, message) => {
    setToast({ type, message });
  };

  const getUsers = async () => {
    if (!currentUser) return;

    try {
      const res = await axios.get(
        `${BaseUrl}/users/?userId=${currentUser?.userId}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser?.token}`,
          },
        }
      );

      if (res.status === 200) {
        setUsers(res.data.data || []);
      } else {
        showToast("error", res.data.message || "Failed to fetch users.");
      }
    } catch (error) {
      showToast("error", error?.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const getApprovedRequests = async () => {
    if (!currentUser) return;

    try {
      const res = await axios.get(
        `${BaseUrl}/requests/approved?userId=${currentUser?.userId}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser?.token}`,
          },
        }
      );

      if (res.status === 200) {
        const approved = res.data.data || [];
        const approvedIds = approved.map((req) => req.receiver.id);
        setApprovedRequests(approvedIds);
      }
    } catch (error) {
      console.error("Error fetching approved requests:", error);
    }
  };

  useEffect(() => {
    getUsers();
    getApprovedRequests();
  }, []);

  const filteredUsers =
    users?.filter(
      (user) =>
        user?.skills
          ?.join(",")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        user?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user?.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const handleViewProfile = (user) => {
    setSelectedProfile(user);
    setShowProfileModal(true);
  };

  const handleCloseModal = () => {
    setShowProfileModal(false);
    setSelectedProfile(null);
  };

  const canRate = (userId) => {
    return approvedRequests.includes(userId) && !userRatings[userId];
  };

  const hasRated = (userId) => {
    return userRatings[userId];
  };

  const handleThumbsUp = async () => {
    if (!selectedProfile || !canRate(selectedProfile.id)) return;

    try {
      await axios.patch(
        `${BaseUrl}/users/like?userId=${currentUser?.userId}&instructorId=${selectedProfile.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${currentUser?.token}`,
          },
        }
      );

      showToast("success", "Liked successfully!");
      setUserRatings((prev) => ({
        ...prev,
        [selectedProfile.id]: "up",
      }));
    } catch (error) {
      showToast("error", "Failed to like instructor.");
    }
  };

  const handleThumbsDown = async () => {
    if (!selectedProfile || !canRate(selectedProfile.id)) return;

    try {
      await axios.patch(
        `${BaseUrl}/users/unlike?userId=${currentUser?.userId}&instructorId=${selectedProfile.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${currentUser?.token}`,
          },
        }
      );

      showToast("success", "Disliked successfully!");
      setUserRatings((prev) => ({
        ...prev,
        [selectedProfile.id]: "down",
      }));
    } catch (error) {
      showToast("error", "Failed to dislike instructor.");
    }
  };

  const handleSendRequest = async () => {
    if (!currentUser) return;
    setRequesting(true);

    try {
      const res = await axios.post(
        `${BaseUrl}/requests/send?userId=${currentUser?.userId}&receiverId=${selectedProfile?.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${currentUser?.token}`,
          },
        }
      );
      if (res.status === 200 || res.status === 201) {
        showToast("success", res.data.message);
        handleCloseModal();
      } else {
        showToast("error", res.data.message);
      }
    } catch (error) {
      showToast("error", error.response?.data?.message);
    } finally {
      setRequesting(false);
    }
  };

  return (
    <div className="explore-page">
      <header className="header">
        <div className="header-content">
          <div className="search-container">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search for courses, skills, or instructors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="user-actions">
            <div
              className="notification-icon"
              onClick={() => navigate("/Notifications")}
              style={{ cursor: "pointer" }}
            >
              <Bell size={24} />
              <span className="notification-badge"></span>
            </div>

            <img
              src={currentUser?.profileUrl}
              alt="Profile"
              className="current-user-avatar"
              onClick={() => navigate("/EditProfile")}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      </header>

      {toast && (
        <CustomToast
          type={toast?.type}
          message={toast?.message}
          duration={4000}
          onClose={() => setToast(null)}
        />
      )}

      <main className="main-content">
        <div className="container">
          <div className="users-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {isLoading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="user-card p-4 border size-52 animate-pulse"
                  ></div>
                ))
              : filteredUsers.map((user, index) => (
                  <div key={index} className="user-card p-4 border rounded-lg">
                    <div className="user-header">
                      <img
                        src={user?.profileImageUrl}
                        alt={user?.username}
                        className="user-avatar"
                      />
                      <p className="username">@{user?.username}</p>
                    </div>
                    <div className="user-info">
                      {user?.skills?.join(", ")}
                      <button
                        onClick={() => handleViewProfile(user)}
                        className="view-profile-button"
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                ))}
          </div>

          {!isLoading && filteredUsers.length === 0 && (
            <div className="no-results text-center text-gray-500 py-8">
              <p>No instructors found matching your search.</p>
            </div>
          )}
        </div>
      </main>

      {showProfileModal && selectedProfile && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={handleCloseModal}>
              <X size={24} />
            </button>

            <div className="modal-header">
              <img
                src={selectedProfile.profileImageUrl}
                alt={selectedProfile.username}
                className="modal-avatar"
              />
              <div className="modal-user-info">
                <h2 className="modal-name">
                  {selectedProfile.fullName} (@{selectedProfile.username})
                </h2>
                <div className="modal-course">
                  {selectedProfile.skills?.join(", ")}
                </div>
                <div className="modal-availability">
                  Available: {selectedProfile.availability}
                </div>
              </div>
            </div>

            <div className="modal-body">
              <div className="modal-section">
                <h3>About</h3>
                <p>{selectedProfile.bio}</p>
              </div>

              <div className="rating-section">
                {approvedRequests.includes(selectedProfile.id) && (
                  <div className="rating-actions">
                    {!hasRated(selectedProfile.id) ? (
                      <>
                        <button
                          onClick={handleThumbsUp}
                          className="rating-button thumbs-up-button"
                          disabled={!canRate(selectedProfile.id)}
                        >
                          <ThumbsUp size={16} /> Like
                        </button>
                        <button
                          onClick={handleThumbsDown}
                          className="rating-button thumbs-down-button"
                          disabled={!canRate(selectedProfile.id)}
                        >
                          <ThumbsDown size={16} /> Dislike
                        </button>
                      </>
                    ) : (
                      <p>
                        ✅ You rated this instructor (
                        {userRatings[selectedProfile.id]})
                      </p>
                    )}
                  </div>
                )}
              </div>

              <button
                onClick={handleSendRequest}
                className={clsx(
                  "send-request-button",
                  requesting && "bg-gray-300 cursor-not-allowed"
                )}
                disabled={requesting}
              >
                {requesting ? "Sending Request..." : "Send Request"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExplorePage;
