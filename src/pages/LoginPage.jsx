import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo, Button, LoginForm } from '../components';

function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (formData) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      console.log('Login attempt:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Handle successful login
      // This would typically involve:
      // 1. API call to authenticate
      // 2. Store JWT token
      // 3. Redirect to dashboard
      
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-2/3 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16">
          <div className="max-w-lg">
            <div className="mb-8">
              <Link to="/">
                <Logo />
              </Link>
            </div>
            <h1 className="text-3xl xl:text-4xl font-bold text-white mb-8 leading-tight">
              Welcome back to
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                JD Notes
              </span>
            </h1>
            <p className="text-lg xl:text-xl text-gray-200 mb-10 leading-relaxed">
              Continue your spiritual journey with powerful note-taking tools designed for ministry leaders.
            </p>
            <div className="space-y-6">
              <div className="flex items-center text-gray-200">
                <div className="w-3 h-3 bg-blue-400 rounded-full mr-4 flex-shrink-0"></div>
                <span>Access your notes from anywhere</span>
              </div>
              <div className="flex items-center text-gray-200">
                <div className="w-3 h-3 bg-purple-400 rounded-full mr-4 flex-shrink-0"></div>
                <span>Sync across all your devices</span>
              </div>
              <div className="flex items-center text-gray-200">
                <div className="w-3 h-3 bg-blue-400 rounded-full mr-4 flex-shrink-0"></div>
                <span>Secure and always backed up</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-purple-500/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 right-10 w-16 h-16 bg-violet-500/10 rounded-full blur-xl"></div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 xl:w-1/3 flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md">
          <div className="bg-white/15 backdrop-blur-xl rounded-2xl border border-white/30 p-10 shadow-2xl">
            {/* Mobile logo */}
            <div className="lg:hidden text-center mb-10">
              <Link to="/">
                <Logo />
              </Link>
            </div>

            {/* Header */}
            <div className="text-center mb-10">
              <h2 className="text-2xl xl:text-3xl font-bold text-white mb-3">
                Welcome back
              </h2>
              <p className="text-gray-200">
                Sign in to continue your ministry
              </p>
            </div>

            {/* Login Form */}
            <LoginForm onLogin={handleLogin} isLoading={isLoading} />

            {/* Social Login */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-500"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-transparent text-gray-300">Or continue with</span>
                </div>
              </div>
              
              <div className="mt-8 grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="w-full bg-white/15 border-white/30 text-white hover:bg-white/25 transition-all duration-200 py-3 font-medium"
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full bg-white/15 border-white/30 text-white hover:bg-white/25 transition-all duration-200 py-3 font-medium"
                >
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                  Twitter
                </Button>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-10 text-center">
              <p className="text-gray-200">
                Don't have an account?{' '}
                <Link 
                  to="/signup" 
                  className="text-blue-300 hover:text-blue-200 font-semibold transition-colors duration-200 underline underline-offset-2"
                >
                  Sign up
                </Link>
              </p>
            </div>

            {/* Forgot password */}
            <div className="mt-6 text-center">
              <Link 
                to="/forgot-password" 
                className="text-gray-300 hover:text-gray-200 transition-colors duration-200 underline underline-offset-2"
              >
                Forgot your password?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
