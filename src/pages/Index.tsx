import React from 'react';
import MainAppLayout from '@/components/layout/MainAppLayout';
import LoginForm from '@/components/Login/LoginForm';

// This type definition mirrors the 'LoginFormValues' type inferred from the Zod schema
// in LoginForm.tsx. It is defined here to ensure type safety for the handler's 'data' parameter,
// particularly if LoginFormValues is not explicitly exported from LoginForm.tsx.
interface LoginFormData {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const handleLoginSuccess = (data: LoginFormData) => {
    console.log("Login Succeeded. User data:", data);
    // In a real-world application, this function would typically handle session management,
    // redirect the user to a protected area (e.g., a dashboard), or update global application state.
    // For example, using react-router-dom for navigation:
    // import { useNavigate } from 'react-router-dom';
    // const navigate = useNavigate(); // Hook call would be at the component's top level
    // navigate('/dashboard');

    // For demonstration purposes, an alert is used to provide feedback.
    // Note: In a production environment, avoid using alert() for user notifications.
    // Consider using a toast notification system or other UI elements instead.
    alert(`Welcome, ${data.username}! Login successful.`);
  };

  const handleNavigateToSignUp = () => {
    console.log("Navigation to Sign Up page requested.");
    // In a real-world application, this function would navigate the user to the sign-up page.
    // For example, using react-router-dom:
    // import { useNavigate } from 'react-router-dom';
    // const navigate = useNavigate(); // Hook call would be at the component's top level
    // navigate('/signup');

    // For demonstration purposes, an alert is used.
    alert("Navigating to sign up page (simulated).");
  };

  return (
    <MainAppLayout>
      <LoginForm
        onLoginSuccess={handleLoginSuccess}
        onNavigateToSignUp={handleNavigateToSignUp}
      />
    </MainAppLayout>
  );
};

export default LoginPage;
