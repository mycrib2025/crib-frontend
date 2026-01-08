export default function Notifications() {
  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold">Notifications</h1>
      <p>Coming soon 👀</p>
      <Link
  to="/follow-requests"
  className="block p-3 rounded-lg bg-white/10 hover:bg-white/20">
  You have new follow requests
      </Link>
    </div>
  );
}