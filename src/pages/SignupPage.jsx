import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo, SignupForm } from '../components';

function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (formData) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      console.log('Signup attempt:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Handle successful signup
      // This would typically involve:
      // 1. API call to create account
      // 2. Email verification (optional)
      // 3. Auto-login or redirect to login
      
    } catch (error) {
      console.error('Signup failed:', error);
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
              Ministry Made
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                Simple
              </span>
            </h1>
            <p className="text-lg xl:text-xl text-gray-200 mb-10 leading-relaxed">
              Join thousands of ministry leaders who trust JD Notes to organize their spiritual insights, sermons, and pastoral care.
            </p>
            <div className="space-y-6">
              <div className="flex items-center text-gray-200">
                <div className="w-3 h-3 bg-blue-400 rounded-full mr-4 flex-shrink-0"></div>
                <span>Secure cloud storage for all your notes</span>
              </div>
              <div className="flex items-center text-gray-200">
                <div className="w-3 h-3 bg-purple-400 rounded-full mr-4 flex-shrink-0"></div>
                <span>Advanced search and organization tools</span>
              </div>
              <div className="flex items-center text-gray-200">
                <div className="w-3 h-3 bg-blue-400 rounded-full mr-4 flex-shrink-0"></div>
                <span>Collaborate with your ministry team</span>
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
                Create your account
              </h2>
              <p className="text-gray-200">
                Get started with JD Notes today
              </p>
            </div>

            {/* Signup Form */}
            <SignupForm onSignup={handleSignup} isLoading={isLoading} />

            {/* Footer */}
            <div className="mt-10 text-center">
              <p className="text-gray-200">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className="text-blue-300 hover:text-blue-200 font-semibold transition-colors duration-200 underline underline-offset-2"
                >
                  Sign in
                </Link>
              </p>
            </div>

            {/* Terms */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-300 leading-relaxed">
                By creating an account, you agree to our{' '}
                <Link to="/terms" className="text-blue-300 hover:text-blue-200 underline underline-offset-2">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-blue-300 hover:text-blue-200 underline underline-offset-2">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
