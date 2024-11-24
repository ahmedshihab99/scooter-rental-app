import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthService from "../../services/AuthService";
import "./signUp.css";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [idFrontScan, setIdFrontScan] = useState(null);
  const [idBackScan, setIdBackScan] = useState(null);
  const [licenseScan, setLicenseScan] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await AuthService.signUp({
        firstName,
        lastName,
        phoneNumber,
        licenseNumber,
        idNumber,
        idFrontScan,
        idBackScan,
        licenseScan,
        email,
        password,
      });
      setOtpSent(true);
    } catch (err) {
      setError("Error signing up");
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    try {
      await AuthService.verifyOtp(email, otp);
      navigate("/login");
    } catch (err) {
      setError("Invalid OTP");
    }
  };

  return (
    <div className="sign-up-body">
      <div className="sign-up-container">
        <h2>Sign Up</h2>
        {error && <p className="error-message">{error}</p>}
        <form className="sign-up-form" onSubmit={handleSignUp}>
          <div className="col">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label>License Number (Optional)</label>
              <input
                type="text"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                className="input-field"
              />
            </div>
          </div>

          <div className="col">
            <div className="form-group">
              <label>ID Scan (Front)</label>
              <input
                type="file"
                onChange={(e) => setIdFrontScan(e.target.files[0])}
                required
                className="file-input"
              />
            </div>
            <div className="form-group">
              <label>ID Scan (Back)</label>
              <input
                type="file"
                onChange={(e) => setIdBackScan(e.target.files[0])}
                required
                className="file-input"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="input-field"
              />
            </div>
          </div>
        </form>
        <button type="submit" className="sign-up-button">
          Sign Up
        </button>
        <p className="signup-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>

      {otpSent && (
        <div className="otp-modal">
          <div className="otp-container">
            <h3>Enter OTP</h3>
            <form onSubmit={handleOtpVerification}>
              <div className="form-group">
                <label>OTP Code</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="input-field"
                />
              </div>
              <button type="submit" className="sign-up-button">
                Verify OTP
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
