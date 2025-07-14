import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const HabitContext = createContext()

export function useHabits() {
  return useContext(HabitContext)
}

export function HabitProvider({ children }) {
  const { currentUser, getUserData, updateUserData } = useAuth()
  const [habits, setHabits] = useState({})
  const [habitCompletion, setHabitCompletion] = useState({})
  const [activityLog, setActivityLog] = useState({})
  const [habitPreferences, setHabitPreferences] = useState({})
  const [habitStacks, setHabitStacks] = useState({})
  const [dailyStats, setDailyStats] = useState({})
  const [reflections, setReflections] = useState({})
  const [loading, setLoading] = useState(true)

  // Load user data when user changes
  useEffect(() => {
    if (currentUser && currentUser.emailVerification) {
      loadUserData()
    } else {
      resetAllData()
    }
  }, [currentUser])

  function resetAllData() {
    setHabits({})
    setHabitCompletion({})
    setActivityLog({})
    setHabitPreferences({})
    setHabitStacks({})
    setDailyStats({})
    setReflections({})
    setLoading(false)
  }

  async function loadUserData() {
    try {
      setLoading(true)
      const userData = await getUserData(currentUser.$id)
      if (userData) {
        setHabits(userData.habits || {})
        setHabitCompletion(userData.habitCompletion || {})
        setActivityLog(userData.activityLog || {})
        setHabitPreferences(userData.habitPreferences || {})
        setHabitStacks(userData.habitStacks || {})
        setDailyStats(userData.dailyStats || {})
        setReflections(userData.reflections || {})
      }
    } catch (error) {
      console.error('Error loading user data:', error)
    } finally {
      setLoading(false)
    }
  }

  async function saveUserData() {
    if (!currentUser) return

    try {
      const userData = {
        habits,
        habitCompletion,
        activityLog,
        habitPreferences,
        habitStacks,
        dailyStats,
        reflections,
        lastUpdated: new Date().toISOString()
      }
      
      await updateUserData(currentUser.$id, userData)
    } catch (error) {
      console.error('Error saving user data:', error)
    }
  }

  function addHabit(habitId, habitData) {
    const newHabits = {
      ...habits,
      [habitId]: {
        ...habitData,
        id: habitId,
        createdAt: new Date().toISOString(),
        streak: 0,
        bestStreak: 0,
        totalDays: 0,
        completedDays: [],
        completionType: habitData.completionType || 'single',
        targetCount: habitData.targetCount || 1
      }
    }
    setHabits(newHabits)
    
    // Save preferences if provided
    if (habitData.preferences && Object.keys(habitData.preferences).length > 0) {
      const newPreferences = {
        ...habitPreferences,
        [habitId]: {
          ...habitData.preferences,
          lastUpdated: new Date().toISOString()
        }
      }
      setHabitPreferences(newPreferences)
    }
    
    // Mark today as active since user added a habit
    markDayActive()
  }

  function removeHabit(habitId) {
    const newHabits = { ...habits }
    delete newHabits[habitId]
    setHabits(newHabits)

    // Remove from completion data
    const newCompletion = { ...habitCompletion }
    Object.keys(newCompletion).forEach(date => {
      if (newCompletion[date][habitId]) {
        delete newCompletion[date][habitId]
      }
      if (Object.keys(newCompletion[date]).length === 0) {
        delete newCompletion[date]
      }
    })
    setHabitCompletion(newCompletion)

    // Remove preferences
    const newPreferences = { ...habitPreferences }
    delete newPreferences[habitId]
    setHabitPreferences(newPreferences)

    // Update daily stats
    updateDailyStatsForDate(new Date().toISOString().split('T')[0])
  }

  function completeHabit(habitId) {
    const today = new Date().toDateString()
    const habit = habits[habitId]
    
    if (!habit) return

    // Check if already completed today
    if (habit.completedDays && habit.completedDays.includes(today)) {
      return // Already completed today
    }

    const newHabits = { ...habits }
    const updatedHabit = { ...newHabits[habitId] }
    
    // Add today to completed days
    if (!updatedHabit.completedDays) {
      updatedHabit.completedDays = []
    }
    updatedHabit.completedDays.push(today)
    
    // Update streak
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = yesterday.toDateString()
    
    if (updatedHabit.completedDays.includes(yesterdayStr) || updatedHabit.streak === 0) {
      updatedHabit.streak = (updatedHabit.streak || 0) + 1
    } else {
      updatedHabit.streak = 1
    }
    
    // Update best streak
    updatedHabit.bestStreak = Math.max(
      updatedHabit.bestStreak || 0,
      updatedHabit.streak
    )
    
    // Update total days
    updatedHabit.totalDays = (updatedHabit.totalDays || 0) + 1
    updatedHabit.lastCompleted = today
    
    newHabits[habitId] = updatedHabit
    setHabits(newHabits)
    
    // Mark day as active
    markDayActive()
    
    // Update daily stats
    updateDailyStatsForDate(new Date().toISOString().split('T')[0])
  }

  function uncompleteHabit(habitId) {
    const today = new Date().toDateString()
    const habit = habits[habitId]
    
    if (!habit || !habit.completedDays || !habit.completedDays.includes(today)) {
      return // Not completed today
    }

    const newHabits = { ...habits }
    const updatedHabit = { ...newHabits[habitId] }
    
    // Remove today from completed days
    updatedHabit.completedDays = updatedHabit.completedDays.filter(date => date !== today)
    
    // Decrease streak and total days
    updatedHabit.streak = Math.max(0, (updatedHabit.streak || 0) - 1)
    updatedHabit.totalDays = Math.max(0, (updatedHabit.totalDays || 0) - 1)
    
    newHabits[habitId] = updatedHabit
    setHabits(newHabits)
    
    // Update daily stats
    updateDailyStatsForDate(new Date().toISOString().split('T')[0])
  }

  function markDayActive() {
    const today = new Date().toISOString().split('T')[0]
    const newActivityLog = { ...activityLog }
    newActivityLog[today] = true
    setActivityLog(newActivityLog)
  }

  function updateDailyStatsForDate(dateStr) {
    // Get habits that existed on this specific date
    const habitsOnDate = Object.values(habits).filter(habit => {
      const habitCreatedDate = new Date(habit.createdAt).toISOString().split('T')[0]
      return habitCreatedDate <= date
    })
    
    // Count completed habits on this date
    const dateObj = new Date(dateStr)
    const dateString = dateObj.toDateString()
    
    const completedHabits = habitsOnDate.filter(habit => {
      return habit.completedDays && habit.completedDays.includes(dateString)
    }).length
    
    const totalHabits = habitsOnDate.length
    
    const newDailyStats = { ...dailyStats }
    if (totalHabits > 0) {
      newDailyStats[dateStr] = {
        habitsCompleted: completedHabits,
        habitsTotal: totalHabits,
        percentage: Math.round((completedHabits / totalHabits) * 100)
      }
    } else {
      delete newDailyStats[dateStr]
    }
    
    setDailyStats(newDailyStats)
  }

  function isHabitCompletedToday(habitId) {
    const today = new Date().toDateString()
    const habit = habits[habitId]
    return habit && habit.completedDays && habit.completedDays.includes(today)
  }

  function getActiveHabitsCount() {
    return Object.keys(habits).length
  }

  function getCurrentStreak() {
    const dates = Object.keys(activityLog).sort().reverse()
    let streak = 0
    const today = new Date().toISOString().split('T')[0]
    
    let currentDate = new Date()
    
    while (true) {
      const dateStr = currentDate.toISOString().split('T')[0]
      if (activityLog[dateStr]) {
        streak++
        currentDate.setDate(currentDate.getDate() - 1)
      } else {
        break
      }
    }
    
    return streak
  }

  function getWeeklyProgress() {
    const weekData = []
    const today = new Date()
    
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      
      // Use stored daily stats if available, otherwise calculate
      let percentage = 0
      let completedHabits = 0
      let totalHabits = 0
      
      if (dailyStats[dateStr]) {
        percentage = dailyStats[dateStr].percentage
        completedHabits = dailyStats[dateStr].habitsCompleted
        totalHabits = dailyStats[dateStr].habitsTotal
      } else {
        // Calculate for this date
        const habitsOnDate = Object.values(habits).filter(habit => {
          const habitCreatedDate = new Date(habit.createdAt).toISOString().split('T')[0]
          return habitCreatedDate <= dateStr
        })
        
        const dateString = date.toDateString()
        completedHabits = habitsOnDate.filter(habit => {
          return habit.completedDays && habit.completedDays.includes(dateString)
        }).length
        
        totalHabits = habitsOnDate.length
        percentage = totalHabits > 0 ? Math.round((completedHabits / totalHabits) * 100) : 0
      }
      
      weekData.push({
        date: dateStr,
        day: date.toLocaleDateString('en', { weekday: 'short' }).charAt(0),
        percentage,
        completedHabits,
        totalHabits
      })
    }
    
    return weekData
  }

  function getHabitPreferences(habitId) {
    return habitPreferences[habitId] || {}
  }

  function updateHabitPreferences(habitId, preferences) {
    const newPreferences = {
      ...habitPreferences,
      [habitId]: {
        ...preferences,
        lastUpdated: new Date().toISOString()
      }
    }
    setHabitPreferences(newPreferences)

    // Update habit target count if it changed
    const habit = habits[habitId]
    if (habit) {
      const { getHabitTargetCount } = require('../data/habitPreferences')
      const newTargetCount = getHabitTargetCount(habit, preferences)
      
      if (newTargetCount !== habit.targetCount) {
        const newHabits = {
          ...habits,
          [habitId]: {
            ...habit,
            targetCount: newTargetCount
          }
        }
        setHabits(newHabits)
      }
    }
  }

  // Habit Stack functions
  function createHabitStack(stackData) {
    const stackId = Date.now().toString()
    const newStacks = {
      ...habitStacks,
      [stackId]: {
        ...stackData,
        id: stackId,
        createdAt: new Date().toISOString()
      }
    }
    setHabitStacks(newStacks)
    return stackId
  }

  function updateHabitStack(stack, stackData) {
    const newStacks = {
      ...habitStacks,
      [stackId]: {
        ...habitStacks[stackId],
        ...stackData,
        updatedAt: new Date().toISOString()
      }
    }
    setHabitStacks(newStacks)
  }

  function deleteHabitStack(stackId) {
    const newStacks = {  ...habitStacks }
    delete newStacks[stackId]
    setHabitStacks(newStacks)
  }

  function getHabitStacks() {
    return Object.values(habitStacks)
  }

  // Journal/Reflection functions
  function addReflection(text, rating = null) {
    const reflectionId = Date.now().toString()
    const newReflections = {
      ...reflections,
      [reflectionId]: {
        id: reflectionId,
        text,
        rating,
        timestamp: new Date().toISOString(),
        date: new Date().toDateString()
      }
    }
    setReflections(newReflections)
    return reflectionId
  }

  function getReflections() {
    return Object.values(reflections).sort((a, b) => 
      new Date(b.timestamp) - new Date(a.timestamp)
    )
  }

  function deleteReflection(reflectionId) {
    const newReflections = { ...reflections }
    delete newReflections[reflectionId]
    setReflections(newReflections)
  }

  // Auto-save when data changes with debouncing
  
  useEffect(() => {
    if (!loading && currentUser) {
      const timeoutId = setTimeout(() => {
        saveUserData()
      }, 500) // Debounce saves by 500ms

      return () => clearTimeout(timeoutId)
    }
  }, [habits, habitCompletion, activityLog, habitPreferences, habitStacks, dailyStats, reflections])

  // Update daily stats when habits change
  useEffect(() => {
    if (!loading && currentUser) {
      const today = new Date().toISOString().split('T')[0]
      updateDailyStatsForDate(today)
    }
  }, [habits])

  const value = {
    habits,
    habitCompletion,
    activityLog,
    habitPreferences,
    habitStacks,
    dail Stats,
    reflections,
    loading,
    addHabit,
    removeHabit,
    completeHabit,
    uncompleteHabit,
    isHabitCompletedToday,
    getActiveHabitsCount,
    getCurrentStreak,
    getWeeklyProgress,
    getHabitPreferences,
    updateHabitPreferences,
    createHa itStack,
    updateHabitStack,
    deleteHabitStack,
    getHabitStacks,
    addReflection,
    getReflections,
    deleteReflection,
    loadUserData
  }

  return (
    <HabitContext.Provider value={value}>
      {children}
    </HabitContext.Provider>
  )
}
