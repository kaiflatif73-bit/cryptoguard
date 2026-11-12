
export default function StatCard({ title, value, change, icon: Icon }) {
  return (
    <div className="bg-[#111827] border border-gray-800 rounded-xl p-6">

      <div className="flex justify-between items-center">
        <p className="text-gray-400 text-sm">{title}</p>

        <Icon size={22} className="text-blue-400" />
      </div>

      <h2 className="text-3xl font-bold text-white mt-5">
        {value}
      </h2>

      <p className="text-green-400 text-sm mt-2">
        {change}
      </p>

    </div>
  );
}
