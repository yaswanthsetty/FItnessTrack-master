// // server/controllers/bmiController.js
// export const calculateBMI = (req, res) => {
//     const { height, weight } = req.body;
  
//     if (!height || !weight) {
//       return res.status(400).json({ message: "Height and Weight are required." });
//     }
  
//     const heightInMeters = height / 100;
//     const bmi = weight / (heightInMeters * heightInMeters);
//     let workoutRecommendation = "";
  
//     if (bmi < 18.5) {
//       workoutRecommendation = "Focus on strength training to build muscle mass.";
//     } else if (bmi >= 18.5 && bmi < 24.9) {
//       workoutRecommendation = "Maintain a balanced workout routine.";
//     } else if (bmi >= 25 && bmi < 29.9) {
//       workoutRecommendation = "Incorporate cardio exercises to burn fat.";
//     } else {
//       workoutRecommendation = "Start with low-impact exercises and gradually increase intensity.";
//     }
  
//     res.status(200).json({ bmi: bmi.toFixed(2), workoutRecommendation });
//   };
  