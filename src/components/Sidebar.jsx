import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-100 p-4">
      <nav className="flex flex-col gap-3">
        <Link to="/" className="hover:text-blue-600">
          Feed
        </Link>
        <Link to="/profile" className="hover:text-blue-600">
          Profile
        </Link>
        <Link to="/notifications" className="hover:text-blue-600">
          Notifications
        </Link>
        <Link to="/messages" className="hover:text-blue-600">
          Messages
        </Link>
        <Link to="/follow-requests" className="sidebar-link">
          Follow Requests
        </Link>
      </nav>
    </aside>
  );
}