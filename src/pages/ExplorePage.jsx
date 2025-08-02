import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, X, ThumbsUp, ThumbsDown, Loader2 } from "lucide-react";
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
  const [approvedRequests, setApprovedRequests] = useState([1, 2, 3]);
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

      if (res.status !== 200 && res.status !== 201) {
        showToast("error", res.data.message || "Failed to fetch users.");
        return;
      }

      setUsers(res.data.data || []);
    } catch (error) {
      showToast("error", error?.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
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

  const handleThumbsUp = () => {
    if (!selectedProfile || userRatings[selectedProfile.id]) return;

    setUsers((prev) =>
      prev.map((user) =>
        user.id === selectedProfile.id
          ? { ...user, thumbsUpCount: user.thumbsUpCount + 1 }
          : user
      )
    );

    setUserRatings((prev) => ({ ...prev, [selectedProfile.id]: "up" }));
    setSelectedProfile((prev) => ({
      ...prev,
      thumbsUpCount: prev.thumbsUpCount + 1,
    }));
  };

  const handleThumbsDown = () => {
    if (!selectedProfile || userRatings[selectedProfile.id]) return;

    setUsers((prev) =>
      prev.map((user) =>
        user.id === selectedProfile.id
          ? { ...user, thumbsDownCount: user.thumbsDownCount + 1 }
          : user
      )
    );

    setUserRatings((prev) => ({ ...prev, [selectedProfile.id]: "down" }));
    setSelectedProfile((prev) => ({
      ...prev,
      thumbsDownCount: prev.thumbsDownCount + 1,
    }));
  };

  const handleCloseModal = () => {
    setShowProfileModal(false);
    setSelectedProfile(null);
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

  const canRate = (userId) => {
    return approvedRequests.includes(userId) && !userRatings[userId];
  };

  const hasRated = (userId) => {
    return userRatings[userId];
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

      <>
        <main className="main-content">
          {toast && (
            <CustomToast
              type={toast?.type}
              message={toast?.message}
              duration={4000}
              onClose={() => setToast(null)}
            />
          )}
          <div className="container">
            <div
              className={clsx(
                "users-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
              )}
            >
              {isLoading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={index}
                      className="user-card p-4 border w-48 animate-pulse"
                    >
                      <div className="user-header">
                        <p className="username "></p>
                      </div>
                      <div className="user-info"></div>
                    </div>
                  ))
                : filteredUsers.map((user, index) => (
                    <div
                      key={index}
                      className="user-card p-4 border rounded-lg"
                    >
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
      </>

      {/* Modal remains unchanged */}
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
                <div className="rating-display">
                  <span className="rating-item thumbs-up">
                    <ThumbsUp size={16} />
                    {selectedProfile.thumbsUpCount || 0}
                  </span>
                  <span className="rating-item thumbs-down">
                    <ThumbsDown size={16} />
                    {selectedProfile.thumbsDownCount || 0}
                  </span>
                </div>

                {approvedRequests.includes(selectedProfile.id) && (
                  <div className="rating-actions">
                    {!hasRated(selectedProfile.id) ? (
                      <>
                        <button
                          onClick={handleThumbsUp}
                          className="rating-button thumbs-up-button"
                          disabled={!canRate(selectedProfile.id)}
                        >
                          <ThumbsUp size={16} />
                          Rate Positive
                        </button>
                        <button
                          onClick={handleThumbsDown}
                          className="rating-button thumbs-down-button"
                          disabled={!canRate(selectedProfile.id)}
                        >
                          <ThumbsDown size={16} />
                          Rate Negative
                        </button>
                      </>
                    ) : (
                      <div className="rated-message">
                        <span className="rated-icon">
                          {userRatings[selectedProfile.id] === "up"
                            ? "✅"
                            : "❌"}
                        </span>
                        You have rated this instructor
                      </div>
                    )}
                  </div>
                )}

                {!approvedRequests.includes(selectedProfile.id) &&
                  sentRequests.includes(selectedProfile.id) && (
                    <div className="rating-note">
                      <p>
                        You can rate this instructor after your request is
                        approved and you've completed a session.
                      </p>
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
