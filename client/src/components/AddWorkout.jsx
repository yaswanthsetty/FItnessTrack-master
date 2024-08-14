import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import { addWorkout } from "../api/index"; // Import the API function

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

const Title = styled.div`
  font-weight: 700;
  font-size: 18px;
  color: ${({ theme }) => theme.primary};
  text-align: center;

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

// const AddWorkout = ({ workout, setWorkout, addNewWorkout, buttonLoading, token }) => { // Include token prop
//   const [error, setError] = useState(null);

//   const handleAddWorkout = async () => {
//     if (!workout.trim()) {
//       setError("Workout details cannot be empty!");
//       return;
//     }

//     setError(null);
//     addNewWorkout(true); // Indicate loading state

//     try {
//       const response = await addWorkout(token, { workoutString: workout }); // Use the API function

//       if (response.status !== 201) {
//         throw new Error("Unexpected response from the server. Please try again later.");
//       }

//       console.log('Success:', response.data);

//       // Clear the input after successful submission
//       setWorkout("");
//       alert("Workout added successfully!");
//     } catch (error) {
//       console.error('Error:', error);
//       setError(error.message || "Failed to add workout. Please try again.");
//     } finally {
//       addNewWorkout(false); // Indicate the loading state is done
//     }
//   };

//   return (
//     <Card>
//       <Title>Add New Workout</Title>
//       <TextInput
//         label="Workout"
//         textArea
//         rows={10}
//         placeholder="Enter in this format:\n\n#Category\n-Workout Name\n-Sets\n-Reps\n-Weight\n-Duration"
//         value={workout}
//         handleChange={(e) => setWorkout(e.target.value)}
//         aria-label="Workout details"
//       />
//       {error && <ErrorMessage>{error}</ErrorMessage>}
//       <Button
//         text="Add Workout"
//         small
//         onClick={handleAddWorkout}
//         isLoading={buttonLoading}
//         isDisabled={buttonLoading}
//         aria-busy={buttonLoading}
//         aria-disabled={buttonLoading}
//       />
//     </Card>
//   );
// };
const AddWorkout = ({ workout, setWorkout, addNewWorkout, buttonLoading }) => {
  return (
    <Card>
      <Title>Add New Workout</Title>
      <TextInput
        label="Workout"
        textArea
        rows={10}
        placeholder={`Enter in this format:

#Category
-Workout Name
-Sets
-Reps
-Weight
-Duration`}
        value={workout}
        handelChange={(e) => setWorkout(e.target.value)}
      />
      <Button
        text="Add Workout"
        small
        onClick={() => addNewWorkout()}
        isLoading={buttonLoading}
        isDisabled={buttonLoading}
      />
    </Card>
  );
};

export default AddWorkout;
