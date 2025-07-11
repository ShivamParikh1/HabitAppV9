import { account, ID } from './appwriteClient';

// Sign up new user
export async function signUp(email, password, name = '') {
  try {
    const user = await account.create(ID.unique(), email, password, name);
    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Sign in existing user
export async function signIn(email, password) {
  try {
    const session = await account.createEmailSession(email, password);
    return { success: true, session };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Get current user info
export async function getCurrentUser() {
  try {
    return await account.get();
  } catch (error) {
    return null;
  }
}

// Sign out current user
export async function signOut() {
  try {
    await account.deleteSession('current');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Forgot password
export async function sendPasswordReset(email) {
  try {
    await account.createRecovery(email, 'https://your-app-url.com/reset');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
