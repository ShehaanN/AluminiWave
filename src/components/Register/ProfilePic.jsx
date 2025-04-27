import React, { useState } from "react";
import "./ProfilePic.css";

const ProfilePic = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-pic-container">
      <div className="profile-picture">
        <label htmlFor="imageUpload" className="upload-label">
          <div className="image-container">
            {image ? (
              <img src={image} alt="Profile" className="profile-img" />
            ) : (
              <div className="placeholder"></div>
            )}
            <div className="camera-icon">📷</div>
          </div>
        </label>
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
      </div>
      <p className="upload-text">Upload a profile photo (Max 5MB)</p>
    </div>
  );
};

export default ProfilePic;