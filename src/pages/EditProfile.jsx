import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "../styles/EditProfile.css";
import CustomToast from "../components/CustomToast";
import axios from "axios";

export default function EditProfilePage() {
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const BaseUrl = import.meta.env.VITE_BACKEND_URL;
  const CloudinaryUploadUrl = `https://api.cloudinary.com/v1_1/${
    import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  }/image/upload`;
  const CloudinaryUploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const currentUserString = sessionStorage.getItem("tl_user");
  const currentUser = currentUserString ? JSON.parse(currentUserString) : null;

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const [formData, setFormData] = useState({
    profilePic: null,
    name: "",
    username: "",
    email: "",
    role: "teachAndLearn",
    availableTimes: "",
    courses: "",
    bio: "",
    existingProfileUrl: "",
  });

  // Fetch user details on load
  useEffect(() => {
    const fetchUser = async () => {
      if (!currentUser) return;
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${BaseUrl}/users/user?userId=${currentUser.userId}`,
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        );

        const user = res.data?.data;
        setFormData({
          profilePic: null, // no new pic yet
          name: user.fullName || "",
          username: user.username || "",
          email: user.email || "",
          role: user.role === "LEARNANDTEACH" ? "teachAndLearn" : "learnOnly",
          availableTimes: user.availability || "",
          courses: user.skills?.join(", ") || "",
          bio: user.bio || "",
          existingProfileUrl: user.profileImageUrl || "",
        });
      } catch (error) {
        showToast(
          "error",
          error.response?.data?.message || "Failed to fetch user details"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      showToast("error", "User not found");
      return;
    }

    setIsSubmitting(true);

    try {
      let imageUrl = formData.existingProfileUrl;

      if (formData.profilePic) {
        const imageData = new FormData();
        imageData.append("file", formData.profilePic);
        imageData.append("upload_preset", CloudinaryUploadPreset);

        const cloudRes = await axios.post(CloudinaryUploadUrl, imageData);
        if (!cloudRes.data?.secure_url) {
          throw new Error("Image upload failed.");
        }
        imageUrl = cloudRes.data.secure_url;
      }

      const payload = {
        fullName: formData.name,
        username: formData.username,
        email: formData.email,
        role: formData.role === "teachAndLearn" ? "LEARNANDTEACH" : "LEARNONLY",
        availability:
          formData.role === "teachAndLearn" ? formData.availableTimes : "",
        skills:
          formData.role === "teachAndLearn"
            ? formData.courses.split(",").map((c) => c.trim())
            : [],
        bio: formData.bio,
        profileImageUrl: imageUrl,
      };

      await axios.put(
        `${BaseUrl}/users/update-profile?userId=${currentUser?.userId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      showToast("success", "Profile updated successfully!");
      setTimeout(() => navigate("/ExplorePage"), 1500);
    } catch (error) {
      showToast(
        "error",
        error.response?.data?.message || "Something went wrong."
      );
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
          duration={4000}
          onClose={() => setToast(null)}
        />
      )}

      <div className="signup-container">
        <button
          className="back-icon"
          onClick={() => navigate("/ExplorePage")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            marginBottom: "10px",
          }}
        >
          <ArrowLeft size={24} />
        </button>

        <h2>Edit Profile</h2>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="photo-upload">
              <div className="photo-preview">
                {formData.profilePic ? (
                  <img
                    src={URL.createObjectURL(formData.profilePic)}
                    alt="Preview"
                    className="profile-image"
                  />
                ) : formData.existingProfileUrl ? (
                  <img
                    src={formData.existingProfileUrl}
                    alt="Profile"
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

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Save"}
            </button>
          </form>
        )}
      </div>
    </>
  );
}
