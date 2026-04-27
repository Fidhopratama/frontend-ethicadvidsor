export default function Navbar({ user }) {
  return (
    <div className="bg-white shadow p-4 flex justify-between">
      <h1 className="font-bold">Dashboard</h1>

      <div>
        <span className="mr-3">{user?.name}</span>
      </div>
    </div>
  );
}