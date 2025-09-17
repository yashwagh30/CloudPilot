import LoginForm from '../LoginForm';

export default function LoginFormExample() {
  return (
    <LoginForm
      onLogin={(credentials) => console.log('Login attempted:', credentials)}
      onToggleMode={() => console.log('Toggle mode')}
      isSignup={false}
    />
  );
}