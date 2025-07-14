import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function ProtectedRoute({ children })  {
  const { currentUser } = useAuth()

  if (!currentUser) {
    return <Navigate to="/login" />
  }

  // Note: Appwrite doesn't have emailVerified like Firebase
  // You can implement email verification if needed
  // if (!currentUser.emailVerification) {
  //   return <Navigate to="/verify-email" />
  // }

  return children
}
</b oltAction>
