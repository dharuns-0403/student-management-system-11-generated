```javascript
import React, { useState } from 'react';
import './wantToAddLoginSignUpFormAsAMainStartingPageForThisStudentManagementSystem.css';

export default function WantToAddLoginSignUpFormAsAMainStartingPageForThisStudentManagementSystem() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      if (password === confirmPassword) {
        // logic to handle sign up
        console.log("Sign up successful");
      } else {
        alert("Passwords do not match");
      }
    } else {
      // logic to handle login
      console.log("Login successful");
    }
  };

  return (
    <div className="login-signup-container">
      <h2>Login / Sign Up</h2>
      <form onSubmit={handleSubmit}>
        {isSignUp ? (
          <>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
            />
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Username"
            />
            <input
              type="email"
              placeholder="Email"
            />
            <input
              type="password"
              placeholder="Password"
            />
          </>
        )}
        <button type="submit">{isSignUp ? "Sign Up" : "Login"}</button>
        <button type="button" onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? "Login" : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
```

**Note:** This code includes a basic implementation of a login/signup form with a toggle between the two modes. You can customize the form as per your requirements.

**CSS (in wantToAddLoginSignUpFormAsAMainStartingPageForThisStudentManagementSystem.css file):**
```css
.login-signup-container {
  width: 300px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.login-signup-container h2 {
  text-align: center;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

input {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button[type="submit"] {
  background-color: #4CAF50;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #3e8e41;
}

button[type="button"] {
  background-color: #ccc;
  color: #666;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button[type="button"]:hover {
  background-color: #999;
}
```
This CSS code styles the login/signup form container, inputs, buttons, and provides a basic layout. You can customize it as per your requirements.