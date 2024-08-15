import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducers/userSlice";

// Custom Alert Component
const AlertContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px;
  border-radius: 5px;
  color: #fff;
  background-color: ${(props) => (props.type === "success" ? "#28a745" : "#dc3545")};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const Alert = ({ type, message, onClose }) => {
  return (
    <AlertContainer type={type}>
      {message}
      <button onClick={onClose} style={{ marginLeft: "15px", border: "none", background: "transparent", color: "#fff" }}>x</button>
    </AlertContainer>
  );
};

// SignIn Component
const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};
`;

const Span = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 90};
`;

const SignIn = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({ type: "", message: "", visible: false });

  const validateInputs = () => {
    if (!email || !password) {
      setAlert({ type: "error", message: "Please fill in all fields", visible: true });
      return false;
    }
    return true;
  };

  const handelSignIn = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    setButtonDisabled(true);

    try {
      const response = await fetch('http://localhost:8080/api/user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);

      // Dispatch success action
      dispatch(loginSuccess(data));

      setAlert({ type: "success", message: "Login Successful!", visible: true });
    } catch (error) {
      console.error('Error:', error);
      setAlert({ type: "error", message: "Failed to sign in. Please try again.", visible: true });
    } finally {
      setLoading(false);
      setButtonDisabled(false);
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, visible: false });
  };

  return (
    <Container>
      {alert.visible && <Alert type={alert.type} message={alert.message} onClose={handleCloseAlert} />}
      <div>
        <Title>Welcome to Fittrack 👋</Title>
        <Span>Please login with your details here</Span>
      </div>
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexDirection: "column",
        }}
      >
        <TextInput
          label="Email Address"
          placeholder="Enter your email address"
          value={email}
          handelChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          label="Password"
          placeholder="Enter your password"
          password
          value={password}
          handelChange={(e) => setPassword(e.target.value)}
        />
        <Button
          text="SignIn"
          onClick={handelSignIn}
          isLoading={loading}
          isDisabled={buttonDisabled}
        />
      </div>
    </Container>
  );
};

export default SignIn;