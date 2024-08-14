import React, { useState } from "react";
import styled from "styled-components";
import { calculateBMI } from "../api/index"; // Import the API function

const Card = styled.div`
  flex: 1;
  min-width: 280px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  background: linear-gradient(135deg, ${({ theme }) => theme.primary + 25}, ${({ theme }) => theme.secondary + 25});
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }

  @media (max-width: 600px) {
    padding: 16px;
  }
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 18px;
  color: ${({ theme }) => theme.primary};
  text-align: center;

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.text_primary};
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 8px;
  font-size: 14px;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    outline: none;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.primary};
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: ${({ theme }) => theme.primary + 20};
  }

  &:disabled {
    background: ${({ theme }) => theme.primary + 50};
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

const BMICalculator = ({ token }) => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmiResult, setBmiResult] = useState(null);
  const [workoutRecommendation, setWorkoutRecommendation] = useState([]);
  const [dietRecommendation, setDietRecommendation] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!height || !weight) {
      setError("Please enter both height and weight.");
      return;
    }

    try {
      const response = await calculateBMI(token, { height, weight });
      setBmiResult(response.data.bmi);
      setWorkoutRecommendation(response.data.workoutRecommendation.split('\n').filter(item => item.trim() !== ""));
      setDietRecommendation(response.data.dietRecommendation.split('\n').filter(item => item.trim() !== ""));
      setError(null);
    } catch (error) {
      setError("Failed to calculate BMI. Please try again.");
    }
  };

  return (
    <Card>
      <Title>BMI Calculator</Title>
      <InputWrapper>
        <Label htmlFor="height">Height (cm):</Label>
        <Input
          id="height"
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Enter your height in cm"
        />
      </InputWrapper>
      <InputWrapper>
        <Label htmlFor="weight">Weight (kg):</Label>
        <Input
          id="weight"
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Enter your weight in kg"
        />
      </InputWrapper>
      <Button onClick={handleSubmit}>Calculate BMI</Button>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {bmiResult && (
        <>
          <p>Your BMI: {bmiResult}</p>
          <p>Workout Recommendations:</p>
          <ul>
            {workoutRecommendation.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <p>Diet Recommendations:</p>
          <ul>
            {dietRecommendation.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </>
      )}
    </Card>
  );
};

export default BMICalculator;
