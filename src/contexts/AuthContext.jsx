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
      const user = await account.create(ID.unique(), email, password, name);
      const session = await account.createEmailSession(email, password); // auto-login after signup
      setCurrentUser(user);

      // Save user data in Appwrite DB (if you’ve created a "users" collection)
      await databases.createDocument(
        'main',         // database ID (you'll set this later)
        'users',        // collection ID
        user.$id,
        {
          name,
          email,
          verified: false,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          habits: {},
          habitCompletion: {},
          activityLog: {},
          habitPreferences: {}
        }
      );

      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: error.message };
    }
  }

  // SIGN IN
  async function login(email, password) {
    try {
      await account.createEmailSession(email, password);
      const user = await account.get();
      setCurrentUser(user);

      // Optionally update lastLogin in the DB
      await databases.updateDocument(
        'main',
        'users',
        user.$id,
        { lastLogin: new Date().toISOString() }
      );

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // SIGN OUT
  async function logout() {
    try {
      await account.deleteSession('current');
      setCurrentUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  // FORGOT PASSWORD
  async function resetPassword(email) {
    try {
      await account.createRecovery(email, 'https://yourapp.com/reset-password');
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Get user data from Appwrite database
  async function getUserData(uid) {
    try {
      const doc = await databases.getDocument('main', 'users', uid);
      return doc;
    } catch (error) {
      return null;
    }
  }

  async function updateUserData(uid, data) {
    return await databases.updateDocument('main', 'users', uid, data);
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
