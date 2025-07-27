import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import '../styles/EditProfile.css'; // You can reuse this CSS

export default function EditProfilePage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    profilePic: null,
    name: "John Doe",
    username: "johndoe123",
    email: "john@example.com",
    role: "teachAndLearn",
    availableTimes: "Weekdays 4pm - 6pm",
    courses: "HTML, CSS, Python",
    bio: "Passionate about teaching and learning new skills.",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile Data:", formData);
    navigate("/ExplorePage");
  };

  return (
    <div className="signup-container">
      {/* Back Icon */}
      <button
        className="back-icon"
        onClick={() => navigate("/ExplorePage")}
        style={{ background: "none", border: "none", cursor: "pointer", marginBottom: "10px" }}
      >
        <ArrowLeft size={24} />
      </button>

      <h2>Edit Profile</h2>

      <form className="signup-form" onSubmit={handleSubmit}>
        {/* Photo Upload */}
        <div className="photo-upload">
          <div className="photo-preview">
            {formData.profilePic ? (
              <img
                src={URL.createObjectURL(formData.profilePic)}
                alt="Preview"
                className="profile-image"
              />
            ) : (
              <div className="profile-placeholder"></div>
            )}
          </div>
          <div className="photo-info">
            <strong>Upload Your Photo</strong>
            <p>Your image should be in PNG or JPG format</p>
            <label className="upload-button">
              Upload Photo
              <input
                type="file"
                name="profilePic"
                accept="image/*"
                onChange={handleChange}
                hidden
              />
            </label>
          </div>
        </div>

        {/* Full Name */}
        <div>
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Username */}
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Role */}
        <div>
          <label>Choose Role</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="learnOnly">Learn Only</option>
            <option value="teachAndLearn">Teach and Learn</option>
          </select>
        </div>

        {/* Conditional Fields */}
        {formData.role === "teachAndLearn" && (
          <>
            <div>
              <label>Available Time</label>
              <input
                type="text"
                name="availableTimes"
                value={formData.availableTimes}
                onChange={handleChange}
                placeholder="E.g., Weekdays 4pm - 6pm"
                required
              />
            </div>
            <div>
              <label>Courses You Can Teach</label>
              <input
                type="text"
                name="courses"
                value={formData.courses}
                onChange={handleChange}
                placeholder="E.g., HTML, CSS, Python"
                required
              />
            </div>
          </>
        )}

        {/* Bio */}
        <div>
          <label>Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows="3"
            required
          />
        </div>

        {/* Save Button */}
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
