import { useState } from "react";
import LoginForm from "@/components/LoginForm";

interface AuthPageProps {
  onLogin: (credentials: { email: string; password: string }) => void;
}

export default function AuthPage({ onLogin }: AuthPageProps) {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <LoginForm
      onLogin={onLogin}
      onToggleMode={() => setIsSignup(!isSignup)}
      isSignup={isSignup}
    />
  );
}