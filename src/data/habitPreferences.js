// Configuration for habit-specific preferences
export const habitPreferencesConfig = {
  'drink-water': {
    fields: [
      {
        key: 'dailyGlasses',
        label: 'Daily Water Goal (glasses)',
        type: 'number',
        min: 1,
        max: 20,
        defaultValue: 8,
        required: true,
        description: 'How many glasses of water do you want to drink per day?'
      },
      {
        key: 'totalAmount',
        label: 'Total Daily Amount (ml)',
        type: 'number',
        min: 500,
        max: 5000,
        defaultValue: 2000,
        required: true,
        description: 'Total amount of water in milliliters'
      },
      {
        key: 'reminderTimes',
        label: 'Reminder Times',
        type: 'time-list',
        placeholder: '9:00 AM, 12:00 PM, 3:00 PM, 6:00 PM',
        description: 'When would you like to be reminded to drink water?'
      },
      {
        key: 'glassSize',
        label: 'Glass Size (ml)',
        type: 'select',
        options: [
          { value: '200', label: '200ml (Small glass)' },
          { value: '250', label: '250ml (Standard glass)' },
          { value: '300', label: '300ml (Large glass)' },
          { value: '500', label: '500ml (Water bottle)' }
        ],
        defaultValue: '250',
        description: 'What size container do you typically use?'
      }
    ],
    completionType: 'multi',
    getTargetCount: (preferences) => preferences.dailyGlasses || 8
  },
  'meditation': {
    fields: [
      {
        key: 'duration',
        label: 'Session Duration (minutes)',
        type: 'number',
        min: 1,
        max: 120,
        defaultValue: 10,
        required: true,
        description: 'How long do you want to meditate each day?'
      },
      {
        key: 'preferredTime',
        label: 'Preferred Time',
        type: 'select',
        options: [
          { value: 'morning', label: 'Morning (6-10 AM)' },
          { value: 'afternoon', label: 'Afternoon (12-4 PM)' },
          { value: 'evening', label: 'Evening (6-9 PM)' },
          { value: 'night', label: 'Night (9-11 PM)' }
        ],
        defaultValue: 'morning',
        description: 'When do you prefer to meditate?'
      },
      {
        key: 'meditationType',
        label: 'Meditation Type',
        type: 'select',
        options: [
          { value: 'mindfulness', label: 'Mindfulness' },
          { value: 'breathing', label: 'Breathing exercises' },
          { value: 'guided', label: 'Guided meditation' },
          { value: 'mantra', label: 'Mantra meditation' }
        ],
        defaultValue: 'mindfulness',
        description: 'What type of meditation interests you most?'
      },
      {
        key: 'reminderTime',
        label: 'Daily Reminder Time',
        type: 'text',
        placeholder: '7:00 AM',
        description: 'When should we remind you to meditate?'
      }
    ],
    completionType: 'single',
    getTargetCount: () => 1
  },
  'exercise': {
    fields: [
      {
        key: 'duration',
        label: 'Exercise Duration (minutes)',
        type: 'number',
        min: 5,
        max: 180,
        defaultValue: 30,
        required: true,
        description: 'How long do you want to exercise each day?'
      },
      {
        key: 'exerciseType',
        label: 'Exercise Type',
        type: 'select',
        options: [
          { value: 'cardio', label: 'Cardio (running, cycling, etc.)' },
          { value: 'strength', label: 'Strength training' },
          { value: 'yoga', label: 'Yoga' },
          { value: 'walking', label: 'Walking' },
          { value: 'sports', label: 'Sports' },
          { value: 'mixed', label: 'Mixed activities' }
        ],
        defaultValue: 'mixed',
        description: 'What type of exercise do you prefer?'
      },
      {
        key: 'preferredTime',
        label: 'Preferred Time',
        type: 'select',
        options: [
          { value: 'early-morning', label: 'Early Morning (5-7 AM)' },
          { value: 'morning', label: 'Morning (7-10 AM)' },
          { value: 'afternoon', label: 'Afternoon (12-4 PM)' },
          { value: 'evening', label: 'Evening (5-8 PM)' }
        ],
        defaultValue: 'morning',
        description: 'When do you prefer to exercise?'
      },
      {
        key: 'weeklyGoal',
        label: 'Weekly Goal (days)',
        type: 'number',
        min: 1,
        max: 7,
        defaultValue: 5,
        description: 'How many days per week do you want to exercise?'
      }
    ],
    completionType: 'single',
    getTargetCount: () => 1
  },
  'reading': {
    fields: [
      {
        key: 'dailyPages',
        label: 'Daily Reading Goal (pages)',
        type: 'number',
        min: 1,
        max: 100,
        defaultValue: 10,
        required: true,
        description: 'How many pages do you want to read each day?'
      },
      {
        key: 'preferredTime',
        label: 'Preferred Reading Time',
        type: 'select',
        options: [
          { value: 'morning', label: 'Morning' },
          { value: 'afternoon', label: 'Afternoon' },
          { value: 'evening', label: 'Evening' },
          { value: 'before-bed', label: 'Before bed' }
        ],
        defaultValue: 'evening',
        description: 'When do you prefer to read?'
      },
      {
        key: 'bookGenre',
        label: 'Preferred Genre',
        type: 'select',
        options: [
          { value: 'fiction', label: 'Fiction' },
          { value: 'non-fiction', label: 'Non-fiction' },
          { value: 'self-help', label: 'Self-help' },
          { value: 'biography', label: 'Biography' },
          { value: 'science', label: 'Science' },
          { value: 'mixed', label: 'Mixed genres' }
        ],
        defaultValue: 'mixed',
        description: 'What type of books do you enjoy most?'
      }
    ],
    completionType: 'multi',
    getTargetCount: (preferences) => preferences.dailyPages || 10
  },
  'wake-early': {
    fields: [
      {
        key: 'targetWakeTime',
        label: 'Target Wake Time',
        type: 'text',
        placeholder: '6:00 AM',
        defaultValue: '6:00 AM',
        required: true,
        description: 'What time do you want to wake up?'
      },
      {
        key: 'currentWakeTime',
        label: 'Current Wake Time',
        type: 'text',
        placeholder: '8:00 AM',
        description: 'What time do you currently wake up?'
      },
      {
        key: 'bedtimeGoal',
        label: 'Target Bedtime',
        type: 'text',
        placeholder: '10:00 PM',
        description: 'What time should you go to bed to get enough sleep?'
      },
      {
        key: 'sleepHours',
        label: 'Desired Sleep Hours',
        type: 'number',
        min: 6,
        max: 12,
        defaultValue: 8,
        description: 'How many hours of sleep do you need?'
      }
    ],
    completionType: 'single',
    getTargetCount: () => 1
  },
  'brush-properly': {
    fields: [
      {
        key: 'brushingDuration',
        label: 'Brushing Duration (minutes)',
        type: 'number',
        min: 1,
        max: 5,
        defaultValue: 2,
        required: true,
        description: 'How long do you want to brush your teeth?'
      },
      {
        key: 'timesPerDay',
        label: 'Times Per Day',
        type: 'number',
        min: 1,
        max: 4,
        defaultValue: 2,
        required: true,
        description: 'How many times per day do you want to brush?'
      },
      {
        key: 'preferredTime',
        label: 'Preferred Times',
        type: 'select',
        options: [
          { value: 'morning-night', label: 'Morning & Night' },
          { value: 'after-meals', label: 'After Each Meal' },
          { value: 'morning-afternoon-night', label: 'Morning, Afternoon & Night' },
          { value: 'custom', label: 'Custom Schedule' }
        ],
        defaultValue: 'morning-night',
        description: 'When do you prefer to brush your teeth?'
      },
      {
        key: 'toothbrushType',
        label: 'Toothbrush Type',
        type: 'select',
        options: [
          { value: 'manual', label: 'Manual Toothbrush' },
          { value: 'electric', label: 'Electric Toothbrush' },
          { value: 'sonic', label: 'Sonic Toothbrush' }
        ],
        defaultValue: 'manual',
        description: 'What type of toothbrush do you use?'
      }
    ],
    completionType: 'multi',
    getTargetCount: (preferences) => preferences.timesPerDay || 2
  },
  'use-conditioner': {
    fields: [
      {
        key: 'conditionerType',
        label: 'Conditioner Type',
        type: 'select',
        options: [
          { value: 'rinse-out', label: 'Rinse-out Conditioner' },
          { value: 'leave-in', label: 'Leave-in Conditioner' },
          { value: 'deep-conditioning', label: 'Deep Conditioning Treatment' },
          { value: 'mixed', label: 'Mix of Different Types' }
        ],
        defaultValue: 'rinse-out',
        description: 'What type of conditioner do you prefer to use?'
      },
      {
        key: 'frequency',
        label: 'Usage Frequency',
        type: 'select',
        options: [
          { value: 'daily', label: 'Every Day' },
          { value: 'every-wash', label: 'Every Time I Wash Hair' },
          { value: 'alternate', label: 'Every Other Wash' },
          { value: 'weekly', label: 'Once a Week' }
        ],
        defaultValue: 'every-wash',
        description: 'How often do you want to use conditioner?'
      },
      {
        key: 'hairType',
        label: 'Hair Type',
        type: 'select',
        options: [
          { value: 'dry', label: 'Dry Hair' },
          { value: 'oily', label: 'Oily Hair' },
          { value: 'normal', label: 'Normal Hair' },
          { value: 'curly', label: 'Curly Hair' },
          { value: 'straight', label: 'Straight Hair' },
          { value: 'damaged', label: 'Damaged Hair' }
        ],
        defaultValue: 'normal',
        description: 'What best describes your hair type?'
      },
      {
        key: 'applicationTime',
        label: 'Application Time (minutes)',
        type: 'number',
        min: 1,
        max: 10,
        defaultValue: 3,
        description: 'How long do you leave conditioner in your hair?'
      }
    ],
    completionType: 'single',
    getTargetCount: () => 1
  },
  'skin-care': {
    fields: [
      {
        key: 'routineType',
        label: 'Routine Type',
        type: 'select',
        options: [
          { value: 'basic', label: 'Basic (Cleanser + Moisturizer)' },
          { value: 'intermediate', label: 'Intermediate (+ Toner/Serum)' },
          { value: 'advanced', label: 'Advanced (Full Multi-Step)' },
          { value: 'custom', label: 'Custom Routine' }
        ],
        defaultValue: 'basic',
        description: 'What level of skincare routine do you want to maintain?'
      },
      {
        key: 'frequency',
        label: 'Routine Frequency',
        type: 'select',
        options: [
          { value: 'twice-daily', label: 'Morning & Night' },
          { value: 'once-daily', label: 'Once Daily' },
          { value: 'night-only', label: 'Night Only' },
          { value: 'morning-only', label: 'Morning Only' }
        ],
        defaultValue: 'twice-daily',
        description: 'How often do you want to do your skincare routine?'
      },
      {
        key: 'skinType',
        label: 'Skin Type',
        type: 'select',
        options: [
          { value: 'normal', label: 'Normal' },
          { value: 'dry', label: 'Dry' },
          { value: 'oily', label: 'Oily' },
          { value: 'combination', label: 'Combination' },
          { value: 'sensitive', label: 'Sensitive' }
        ],
        defaultValue: 'normal',
        description: 'What is your skin type?'
      },
      {
        key: 'timeCommitment',
        label: 'Time Commitment (minutes)',
        type: 'number',
        min: 2,
        max: 30,
        defaultValue: 5,
        description: 'How many minutes do you want to spend on skincare?'
      }
    ],
    completionType: 'multi',
    getTargetCount: (preferences) => {
      const frequency = preferences.frequency || 'twice-daily'
      return frequency === 'twice-daily' ? 2 : 1
    }
  },
  'eat-fruit': {
    fields: [
      {
        key: 'dailyServings',
        label: 'Daily Fruit Servings Goal',
        type: 'number',
        min: 1,
        max: 8,
        defaultValue: 2,
        required: true,
        description: 'How many servings of fruit do you want to eat per day?'
      },
      {
        key: 'preferredTimes',
        label: 'Preferred Times to Eat Fruit',
        type: 'select',
        options: [
          { value: 'morning', label: 'Morning (before breakfast)' },
          { value: 'snacks', label: 'As snacks between meals' },
          { value: 'with-meals', label: 'With meals' },
          { value: 'evening', label: 'Evening' },
          { value: 'anytime', label: 'Anytime throughout the day' }
        ],
        defaultValue: 'snacks',
        description: 'When do you prefer to eat fruit?'
      },
      {
        key: 'fruitTypes',
        label: 'Preferred Fruit Types',
        type: 'text',
        placeholder: 'e.g., apples, bananas, berries, oranges',
        description: 'What types of fruit do you enjoy most?'
      },
      {
        key: 'reminderTimes',
        label: 'Reminder Times',
        type: 'time-list',
        placeholder: '10:00 AM, 3:00 PM',
        description: 'When would you like to be reminded to eat fruit?'
      }
    ],
    completionType: 'multi',
    getTargetCount: (preferences) => preferences.dailyServings || 2
  },
  'study-finance': {
    fields: [
      {
        key: 'studyDuration',
        label: 'Daily Study Duration (minutes)',
        type: 'number',
        min: 5,
        max: 120,
        defaultValue: 15,
        required: true,
        description: 'How many minutes do you want to study finance daily?'
      },
      {
        key: 'learningMethod',
        label: 'Preferred Learning Method',
        type: 'select',
        options: [
          { value: 'videos', label: 'Educational Videos' },
          { value: 'articles', label: 'Articles & Blogs' },
          { value: 'books', label: 'Books' },
          { value: 'podcasts', label: 'Podcasts' },
          { value: 'courses', label: 'Online Courses' },
          { value: 'mixed', label: 'Mix of Different Methods' }
        ],
        defaultValue: 'videos',
        description: 'How do you prefer to learn about finance?'
      },
      {
        key: 'focusArea',
        label: 'Primary Focus Area',
        type: 'select',
        options: [
          { value: 'budgeting', label: 'Budgeting & Saving' },
          { value: 'investing', label: 'Investing & Stocks' },
          { value: 'debt', label: 'Debt Management' },
          { value: 'retirement', label: 'Retirement Planning' },
          { value: 'general', label: 'General Financial Literacy' },
          { value: 'business', label: 'Business & Entrepreneurship' }
        ],
        defaultValue: 'general',
        description: 'What area of finance interests you most?'
      },
      {
        key: 'studyTime',
        label: 'Preferred Study Time',
        type: 'select',
        options: [
          { value: 'morning', label: 'Morning (6-10 AM)' },
          { value: 'afternoon', label: 'Afternoon (12-4 PM)' },
          { value: 'evening', label: 'Evening (6-9 PM)' },
          { value: 'night', label: 'Night (9-11 PM)' }
        ],
        defaultValue: 'evening',
        description: 'When do you prefer to study finance?'
      }
    ],
    completionType: 'single',
    getTargetCount: () => 1
  },
  'help-someone': {
    fields: [
      {
        key: 'helpType',
        label: 'Type of Help',
        type: 'select',
        options: [
          { value: 'emotional', label: 'Emotional Support (listening, encouragement)' },
          { value: 'practical', label: 'Practical Help (tasks, errands)' },
          { value: 'gratitude', label: 'Expressing Gratitude & Appreciation' },
          { value: 'quality-time', label: 'Spending Quality Time' },
          { value: 'mixed', label: 'Mix of Different Types' }
        ],
        defaultValue: 'mixed',
        description: 'What type of help do you want to focus on?'
      },
      {
        key: 'targetPeople',
        label: 'Who Do You Want to Help?',
        type: 'text',
        placeholder: 'e.g., family, friends, partner, colleagues',
        description: 'Who are the important people in your life you want to help?'
      },
      {
        key: 'reminderTime',
        label: 'Daily Reminder Time',
        type: 'text',
        placeholder: '9:00 AM',
        description: 'When should we remind you to help someone?'
      },
      {
        key: 'reflectionMethod',
        label: 'How Will You Track Impact?',
        type: 'select',
        options: [
          { value: 'journal', label: 'Write in a journal' },
          { value: 'mental-note', label: 'Mental reflection' },
          { value: 'gratitude-app', label: 'Use gratitude app' },
          { value: 'none', label: 'No tracking needed' }
        ],
        defaultValue: 'mental-note',
        description: 'How do you want to reflect on your acts of kindness?'
      }
    ],
    completionType: 'single',
    getTargetCount: () => 1
  },
  'pray': {
    fields: [
      {
        key: 'prayerDuration',
        label: 'Prayer Duration (minutes)',
        type: 'number',
        min: 1,
        max: 60,
        defaultValue: 5,
        required: true,
        description: 'How long do you want to pray each time?'
      },
      {
        key: 'prayerTimes',
        label: 'Prayer Frequency',
        type: 'select',
        options: [
          { value: 'once', label: 'Once per day' },
          { value: 'twice', label: 'Twice per day (morning & evening)' },
          { value: 'three', label: 'Three times per day' },
          { value: 'five', label: 'Five times per day' },
          { value: 'custom', label: 'Custom schedule' }
        ],
        defaultValue: 'once',
        description: 'How often do you want to pray each day?'
      },
      {
        key: 'preferredTime',
        label: 'Preferred Prayer Time',
        type: 'select',
        options: [
          { value: 'wake-up', label: 'Right after waking up' },
          { value: 'morning', label: 'Morning (6-10 AM)' },
          { value: 'afternoon', label: 'Afternoon (12-4 PM)' },
          { value: 'evening', label: 'Evening (6-9 PM)' },
          { value: 'before-bed', label: 'Before going to bed' }
        ],
        defaultValue: 'morning',
        description: 'When do you prefer to pray?'
      },
      {
        key: 'prayerFocus',
        label: 'Prayer Focus',
        type: 'select',
        options: [
          { value: 'gratitude', label: 'Gratitude & Thanksgiving' },
          { value: 'guidance', label: 'Guidance & Wisdom' },
          { value: 'strength', label: 'Strength & Peace' },
          { value: 'others', label: 'Prayers for Others' },
          { value: 'mixed', label: 'Mix of Different Focuses' }
        ],
        defaultValue: 'mixed',
        description: 'What do you want to focus on in your prayers?'
      }
    ],
    completionType: 'multi',
    getTargetCount: (preferences) => {
      const frequency = preferences.prayerTimes || 'once'
      const frequencyMap = {
        'once': 1,
        'twice': 2,
        'three': 3,
        'five': 5,
        'custom': 1
      }
      return frequencyMap[frequency] || 1
    }
  },
  'cut-calories': {
    fields: [
      {
        key: 'calorieGoal',
        label: 'Daily Calorie Goal',
        type: 'number',
        min: 1200,
        max: 3500,
        defaultValue: 2000,
        required: true,
        description: 'What is your target daily calorie intake?'
      },
      {
        key: 'trackingMethod',
        label: 'Tracking Method',
        type: 'select',
        options: [
          { value: 'app', label: 'Food tracking app (MyFitnessPal, etc.)' },
          { value: 'journal', label: 'Food journal/diary' },
          { value: 'portion-control', label: 'Portion control (visual cues)' },
          { value: 'mindful-eating', label: 'Mindful eating practices' },
          { value: 'mixed', label: 'Combination of methods' }
        ],
        defaultValue: 'app',
        description: 'How do you want to track your calorie intake?'
      },
      {
        key: 'mealStrategy',
        label: 'Meal Strategy',
        type: 'select',
        options: [
          { value: 'three-meals', label: 'Three main meals' },
          { value: 'small-frequent', label: 'Small frequent meals (5-6 times)' },
          { value: 'intermittent', label: 'Intermittent fasting' },
          { value: 'flexible', label: 'Flexible approach' }
        ],
        defaultValue: 'three-meals',
        description: 'What meal pattern works best for you?'
      },
      {
        key: 'primaryGoal',
        label: 'Primary Goal',
        type: 'select',
        options: [
          { value: 'weight-loss', label: 'Weight Loss' },
          { value: 'weight-maintain', label: 'Weight Maintenance' },
          { value: 'energy-levels', label: 'Better Energy Levels' },
          { value: 'health', label: 'Overall Health Improvement' },
          { value: 'muscle-gain', label: 'Muscle Gain with Fat Loss' }
        ],
        defaultValue: 'health',
        description: 'What is your main goal with calorie management?'
      }
    ],
    completionType: 'single',
    getTargetCount: () => 1
  },
  'clean-room': {
    fields: [
      {
        key: 'cleaningDuration',
        label: 'Daily Cleaning Time (minutes)',
        type: 'number',
        min: 2,
        max: 60,
        defaultValue: 10,
        required: true,
        description: 'How many minutes do you want to spend cleaning daily?'
      },
      {
        key: 'preferredTime',
        label: 'Preferred Cleaning Time',
        type: 'select',
        options: [
          { value: 'morning', label: 'Morning (After Waking)' },
          { value: 'evening', label: 'Evening (Before Bed)' },
          { value: 'afternoon', label: 'Afternoon' },
          { value: 'flexible', label: 'Flexible/Whenever' }
        ],
        defaultValue: 'evening',
        description: 'When do you prefer to clean your room?'
      },
      {
        key: 'cleaningStyle',
        label: 'Cleaning Approach',
        type: 'select',
        options: [
          { value: 'quick-tidy', label: 'Quick Tidy (Make bed, pick up items)' },
          { value: 'deep-clean', label: 'Deep Clean (Vacuum, dust, organize)' },
          { value: 'zone-cleaning', label: 'Zone Cleaning (One area at a time)' },
          { value: 'maintenance', label: 'Maintenance (Keep things organized)' }
        ],
        defaultValue: 'quick-tidy',
        description: 'What type of cleaning approach works best for you?'
      },
      {
        key: 'motivation',
        label: 'Primary Motivation',
        type: 'select',
        options: [
          { value: 'stress-reduction', label: 'Reduce Stress & Anxiety' },
          { value: 'productivity', label: 'Improve Focus & Productivity' },
          { value: 'better-sleep', label: 'Better Sleep Quality' },
          { value: 'self-discipline', label: 'Build Self-Discipline' },
          { value: 'aesthetics', label: 'Visual Appeal & Pride' }
        ],
        defaultValue: 'stress-reduction',
        description: 'What motivates you most to keep your room clean?'
      }
    ],
    completionType: 'single',
    getTargetCount: () => 1
  },
  'journaling': {
    fields: [
      {
        key: 'writingDuration',
        label: 'Writing Duration (minutes)',
        type: 'number',
        min: 1,
        max: 60,
        defaultValue: 10,
        required: true,
        description: 'How long do you want to spend journaling each day?'
      },
      {
        key: 'journalType',
        label: 'Journal Type',
        type: 'select',
        options: [
          { value: 'gratitude', label: 'Gratitude Journal' },
          { value: 'reflection', label: 'Daily Reflection' },
          { value: 'stream', label: 'Stream of Consciousness' },
          { value: 'goal-tracking', label: 'Goal Tracking' },
          { value: 'creative', label: 'Creative Writing' },
          { value: 'mixed', label: 'Mixed/Flexible' }
        ],
        defaultValue: 'reflection',
        description: 'What type of journaling interests you most?'
      },
      {
        key: 'preferredTime',
        label: 'Preferred Writing Time',
        type: 'select',
        options: [
          { value: 'morning', label: 'Morning (6-10 AM)' },
          { value: 'afternoon', label: 'Afternoon (12-4 PM)' },
          { value: 'evening', label: 'Evening (6-9 PM)' },
          { value: 'bedtime', label: 'Before Bed (9-11 PM)' }
        ],
        defaultValue: 'bedtime',
        description: 'When do you prefer to write in your journal?'
      },
      {
        key: 'writingPrompts',
        label: 'Use Writing Prompts',
        type: 'select',
        options: [
          { value: 'always', label: 'Always use prompts' },
          { value: 'sometimes', label: 'Sometimes use prompts' },
          { value: 'rarely', label: 'Rarely use prompts' },
          { value: 'never', label: 'Free writing only' }
        ],
        defaultValue: 'sometimes',
        description: 'How often would you like to use writing prompts?'
      },
      {
        key: 'journalFormat',
        label: 'Journal Format',
        type: 'select',
        options: [
          { value: 'digital', label: 'Digital (app/computer)' },
          { value: 'physical', label: 'Physical notebook' },
          { value: 'both', label: 'Both digital and physical' }
        ],
        defaultValue: 'digital',
        description: 'How do you prefer to journal?'
      },
      {
        key: 'privacyLevel',
        label: 'Privacy Preference',
        type: 'select',
        options: [
          { value: 'completely-private', label: 'Completely private' },
          { value: 'selective-sharing', label: 'Share selected entries' },
          { value: 'progress-only', label: 'Share progress only' }
        ],
        defaultValue: 'completely-private',
        description: 'How private do you want your journaling to be?'
      }
    ],
    completionType: 'single',
    getTargetCount: () => 1
  }
}

// Helper function to get preference config for a habit
export function getHabitPreferenceConfig(habitId) {
  return habitPreferencesConfig[habitId] || null
}

// Helper function to check if a habit has custom preferences
export function hasCustomPreferences(habitId) {
  return habitId in habitPreferencesConfig
}

// Helper function to get completion type for a habit
export function getHabitCompletionType(habitId) {
  const config = habitPreferencesConfig[habitId]
  return config?.completionType || 'single'
}

// Helper function to get target count for a habit based on preferences
export function getHabitTargetCount(habitId, preferences = {}) {
  const config = habitPreferencesConfig[habitId]
  if (config?.getTargetCount) {
    return config.getTargetCount(preferences)
  }
  return 1
}