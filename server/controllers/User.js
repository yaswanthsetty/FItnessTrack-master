import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createError } from "../error.js";
import User from "../models/User.js";
import Workout from "../models/Workout.js";

dotenv.config();

export const UserRegister = async (req, res, next) => {
  try {
    const { email, password, name, img } = req.body;

    // Check if the email is in use
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return next(createError(409, "Email is already in use."));
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      img,
    });
    const createdUser = await user.save();
    const token = jwt.sign({ id: createdUser._id }, process.env.JWT, {
      expiresIn: "9999 years",
    });
    return res.status(200).json({ token, user });
  } catch (error) {
    return next(error);
  }
};

export const UserLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    // Check if user exists
    if (!user) {
      return next(createError(404, "User not found"));
    }
    console.log(user);
    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return next(createError(403, "Incorrect password"));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT, {
      expiresIn: "9999 years",
    });

    return res.status(200).json({ token, user });
  } catch (error) {
    return next(error);
  }
};




// Calculate diet plan based on current BMI, target BMI, duration, caloric intake, and expenditure
export const calculateDietPlan = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { currentBMI, targetBMI, duration, currentIntake, currentExpenditure } = req.body;

    if (!currentBMI || !targetBMI || !duration || !currentIntake || !currentExpenditure) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Calculate weight change needed
    const weightChange = (currentBMI - targetBMI) * 0.3; // Approximate weight change for BMI change
    const calorieDeficitPerKg = 7700; // Approximate calories per kg
    const totalCalorieChange = weightChange * calorieDeficitPerKg;

    // Calculate daily caloric change needed
    const dailyCalorieChange = totalCalorieChange / duration;

    // Calculate current net caloric balance
    const currentNetCalories = currentIntake - currentExpenditure;

    // Determine new caloric intake or expenditure needed
    let calorieRecommendation;
    if (dailyCalorieChange < 0) {
      calorieRecommendation = `Increase your daily intake by ${Math.abs(
        dailyCalorieChange
      )} calories to meet your goal.`;
    } else {
      calorieRecommendation = `Decrease your daily intake by ${dailyCalorieChange} calories to meet your goal.`;
    }

    // Generate a simple diet plan based on caloric recommendation
    const dietPlan = [];
    if (dailyCalorieChange < 0) {
      dietPlan.push("Include more protein-rich foods in your diet.");
      dietPlan.push("Consider healthy snacks between meals.");
    } else {
      dietPlan.push("Focus on whole grains and vegetables.");
      dietPlan.push("Avoid sugary drinks and snacks.");
    }

    return res.status(200).json({
      calorieRecommendation,
      dietPlan,
    });
  } catch (error) {
    next(error);
  }
};



export const getUserDashboard = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId);
    if (!user) {
      return next(createError(404, "User not found"));
    }

    const currentDateFormatted = new Date();
    const startToday = new Date(
      currentDateFormatted.getFullYear(),
      currentDateFormatted.getMonth(),
      currentDateFormatted.getDate()
    );
    const endToday = new Date(
      currentDateFormatted.getFullYear(),
      currentDateFormatted.getMonth(),
      currentDateFormatted.getDate() + 1
    );

    const totalCaloriesBurnt = await Workout.aggregate([
      { $match: { user: user._id, date: { $gte: startToday, $lt: endToday } } },
      {
        $group: {
          _id: null,
          totalCaloriesBurnt: { $sum: "$caloriesBurned" },
        },
      },
    ]);

    const totalWorkouts = await Workout.countDocuments({
      user: userId,
      date: { $gte: startToday, $lt: endToday },
    });

    const avgCaloriesBurntPerWorkout =
      totalCaloriesBurnt.length > 0
        ? totalCaloriesBurnt[0].totalCaloriesBurnt / totalWorkouts
        : 0;

    const categoryCalories = await Workout.aggregate([
      { $match: { user: user._id, date: { $gte: startToday, $lt: endToday } } },
      {
        $group: {
          _id: "$category",
          totalCaloriesBurnt: { $sum: "$caloriesBurned" },
        },
      },
    ]);

    const pieChartData = categoryCalories.map((category, index) => ({
      id: index,
      value: category.totalCaloriesBurnt,
      label: category._id,
    }));

    const weeks = [];
    const caloriesBurnt = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(
        currentDateFormatted.getTime() - i * 24 * 60 * 60 * 1000
      );
      weeks.push(`${date.getDate()}th`);

      const startOfDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      const endOfDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + 1
      );

      const weekData = await Workout.aggregate([
        {
          $match: {
            user: user._id,
            date: { $gte: startOfDay, $lt: endOfDay },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
            totalCaloriesBurnt: { $sum: "$caloriesBurned" },
          },
        },
        {
          $sort: { _id: 1 }, // Sort by date in ascending order
        },
      ]);

      caloriesBurnt.push(
        weekData[0]?.totalCaloriesBurnt ? weekData[0]?.totalCaloriesBurnt : 0
      );
    }

    // Generate diet and workout recommendations based on total calories burnt
    let dailyCaloriesBurnedRecommendation = "";
    if (totalCaloriesBurnt.length > 0) {
      const totalCalories = totalCaloriesBurnt[0].totalCaloriesBurnt;
      if (totalCalories < 200) {
        dailyCaloriesBurnedRecommendation = "Increase workout intensity to burn more calories.";
      } else if (totalCalories >= 200 && totalCalories < 500) {
        dailyCaloriesBurnedRecommendation = "Maintain current workout level to stay fit.";
      } else {
        dailyCaloriesBurnedRecommendation = "Consider reducing workout intensity if feeling fatigued.";
      }
    }

    return res.status(200).json({
      totalCaloriesBurnt:
        totalCaloriesBurnt.length > 0
          ? totalCaloriesBurnt[0].totalCaloriesBurnt
          : 0,
      totalWorkouts: totalWorkouts,
      avgCaloriesBurntPerWorkout: avgCaloriesBurntPerWorkout,
      totalWeeksCaloriesBurnt: {
        weeks: weeks,
        caloriesBurned: caloriesBurnt,
      },
      pieChartData: pieChartData,
      dailyCaloriesBurnedRecommendation,
    });
  } catch (err) {
    next(err);
  }
};


export const calculateBMI = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { height, weight } = req.body;
    if (!height || !weight) {
      return res.status(400).json({ message: "Height and weight are required." });
    }

    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    let workoutRecommendation = "";
    let dietRecommendation = "";

    if (bmi < 18.5) {
      workoutRecommendation = `Exercise Recommendations:\n
      - Focus on strength training and resistance exercises to build muscle mass.\n
      - Avoid excessive cardio, which may lead to unwanted weight loss.\n
      - Recommended workouts: weight lifting, bodyweight exercises (push-ups, squats), and resistance band exercises.`;
    
      dietRecommendation = `Diet Recommendations:\n
      - Focus on high-calorie, nutrient-dense foods to help with weight gain.\n
      - Incorporate healthy fats (e.g., avocados, nuts, olive oil), lean proteins (e.g., chicken, fish), and complex carbohydrates (e.g., whole grains, legumes).\n
      - Eat frequent, small meals throughout the day to increase caloric intake.\n
      - Include protein shakes or smoothies as snacks.\n
      - Calories to Burn: Aim for a balanced approach; the focus should be on building muscle rather than burning a high number of calories. Aim for moderate workouts that help with muscle growth rather than significant calorie deficit.`;
    
    } else if (bmi >= 18.5 && bmi < 24.9) {
      workoutRecommendation = `Exercise Recommendations:\n
      - Maintain a balanced workout routine that includes both cardio and strength training.\n
      - Recommended workouts: a mix of cardio (running, cycling) and strength training (weights, resistance exercises).`;
    
      dietRecommendation = `Diet Recommendations:\n
      - Maintain a balanced diet with a mix of carbohydrates, proteins, and fats.\n
      - Focus on nutrient-dense foods like fruits, vegetables, lean proteins, and whole grains.\n
      - Keep hydrated and monitor portion sizes to maintain weight.\n
      - Calories to Burn: Maintain current weight; aim for a moderate caloric burn depending on your activity level. Typically, 300-500 calories per workout session is sufficient to keep fit.`;
    
    } else if (bmi >= 25 && bmi < 29.9) {
      workoutRecommendation = `Exercise Recommendations:\n
      - Incorporate both cardio and strength training. Cardio helps burn calories, while strength training helps build muscle and boost metabolism.\n
      - Recommended workouts: aerobic exercises (walking, jogging, swimming), strength training (weight lifting, resistance exercises).`;
    
      dietRecommendation = `Diet Recommendations:\n
      - Focus on a calorie deficit diet with nutrient-dense foods to promote weight loss.\n
      - Incorporate plenty of vegetables, fruits, lean proteins, and whole grains.\n
      - Avoid high-calorie, sugary, and processed foods.\n
      - Control portion sizes and avoid late-night snacking.\n
      - Calories to Burn: Aim to burn 500-1000 calories per workout session to create a sustainable calorie deficit for weight loss. Adjust based on individual needs and progress.`;
    
    } else {
      workoutRecommendation = `Exercise Recommendations:\n
      - Start with low-impact exercises and gradually increase intensity as fitness improves.\n
      - Recommended workouts: walking, swimming, cycling, and strength training with light weights or bodyweight exercises.`;
    
      dietRecommendation = `Diet Recommendations:\n
      - Focus on a significant calorie deficit with a balanced, nutrient-rich diet.\n
      - Emphasize whole foods, lean proteins, vegetables, and whole grains.\n
      - Avoid processed foods, sugary snacks, and high-calorie beverages.\n
      - Consider consulting with a dietitian for a personalized meal plan.\n
      - Calories to Burn: Aim to burn 500-1000 calories per workout session, adjusting based on fitness level and weight loss goals. Focus on consistency and gradual progress.`;
    }
    
    

    return res.status(200).json({
      bmi: bmi.toFixed(2),
      workoutRecommendation,
      dietRecommendation,
    });
  } catch (err) {
    return next(err);
  }
};

// export const calculateBMI = async (req, res, next) => {
//   try {
//     // Ensure user is authenticated
//     const userId = req.user?.id;
//     if (!userId) {
//       return res.status(401).json({ message: "User not authenticated" });
//     }

//     // Fetch user to ensure existence
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Extract height and weight from request body
//     const { height, weight } = req.body;
//     if (!height || !weight) {
//       return res.status(400).json({ message: "Height and weight are required." });
//     }

//     // Calculate BMI
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

//     return res.status(200).json({ bmi: bmi.toFixed(2), workoutRecommendation });
//   } catch (err) {
//     return next(err);
//   }
// };

export const getWorkoutsByDate = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId);
    let date = req.query.date ? new Date(req.query.date) : new Date();
    if (!user) {
      return next(createError(404, "User not found"));
    }
    const startOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const endOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    );

    const todaysWorkouts = await Workout.find({
      userId: userId,
      date: { $gte: startOfDay, $lt: endOfDay },
    });
    const totalCaloriesBurnt = todaysWorkouts.reduce(
      (total, workout) => total + workout.caloriesBurned,
      0
    );

    return res.status(200).json({ todaysWorkouts, totalCaloriesBurnt });
  } catch (err) {
    next(err);
  }
};



 export const addWorkout = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const { workoutString } = req.body;

    if (!workoutString) {
      return next(createError(400, "Workout string is missing"));
    }

    // Split workoutString into lines
    const eachworkout = workoutString.split(";").map((line) => line.trim());
    
    // Check if any workouts start with "#" to indicate categories
    const categories = eachworkout.filter((line) => line.startsWith("#"));
    if (categories.length === 0) {
      return next(createError(400, "No categories found in workout string"));
    }

    const parsedWorkouts = [];
    let currentCategory = "";
    

    // Loop through each line to parse workout details
    for (let i = 0; i < eachworkout.length; i++) {
      const line = eachworkout[i];
      if (line.startsWith("#")) {
        const parts = line.split("\n").map((part) => part.trim());

        if (parts.length < 5) {
          return next(createError(400, `Workout string is missing details for workout ${i + 1}`));
        }

        // Update current category
        currentCategory = parts[0].substring(1).trim();
        // Extract workout details
        const workoutDetails = parseWorkoutLine(parts);
        if (workoutDetails == null) {
          return next(createError(400, "Please enter workout details in proper format"));
        }

        workoutDetails.category = currentCategory;
        parsedWorkouts.push(workoutDetails);
      } else {
        return next(createError(400, `Unexpected format in workout string for line ${i + 1}`));
      }
    }

    // Calculate calories burnt for each workout and save to database
    await Promise.all(parsedWorkouts.map(async (workout) => {
      workout.caloriesBurned = calculateCaloriesBurnt(workout);
      await Workout.create({ ...workout, user: userId });
    }));

    return res.status(201).json({
      message: "Workouts added successfully",
      workouts: parsedWorkouts,
    });
  } catch (err) {
    next(err);
  }
};

// Function to parse workout details from a line
const parseWorkoutLine = (parts) => {
  const details = {};
  if (parts.length >= 5) {
    details.workoutName = parts[1].substring(1).trim();
    details.sets = parseInt(parts[2].split("sets")[0].substring(1).trim());
    details.reps = parseInt(parts[2].split("sets")[1].split("reps")[0].substring(1).trim());
    details.weight = parseFloat(parts[3].split("kg")[0].substring(1).trim());
    details.duration = parseFloat(parts[4].split("min")[0].substring(1).trim());
    return details;
  }
  return null;
};

// Function to calculate calories burnt for a workout
const calculateCaloriesBurnt = (workoutDetails) => {
  const durationInMinutes = parseFloat(workoutDetails.duration) || 0;
  const weightInKg = parseFloat(workoutDetails.weight) || 0;
  const caloriesBurntPerMinute = 5; // Sample value, actual calculation may vary
  return durationInMinutes * caloriesBurntPerMinute * weightInKg;
};