// import React, { useState } from "react";
// import styled from "styled-components";
// import { calculateDietPlan } from "../api/index"; // This function will be added to your API

// const Card = styled.div`
//   flex: 1;
//   min-width: 280px;
//   padding: 24px;
//   border: 1px solid ${({ theme }) => theme.text_primary + 20};
//   border-radius: 14px;
//   background: linear-gradient(135deg, ${({ theme }) => theme.primary + 25}, ${({ theme }) => theme.secondary + 25});
//   box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
//   display: flex;
//   flex-direction: column;
//   gap: 12px;
//   transition: transform 0.2s ease-in-out;

//   &:hover {
//     transform: scale(1.02);
//   }

//   @media (max-width: 600px) {
//     padding: 16px;
//   }
// `;

// const Title = styled.h2`
//   font-weight: 700;
//   font-size: 18px;
//   color: ${({ theme }) => theme.primary};
//   text-align: center;

//   @media (max-width: 600px) {
//     font-size: 16px;
//   }
// `;

// const InputWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 8px;
// `;

// const Label = styled.label`
//   font-size: 14px;
//   color: ${({ theme }) => theme.text_primary};
// `;

// const Input = styled.input`
//   padding: 8px;
//   border: 1px solid ${({ theme }) => theme.text_primary + 20};
//   border-radius: 8px;
//   font-size: 14px;

//   &:focus {
//     border-color: ${({ theme }) => theme.primary};
//     outline: none;
//   }
// `;

// const Button = styled.button`
//   padding: 10px 20px;
//   border: none;
//   border-radius: 8px;
//   background: ${({ theme }) => theme.primary};
//   color: white;
//   font-size: 14px;
//   cursor: pointer;
//   transition: background 0.3s;

//   &:hover {
//     background: ${({ theme }) => theme.primary + 20};
//   }

//   &:disabled {
//     background: ${({ theme }) => theme.primary + 50};
//     cursor: not-allowed;
//   }
// `;

// const ErrorMessage = styled.p`
//   color: red;
//   text-align: center;
// `;

// const DietPlanCalculator = ({ token }) => {
//   const [currentBMI, setCurrentBMI] = useState("");
//   const [targetBMI, setTargetBMI] = useState("");
//   const [duration, setDuration] = useState("");
//   const [dietPlan, setDietPlan] = useState([]);
//   const [calorieRecommendation, setCalorieRecommendation] = useState("");
//   const [error, setError] = useState(null);

//   const handleSubmit = async () => {
//     if (!currentBMI || !targetBMI || !duration) {
//       setError("Please enter current BMI, target BMI, and duration.");
//       return;
//     }

//     try {
//       const response = await calculateDietPlan(token, { currentBMI, targetBMI, duration });
//       setDietPlan(response.data.dietPlan);
//       setCalorieRecommendation(response.data.calorieRecommendation);
//       setError(null);
//     } catch (error) {
//       setError("Failed to calculate diet plan. Please try again.");
//     }
//   };

//   return (
//     <Card>
//       <Title>Diet Plan Calculator</Title>
//       <InputWrapper>
//         <Label htmlFor="currentBMI">Current BMI:</Label>
//         <Input
//           id="currentBMI"
//           type="number"
//           value={currentBMI}
//           onChange={(e) => setCurrentBMI(e.target.value)}
//           placeholder="Enter your current BMI"
//         />
//       </InputWrapper>
//       <InputWrapper>
//         <Label htmlFor="targetBMI">Target BMI:</Label>
//         <Input
//           id="targetBMI"
//           type="number"
//           value={targetBMI}
//           onChange={(e) => setTargetBMI(e.target.value)}
//           placeholder="Enter your target BMI"
//         />
//       </InputWrapper>
//       <InputWrapper>
//         <Label htmlFor="duration">Duration (days):</Label>
//         <Input
//           id="duration"
//           type="number"
//           value={duration}
//           onChange={(e) => setDuration(e.target.value)}
//           placeholder="Enter duration in days"
//         />
//       </InputWrapper>
//       <Button onClick={handleSubmit}>Calculate Diet Plan</Button>

//       {error && <ErrorMessage>{error}</ErrorMessage>}
//       {dietPlan.length > 0 && (
//         <>
//           <p>Calorie Recommendation: {calorieRecommendation}</p>
//           <p>Diet Plan:</p>
//           <ul>
//             {dietPlan.map((item, index) => (
//               <li key={index}>{item}</li>
//             ))}
//           </ul>
//         </>
//       )}
//     </Card>
//   );
// };

// export default DietPlanCalculator;
import React, { useState } from "react";
import styled from "styled-components";
import { calculateDietPlan } from "../api/index"; // Updated API function

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

const DietPlanCalculator = ({ token }) => {
  const [currentBMI, setCurrentBMI] = useState("");
  const [targetBMI, setTargetBMI] = useState("");
  const [duration, setDuration] = useState("");
  const [currentIntake, setCurrentIntake] = useState("");
  const [currentExpenditure, setCurrentExpenditure] = useState("");
  const [dietPlan, setDietPlan] = useState([]);
  const [calorieRecommendation, setCalorieRecommendation] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!currentBMI || !targetBMI || !duration || !currentIntake || !currentExpenditure) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await calculateDietPlan(token, {
        currentBMI,
        targetBMI,
        duration,
        currentIntake,
        currentExpenditure,
      });
      setDietPlan(response.data.dietPlan);
      setCalorieRecommendation(response.data.calorieRecommendation);
      setError(null);
    } catch (error) {
      setError("Failed to calculate diet plan. Please try again.");
    }
  };

  return (
    <Card>
      <Title>Diet Plan Calculator</Title>
      <InputWrapper>
        <Label htmlFor="currentBMI">Current BMI:</Label>
        <Input
          id="currentBMI"
          type="number"
          value={currentBMI}
          onChange={(e) => setCurrentBMI(e.target.value)}
          placeholder="Enter your current BMI"
        />
      </InputWrapper>
      <InputWrapper>
        <Label htmlFor="targetBMI">Target BMI:</Label>
        <Input
          id="targetBMI"
          type="number"
          value={targetBMI}
          onChange={(e) => setTargetBMI(e.target.value)}
          placeholder="Enter your target BMI"
        />
      </InputWrapper>
      <InputWrapper>
        <Label htmlFor="duration">Duration (days):</Label>
        <Input
          id="duration"
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Enter duration in days"
        />
      </InputWrapper>
      <InputWrapper>
        <Label htmlFor="currentIntake">Current Daily Caloric Intake:</Label>
        <Input
          id="currentIntake"
          type="number"
          value={currentIntake}
          onChange={(e) => setCurrentIntake(e.target.value)}
          placeholder="Enter your current daily caloric intake"
        />
      </InputWrapper>
      <InputWrapper>
        <Label htmlFor="currentExpenditure">Current Daily Caloric Expenditure:</Label>
        <Input
          id="currentExpenditure"
          type="number"
          value={currentExpenditure}
          onChange={(e) => setCurrentExpenditure(e.target.value)}
          placeholder="Enter your current daily caloric expenditure"
        />
      </InputWrapper>
      <Button onClick={handleSubmit}>Calculate Diet Plan</Button>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {dietPlan.length > 0 && (
        <>
          <p>Calorie Recommendation: {calorieRecommendation}</p>
          <p>Diet Plan:</p>
          <ul>
            {dietPlan.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </>
      )}
    </Card>
  );
};

export default DietPlanCalculator;
