// Built-in exercise library, grouped for the picker. Custom names can be typed in too.
export const EXERCISE_LIBRARY = {
  Chest: [
    'Bench Press', 'Incline Bench Press', 'Dumbbell Bench Press', 'Incline Dumbbell Press',
    'Chest Fly (Machine)', 'Cable Fly', 'Push-Up', 'Dips',
  ],
  Back: [
    'Deadlift', 'Pull-Up', 'Chin-Up', 'Lat Pulldown', 'Barbell Row', 'Dumbbell Row',
    'Seated Cable Row', 'T-Bar Row', 'Face Pull', 'Back Extension',
  ],
  Legs: [
    'Squat', 'Front Squat', 'Leg Press', 'Romanian Deadlift', 'Bulgarian Split Squat',
    'Lunge', 'Leg Extension', 'Leg Curl', 'Hip Thrust', 'Calf Raise',
  ],
  Shoulders: [
    'Overhead Press', 'Dumbbell Shoulder Press', 'Lateral Raise', 'Front Raise',
    'Rear Delt Fly', 'Arnold Press', 'Upright Row', 'Shrug',
  ],
  Arms: [
    'Barbell Curl', 'Dumbbell Curl', 'Hammer Curl', 'Preacher Curl',
    'Tricep Pushdown', 'Overhead Tricep Extension', 'Skull Crusher', 'Close-Grip Bench Press',
  ],
  Core: [
    'Plank', 'Crunch', 'Hanging Leg Raise', 'Cable Crunch', 'Russian Twist', 'Ab Wheel Rollout',
  ],
  Cardio: [
    'Treadmill', 'Rowing Machine', 'Stationary Bike', 'Stair Climber', 'Elliptical', 'Jump Rope',
  ],
};

// Starter routines seeded on first run — editable/deletable like any user template.
export const STARTER_TEMPLATES = [
  {
    name: 'Push Day',
    exercises: [
      { name: 'Bench Press', sets: 4 },
      { name: 'Overhead Press', sets: 3 },
      { name: 'Incline Dumbbell Press', sets: 3 },
      { name: 'Lateral Raise', sets: 3 },
      { name: 'Tricep Pushdown', sets: 3 },
    ],
  },
  {
    name: 'Pull Day',
    exercises: [
      { name: 'Deadlift', sets: 3 },
      { name: 'Lat Pulldown', sets: 4 },
      { name: 'Seated Cable Row', sets: 3 },
      { name: 'Face Pull', sets: 3 },
      { name: 'Barbell Curl', sets: 3 },
    ],
  },
  {
    name: 'Leg Day',
    exercises: [
      { name: 'Squat', sets: 4 },
      { name: 'Romanian Deadlift', sets: 3 },
      { name: 'Leg Press', sets: 3 },
      { name: 'Leg Curl', sets: 3 },
      { name: 'Calf Raise', sets: 4 },
    ],
  },
];

export const HABIT_EMOJIS = ['💪', '🏃', '💧', '🥗', '😴', '🧘', '📖', '🚭', '🍺', '🦷', '💊', '🌞'];

export const HABIT_SUGGESTIONS = [
  { name: 'Drink 2L water', emoji: '💧' },
  { name: '10k steps', emoji: '🏃' },
  { name: 'No late-night snacks', emoji: '🥗' },
  { name: 'Sleep by 23:00', emoji: '😴' },
  { name: 'Protein with every meal', emoji: '💪' },
];
