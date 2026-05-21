import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, List, LogOut } from 'lucide-react';

export default function AdminLayout() {
  const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
  const location = useLocation();

  if (!isLoggedIn) return <Navigate to="/admin" />;

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Add News', path: '/admin/add-news', icon: PlusCircle },
    { name: 'Manage', path: '/admin/manage-news', icon: List },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 pb-20 md:pb-0 md:flex">
      {/* Sidebar Desktop */}
      <aside className="hidden md:block w-64 bg-white border-r border-zinc-200 p-6 h-screen sticky top-0">
        <h1 className="text-xl font-bold mb-8 text-zinc-950">The Scribe Admin</h1>
        <nav className="space-y-2">
          {navItems.map(item => (
            <Link key={item.path} to={item.path} className={`flex items-center gap-3 p-3 rounded-lg ${location.pathname === item.path ? 'bg-orange-50 text-orange-600' : 'hover:bg-zinc-100'}`}>
              <item.icon size={20} /> {item.name}
            </Link>
          ))}
          <button onClick={() => { localStorage.removeItem('isAdminLoggedIn'); window.location.href = '/admin'; }} className="flex w-full items-center gap-3 p-3 text-red-500 rounded-lg hover:bg-red-50">
            <LogOut size={20} /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">
        <Outlet />
      </main>

      {/* Bottom Nav Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-200 flex justify-around p-3 z-50">
        {navItems.map(item => (
          <Link key={item.path} to={item.path} className={`flex flex-col items-center gap-1 p-2 ${location.pathname === item.path ? 'text-orange-600' : 'text-zinc-500'}`}>
            <item.icon size={24} /> <span className="text-[10px]">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
