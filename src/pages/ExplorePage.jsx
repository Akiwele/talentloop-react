import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, X, ThumbsUp, ThumbsDown } from "lucide-react";
import "../styles/ExplorePage.css";

const ExplorePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [sentRequests, setSentRequests] = useState([]);
  const [approvedRequests, setApprovedRequests] = useState([1, 2, 3]); // Example: approved requests for demo
  const [userRatings, setUserRatings] = useState({}); // Track user's ratings
  const navigate = useNavigate();

  // Sample data for teachers/learners
  const [users, setUsers] = useState([
    {
      id: 1,
      profilePicture:
        "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=150&h=150&fit=crop&crop=face",
      username: "sarah_teaches",
      name: "Sarah Johnson",
      course: "Web Development",
      bio: "Full-stack developer with 5+ years of experience. I love teaching modern web technologies including React, Node.js, and Python.",
      availability: "Mon-Fri, 6:00 PM - 9:00 PM",
      thumbsUpCount: 150,
      thumbsDownCount: 12,
    },
    {
      id: 2,
      profilePicture:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      username: "mike_math",
      name: "Michael Chen",
      course: "JavaScript & React",
      bio: "Full-stack developer and coding mentor. I have been programming for over 8 years and have helped dozens of students transition into tech careers. I focus on practical, project-based learning.",
      availability: "Evenings 7-10 PM EST",
      thumbsUpCount: 150,
      thumbsDownCount: 12,
    },
    {
      id: 3,
      profilePicture:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      username: "anna_art",
      name: "Anna Rodriguez",
      course: "Digital Art & Design",
      bio: "Professional graphic designer and illustrator. I teach Photoshop, Illustrator, and digital painting techniques.",
      availability: "Weekends, 10:00 AM - 4:00 PM",
      thumbsUpCount: 150,
      thumbsDownCount: 12,
    },
    {
      id: 4,
      profilePicture:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      username: "david_lang",
      name: "David Kim",
      course: "Spanish Language",
      bio: "Native Spanish speaker and certified language instructor. I make learning Spanish fun and interactive!",
      availability: "Mon, Wed, Fri - 7:00 PM - 10:00 PM",
      thumbsUpCount: 150,
      thumbsDownCount: 12,
    },
    {
      id: 5,
      profilePicture:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
      username: "lisa_music",
      name: "Lisa Thompson",
      course: "Piano & Music Theory",
      bio: "Classical pianist with 15 years of teaching experience. I offer lessons for beginners to advanced students.",
      availability: "Daily, 4:00 PM - 8:00 PM",
      thumbsUpCount: 150,
      thumbsDownCount: 12,
    },
    {
      id: 6,
      profilePicture:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      username: "tom_fitness",
      name: "Tom Wilson",
      course: "Fitness & Nutrition",
      bio: "Certified personal trainer and nutritionist. I help people achieve their fitness goals through personalized programs.",
      availability: "Mon-Sat, 6:00 AM - 10:00 AM",
      thumbsUpCount: 150,
      thumbsDownCount: 12,
    },
    {
      id: 7,
      profilePicture:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
      username: "emma_code",
      name: "Emma Watson",
      course: "Python Programming",
      bio: "Senior software engineer at a tech startup. I specialize in Python, data science, and machine learning. Love helping beginners get started!",
      availability: "Tue, Thu - 5:00 PM - 8:00 PM",
      thumbsUpCount: 150,
      thumbsDownCount: 12,
    },
    {
      id: 8,
      profilePicture:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      username: "james_guitar",
      name: "James Miller",
      course: "Guitar & Music Production",
      bio: "Professional musician and producer with 10+ years experience. I teach acoustic/electric guitar and music production using Logic Pro.",
      availability: "Mon, Wed, Fri - 3:00 PM - 7:00 PM",
      thumbsUpCount: 150,
      thumbsDownCount: 12,
    },
    {
      id: 9,
      profilePicture:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      username: "sophia_design",
      name: "Sophia Lee",
      course: "UI/UX Design",
      bio: "Lead UX designer at a Fortune 500 company. I teach design thinking, wireframing, prototyping, and user research methodologies.",
      availability: "Weekends, 11:00 AM - 3:00 PM",
      thumbsUpCount: 150,
      thumbsDownCount: 12,
    },
    {
      id: 10,
      profilePicture:
        "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face",
      username: "alex_data",
      name: "Alex Brown",
      course: "Data Analysis & Excel",
      bio: "Business analyst with expertise in Excel, SQL, and data visualization. I help students master advanced Excel functions and data analysis.",
      availability: "Daily, 7:00 PM - 10:00 PM",
      thumbsUpCount: 150,
      thumbsDownCount: 12,
    },
    {
      id: 11,
      profilePicture:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      username: "maria_lang",
      name: "Maria Garcia",
      course: "French Language",
      bio: "Native French speaker and certified language teacher. I make learning French enjoyable through conversation practice and cultural immersion.",
      availability: "Mon-Thu, 6:00 PM - 9:00 PM",
      thumbsUpCount: 150,
      thumbsDownCount: 12,
    },
    {
      id: 12,
      profilePicture:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      username: "ryan_photo",
      name: "Ryan Clark",
      course: "Photography & Lightroom",
      bio: "Professional photographer specializing in portraits and landscapes. I teach camera techniques, composition, and photo editing in Lightroom.",
      availability: "Weekends, 9:00 AM - 1:00 PM",
      thumbsUpCount: 150,
      thumbsDownCount: 12,
    },
    {
      id: 13,
      profilePicture:
        "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?w=150&h=150&fit=crop&crop=face",
      username: "jen_yoga",
      name: "Jennifer Adams",
      course: "Yoga & Meditation",
      bio: "Certified yoga instructor with 8 years of experience. I teach various yoga styles and mindfulness meditation for stress relief and flexibility.",
      availability: "Daily, 6:00 AM - 8:00 AM",
      thumbsUpCount: 150,
      thumbsDownCount: 12,
    },
    {
      id: 14,
      profilePicture:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      username: "kevin_math",
      name: "Kevin Liu",
      course: "Calculus & Statistics",
      bio: "PhD in Mathematics from MIT. I help students master calculus, statistics, and prepare for standardized tests like SAT and GRE math sections.",
      availability: "Tue, Thu, Sat - 1:00 PM - 5:00 PM",
      thumbsUpCount: 150,
      thumbsDownCount: 12,
    },
    {
      id: 15,
      profilePicture:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      username: "lisa_write",
      name: "Lisa Parker",
      course: "Creative Writing",
      bio: "Published author and writing coach. I teach creative writing, storytelling techniques, and help aspiring writers develop their unique voice.",
      availability: "Mon, Wed, Fri - 2:00 PM - 6:00 PM",
      thumbsUpCount: 10,
      thumbsDownCount: 5,
    },
    {
      id: 16,
      profilePicture:
        "https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop&crop=face",
      username: "mark_chess",
      name: "Mark Johnson",
      course: "Chess Strategy",
      bio: "FIDE Master with 15+ years of competitive chess experience. I teach chess strategy, tactics, and endgame techniques for all skill levels.",
      availability: "Weekends, 2:00 PM - 6:00 PM",
      thumbsUpCount: 0,
      thumbsDownCount: 0,
    },
    {
      id: 17,
      profilePicture:
        "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&h=150&fit=crop&crop=face",
      username: "nina_cook",
      name: "Nina Rodriguez",
      course: "Cooking & Baking",
      bio: "Professional chef with culinary school training. I teach cooking fundamentals, international cuisine, and advanced baking techniques.",
      availability: "Thu-Sun, 4:00 PM - 8:00 PM",
      thumbsUpCount: 10,
      thumbsDownCount: 1,
    },
    {
      id: 18,
      profilePicture:
        "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face",
      username: "carlos_science",
      name: "Carlos Martinez",
      course: "Physics & Chemistry",
      bio: "High school science teacher with 12 years of experience. I make physics and chemistry concepts easy to understand through practical examples.",
      availability: "Mon-Fri, 4:00 PM - 7:00 PM",
      thumbsUpCount: 2,
      thumbsDownCount: 0,
    },
    {
      id: 19,
      profilePicture:
        "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=150&h=150&fit=crop&crop=face",
      username: "amy_business",
      name: "Amy Thompson",
      course: "Business & Marketing",
      bio: "MBA graduate and marketing director. I teach business fundamentals, digital marketing strategies, and entrepreneurship skills.",
      availability: "Tue, Thu - 6:00 PM - 9:00 PM",
      thumbsUpCount: 10,
      thumbsDownCount: 4,
    },
    {
      id: 20,
      profilePicture:
        "https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?w=150&h=150&fit=crop&crop=face",
      username: "tyler_3d",
      name: "Tyler Green",
      course: "3D Modeling & Animation",
      bio: "3D artist working in the gaming industry. I teach Blender, Maya, and 3D animation techniques for games and movies.",
      availability: "Weekends, 10:00 AM - 2:00 PM",
      thumbsUpCount: 6,
      thumbsDownCount: 2,
    },
  ]);

  // Current user data (logged in user)
  const currentUserString = sessionStorage.getItem("tl_user");
  const currentUser = currentUserString ? JSON.parse(currentUserString) : null;

  const filteredUsers = users.filter(
    (user) =>
      user.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewProfile = (user) => {
    setSelectedProfile(user);
    setShowProfileModal(true);
  };

  const handleSendRequest = (user) => {
    if (!sentRequests.includes(user.id)) {
      setSentRequests((prev) => [...prev, user.id]);
    }
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

  const canRate = (userId) => {
    return approvedRequests.includes(userId) && !userRatings[userId];
  };

  const hasRated = (userId) => {
    return userRatings[userId];
  };

  return (
    <div className="explore-page">
      {/* Header */}
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
              <span className="notification-badge">3</span>
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

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          <div className="users-grid">
            {filteredUsers.map((user) => (
              <div key={user.id} className="user-card">
                <div className="user-header">
                  <img
                    src={user.profilePicture}
                    alt={user.name}
                    className="user-avatar"
                  />
                  <p className="username">@{user.username}</p>
                </div>
                <div className="user-info">
                  <p className="course">{user.course}</p>
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

          {filteredUsers.length === 0 && (
            <div className="no-results">
              <p>No instructors found matching your search.</p>
            </div>
          )}
        </div>
      </main>

      {/* Profile Modal */}
      {showProfileModal && selectedProfile && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={handleCloseModal}>
              <X size={24} />
            </button>

            <div className="modal-header">
              <img
                src={selectedProfile.profilePicture}
                alt={selectedProfile.name}
                className="modal-avatar"
              />
              <div className="modal-user-info">
                <h2 className="modal-name">
                  {selectedProfile.name} (@{selectedProfile.username})
                </h2>
                <div className="modal-course">{selectedProfile.course}</div>
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

              {sentRequests.includes(selectedProfile.id) ? (
                <button className="send-request-button sent" disabled>
                  Sent
                </button>
              ) : (
                <button
                  onClick={() => handleSendRequest(selectedProfile)}
                  className="send-request-button"
                >
                  Send Request
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExplorePage;
