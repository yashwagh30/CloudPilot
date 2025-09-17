import { useState } from "react";
import LoginForm from "@/components/LoginForm";
import { type User } from "@/lib/auth";

interface AuthPageProps {
  onAuth: (user: User) => void;
}

export default function AuthPage({ onAuth }: AuthPageProps) {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <LoginForm
      onAuth={onAuth}
      onToggleMode={() => setIsSignup(!isSignup)}
      isSignup={isSignup}
    />
  );
}