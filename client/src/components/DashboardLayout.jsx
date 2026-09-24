import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ROLE_LINKS = {
  director: [
    { label: 'Profile', to: '/director/profile' },
    { label: 'Add School', to: '/director/add-school' },
    { label: 'Settings', to: '/director/settings' },
    { label: 'About', to: '/director/about' },
    { label: 'All Schools', to: '/director/all-schools' }
  ],
  admin: [
    { label: 'Register Principal', to: '/admin/principal-register' },
    { label: 'dashboard', to: '/admin/dashboard' },
    { label: 'about', to: '/admin/about' },
    { label: 'settings', to: '/admin/settings' },
    { label: 'All Principals', to: '/admin/all-principals' }
  ],
  teacher: [
    { label: 'All Students', to: '/teacher/all-students' },
    { label: 'Attendance', to: '/teacher/attendance' },
    { label: 'Grades', to: '/teacher/grades' },
    { label: 'Add student', to: '/teacher/add-student' },
  ],
  student: [
    { label: 'Schedule', to: '/student/schedule' },
    { label: 'Report Cards', to: '/student/reports' },
    { label: 'Assignments', to: '/student/assignments' },
    { label: 'profile', to: '/student/profile' }
  ],
  principal: [
    { label: 'Dashboard', to: '/principal/dashboard' },
    { label: 'about', to: '/principal/about' },
    { label: 'settings', to: '/principal/settings' },
    { label: 'Add Teacher', to: '/principal/add-teacher' },
    { label: 'All Teachers', to: '/principal/all-teachers' }
  ],
};

function DashboardLayout({ role }) {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  const title = role.charAt(0).toUpperCase() + role.slice(1);

  const currentLinks = ROLE_LINKS[role] || [];

  return (
    <div className="min-h-screen bg-gray-50 sticky top-0 z-50">
    <nav className="relative flex justify-between items-center px-8 py-4 bg-white border-b border-gray-100 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-3 h-8 bg-amber-500 rounded-full" />
        <h1 className="text-xl font-bold tracking-tight text-gray-800">
          {title} <span className="text-amber-500">Dashboard</span>
        </h1>
      </div>

      <button
        onClick={() => setIsOpen((open) => !open)}
        type="button"
        className="inline-flex items-center p-2 rounded-lg md:hidden text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
        aria-controls="dashboard-menu"
        aria-expanded={isOpen}
      >
        <span className="sr-only">Toggle navigation menu</span>
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      <div
        id="dashboard-menu"
        className={`${
          isOpen ? 'absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-6 flex' : 'hidden'
        } md:static md:bg-transparent md:border-none md:p-0 md:flex flex-col md:flex-row items-center gap-2 text-sm font-medium text-gray-600 z-50`}
      >
        <ul className="flex flex-col md:flex-row md:items-center gap-2 w-full md:w-auto">
          {currentLinks.map((link) => (
            <li className="w-full md:w-auto" key={link.to}>
              <Link to={link.to }>
                    {link.label}
              </Link>
            </li>
          ))}
          <li className="mt-2 pt-2 border-t border-gray-100 md:mt-0 md:pt-0 md:border-t-0 md:ml-4 md:pl-4 md:border-l md:border-gray-200 w-full md:w-auto">
            <button
              onClick={logout}
              type="button"
              className="w-full md:w-auto px-4 py-2 text-sm font-semibold text-white bg-rose-500 rounded-lg transition-all duration-200 shadow-sm shadow-rose-100 hover:bg-rose-600 hover:shadow-md active:scale-95"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
    <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <Outlet/>
    </main>

    </div>
  );
}

export default DashboardLayout;
