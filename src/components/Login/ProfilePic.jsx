import React, { useState } from "react";
import "./ProfilePic.css";

const ProfilePic = ({ onNext }) => {
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
    <div className="profile-pic">
      <div className="profile-picture">
        <label htmlFor="imageUpload" className="upload-label">
          <div className="image-container">
            {image ? (
              <img src={image} alt="Profile" className="profile-img" />
            ) : (
              <div className="placeholder">+</div>
            )}
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
      <button onClick={onNext} className="next-button">Next</button>
    </div>
  );
};

export default ProfilePic;
