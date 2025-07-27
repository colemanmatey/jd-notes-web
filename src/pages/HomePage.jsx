import { Link } from 'react-router-dom';
import { SimpleHeader } from '../components';

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <SimpleHeader />
      
      {/* Hero Section */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-8 leading-tight">
            Organize Your
            <span className="text-blue-600 block">Ministry Notes</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-700 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
            JD Notes is a note-saving and organization app built specifically for pastors and ministry leaders. 
            Whether you're preparing sermons, leading Bible studies, or capturing inspiration on the go, 
            JD Notes helps you stay spiritually organized.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/signup">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200">
                Start Your Journey
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Built for Ministry Leaders
            </h2>
            <p className="text-lg md:text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed font-medium">
              Powerful features designed to help you organize, access, and share your ministry content effectively.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Organize Notes</h3>
              <p className="text-slate-700 leading-relaxed">Categorize sermons, studies, and ideas with tags and folders for easy retrieval.</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Quick Search</h3>
              <p className="text-slate-700 leading-relaxed">Find any note instantly with powerful search across titles, content, and tags.</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Mobile Ready</h3>
              <p className="text-slate-700 leading-relaxed">Access your notes anywhere, anytime with our responsive mobile-friendly design.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-blue-600">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 leading-tight">
            Ready to Transform Your Ministry?
          </h2>
          <p className="text-lg md:text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            Join thousands of ministry leaders who use JD Notes to stay organized and focused on what matters most.
          </p>
          <Link to="/signup">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200">
              Get Started Free
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-2xl font-bold">JD Notes</span>
          </div>
          <p className="text-slate-300 mb-6 text-lg font-medium">Ministry Made Simple</p>
          <p className="text-slate-400">
            © 2025 JD Notes. Built with ❤️ for ministry leaders.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
