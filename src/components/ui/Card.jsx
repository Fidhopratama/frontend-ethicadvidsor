export default function Card({ title, value, color }) {
  return (
    <div className={`p-5 rounded-xl shadow text-white ${color}`}>
      <p className="text-sm opacity-80">{title}</p>
      <h2 className="text-2xl font-bold mt-2">{value}</h2>
    </div>
  );
}