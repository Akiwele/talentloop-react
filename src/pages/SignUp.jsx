import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import navigate
import "../styles/SignUp.css";

export default function SignUpPage() {
  const navigate = useNavigate(); // ✅ initialize navigate

  const [formData, setFormData] = useState({
    profilePic: null,
    name: "",
    username: "",
    email: "",
    role: "learnOnly",
    availableTimes: "",
    courses: "",
    bio: "",
    agreed: false,
  });

  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.agreed) {
      setShowErrorPopup(true);
      return;
    }

    console.log("Form Data:", formData);

    // ✅ Redirect to Explore page
    navigate("/ExplorePage");
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>

      {showErrorPopup && (
        <div className="popup-overlay">
          <div className="popup-card">
            <p>Please agree to the terms and conditions to continue.</p>
            <button onClick={() => setShowErrorPopup(false)}>OK</button>
          </div>
        </div>
      )}

      <form className="signup-form" onSubmit={handleSubmit}>
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
        <div>
          <label>Choose Role</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="learnOnly">Learn Only</option>
            <option value="teachAndLearn">Teach and Learn</option>
          </select>
        </div>

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

{/* Bio is now visible to ALL roles */}
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


        <div>
          <h3 className="terms-title">Terms and Conditions</h3>
          <ul className="terms-list">
            <li>You must provide accurate personal information, including a valid email address.</li>
            <li>You are responsible for all activity under your account.</li>
            <li>You agree to be respectful and professional when connecting with other users.</li>
            <li>Users can offer skills to teach and request skills to learn.</li>
            <li>A connection request must be approved before any personal contact information is shared.</li>
            <li>Once a connection request is approved, the approver’s email address will be sent to the requester to enable communication.</li>
            <li>Users are expected to update their availability status (e.g., Available, Fully Booked) to help others make informed decisions before requesting a connection.</li>
            <li>After a successful connection, users may give a thumbs up or thumbs down based on their experience.</li>
            <li>Each user may only rate once per session.</li>
            <li>Ratings help maintain quality and build trust in the community.</li>
            <li>TalentLoop will only share your email with another user after you approve their request.</li>
            <li>Your data is stored securely and is not sold or shared with third parties.</li>
          </ul>
          <div className="checkbox-group">
            <input
              type="checkbox"
              name="agreed"
              checked={formData.agreed}
              onChange={handleChange}
            />
            <label>I agree to the Terms and Conditions</label>
          </div>
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
