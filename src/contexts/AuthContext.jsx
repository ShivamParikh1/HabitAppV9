import React, { createContext, useContext, useState, useEffect } from 'react';
import { account, databases, ID } from '../lib/appwriteClient';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // SIGN UP
  async function signup(email, password, name) {
    try {
      // Create user account
      const user = await account.create(ID.unique(), email, password, name);
      
      // Auto-login after signup
      const session = await account.createEmailSession(email, password);
      
      // Get updated user info
      const userInfo = await account.get();
      setCurrentUser(userInfo);

      // Create user document in database
      try {
        await databases.createDocument(
          '687073050007516b353d', // database ID (same as project ID)
          'users',                 // collection ID
          user.$id,
          {
            name,
            email,
            emailVerified: false,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            habits: {},
            habitCompletion: {},
            activityLog: {},
            habitPreferences: {},
            habitStacks: {},
            dailyStats: {},
            reflections: {},
            journalEntries: [],
            calendarEvents: [],
            todoItems: [],
            mealLogs: {},
            waterIntake: {},
            mealTrackerSettings: { waterGoal: 8 },
            futureLetters: [],
            gratitudeEntries: [],
            dayReflections: [],
            bucketListItems: [],
            transactions: [],
            budgets: {},
            savingsGoals: [],
            financeSettings: {},
            schoolTasks: [],
            schoolSubjects: [],
            schoolGrades: [],
            studySchedule: [],
            schoolSettings: {},
            passwordEntries: [],
            vaultPin: ''
          }
        );
      } catch (dbError) {
        console.error('Error creating user document:', dbError);
        // Continue even if document creation fails
      }

      return { user: userInfo };
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  }

  // SIGN IN
  async function login(email, password) {
    try {
      await account.createEmailSession(email, password);
      const user = await account.get();
      setCurrentUser(user);

      // Update lastLogin in the database
      try {
        await databases.updateDocument(
          '687073050007516b353d',
          'users',
          user.$id,
          { lastLogin: new Date().toISOString() }
        );
      } catch (dbError) {
        console.error('Error updating last login:', dbError);
      }

      return { user };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // SIGN OUT
  async function logout() {
    try {
      await account.deleteSession('current');
      setCurrentUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  // FORGOT PASSWORD
  async function resetPassword(email) {
    try {
      await account.createRecovery(
        email, 
        `${window.location.origin}/reset-password`
      );
      return { success: true };
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  }

  // Get user data from Appwrite database
  async function getUserData(uid) {
    try {
      const doc = await databases.getDocument('687073050007516b353d', 'users', uid);
      return doc;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  }

  // Update user data in Appwrite database
  async function updateUserData(uid, data) {
    try {
      return await databases.updateDocument('687073050007516b353d', 'users', uid, data);
    } catch (error) {
      console.error('Error updating user data:', error);
      throw error;
    }
  }

  // Auto-login if session exists
  useEffect(() => {
    account
      .get()
      .then((user) => {
        setCurrentUser(user);
        setLoading(false);
      })
      .catch(() => {
        setCurrentUser(null);
        setLoading(false);
      });
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    getUserData,
    updateUserData
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
