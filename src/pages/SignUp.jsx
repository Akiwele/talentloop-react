import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignUp.css";
import CustomToast from "../components/CustomToast";
import clsx from "clsx";
import axios from "axios";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const BaseUrl = import.meta.env.VITE_BACKEND_URL;
  const CloudinaryUploadUrl = `https://api.cloudinary.com/v1_1/${
    import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  }/upload`;
  const CloudinaryUploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const showToast = (type, message) => {
    setToast({ type, message });
  };

  const [formData, setFormData] = useState({
    profilePic: null,
    name: "",
    username: "",
    email: "",
    password: "",
    skills: "",
    role: "learnOnly",
    availableTimes: "",
    courses: "",
    bio: "",
    agreed: false,
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agreed) {
      showToast(
        "warning",
        "Please agree to the terms and conditions to continue."
      );
      return;
    }

    if (!formData.profilePic) {
      showToast("error", "Please upload a profile photo.");
      return;
    }

    setIsSubmitting(true);

    try {
      const imageData = new FormData();
      imageData.append("file", formData.profilePic);
      imageData.append("upload_preset", CloudinaryUploadPreset);

      const cloudRes = await axios.post(CloudinaryUploadUrl, imageData);
      const cloudData = cloudRes.data;

      if (!cloudData.secure_url) {
        throw new Error("Image upload failed. Please try again.");
      }

      const payload = {
        fullName: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role.toUpperCase(),
        availability: formData.availableTimes,
        bio: formData.bio,
        profileUrl: cloudData.secure_url,
        skills: formData.skills.split(",").map((s) => s.trim()),
      };

      const backendRes = await axios.post(`${BaseUrl}/auth/signup`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      sessionStorage.setItem("tl_user", JSON.stringify(backendRes.data.data));

      showToast("success", "Account created successfully!");
      setTimeout(() => navigate("/explorepage"), 2000);
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong.";
      showToast("error", errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {toast && (
        <CustomToast
          type={toast.type}
          message={toast.message}
          duration={5000}
          onClose={() => setToast(null)}
        />
      )}
      <div className="signup-container">
        <h2>Sign Up</h2>

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
              placeholder="Enter your full name"
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
              placeholder="eg. johndoe23"
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
              placeholder="eg. example@gmail.com"
              required
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter a password"
              required
            />
          </div>

          <div>
            <label>Your Skills</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="java, linear algebra, DSA"
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

          <div>
            <label>Your Availability</label>
            <input
              type="text"
              name="availableTimes"
              value={formData.availableTimes}
              onChange={handleChange}
              placeholder="eg. Monday-Sunday 8:00 am - 5:00 pm"
              required
            />
          </div>

          {formData.role === "teachAndLearn" && (
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
          )}

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
              <li>
                You must provide accurate personal information, including a
                valid email address.
              </li>
              <li>You are responsible for all activity under your account.</li>
              <li>
                You agree to be respectful and professional when connecting with
                other users.
              </li>
              <li>
                Users can offer skills to teach and request skills to learn.
              </li>
              <li>
                A connection request must be approved before any personal
                contact information is shared.
              </li>
              <li>
                Once a connection request is approved, the approver’s email
                address will be sent to the requester to enable communication.
              </li>
              <li>
                Users are expected to update their availability status to help
                others make informed decisions before requesting a connection.
              </li>
              <li>
                After a successful connection, users may give a thumbs up or
                thumbs down based on their experience.
              </li>
              <li>Each user may only rate once per session.</li>
              <li>
                Ratings help maintain quality and build trust in the community.
              </li>
              <li>
                TalentLoop will only share your email with another user after
                you approve their request.
              </li>
              <li>
                Your data is stored securely and is not sold or shared with
                third parties.
              </li>
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

          <button
            type="submit"
            disabled={isSubmitting}
            className={clsx(
              isSubmitting && "opacity-50 cursor-not-allowed bg-gray-400"
            )}
          >
            {isSubmitting ? "Submitting..." : "Sign Up"}
          </button>
        </form>
      </div>
    </>
  );
}
