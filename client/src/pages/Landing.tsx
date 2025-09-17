// Landing page for logged out users
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Landing() {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome</h1>
          <p className="text-slate-300">Sign in to access your dashboard</p>
        </div>
        
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader className="text-center">
            <CardTitle className="text-white">Get Started</CardTitle>
            <CardDescription className="text-slate-300">
              Choose your preferred sign-in method
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={handleLogin}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              size="lg"
            >
              Sign In
            </Button>
            <div className="text-center text-sm text-slate-400">
              Sign in with Google, GitHub, Apple, or email
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}