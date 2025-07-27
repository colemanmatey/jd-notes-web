import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './hooks'
import { 
  HomePage, 
  LoginPage, 
  SignupPage, 
  DashboardPage, 
  NoteEditPage 
} from './pages'

// Protected Route wrapper
function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('authToken')
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  return children
}

// Public Route wrapper (redirect to dashboard if already authenticated)
function PublicRoute({ children }) {
  const isAuthenticated = localStorage.getItem('authToken')
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }
  
  return children
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Routes>
            {/* Public routes */}
            <Route 
              path="/" 
              element={<HomePage />} 
            />
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              } 
            />
            <Route 
              path="/signup" 
              element={
                <PublicRoute>
                  <SignupPage />
                </PublicRoute>
              } 
            />
            
            {/* Protected routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/notes/:id" 
              element={
                <ProtectedRoute>
                  <NoteEditPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
