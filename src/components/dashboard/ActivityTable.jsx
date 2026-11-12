
const activities = [
  {
    id: 1,
    wallet: "0x82a...91bf",
    type: "Token Transfer",
    amount: "2.45 ETH",
    risk: "Low",
    status: "Safe",
    time: "2 min ago",
  },
  {
    id: 2,
    wallet: "0x41c...72de",
    type: "Contract Interaction",
    amount: "0.85 ETH",
    risk: "High",
    status: "Blocked",
    time: "15 min ago",
  },
  {
    id: 3,
    wallet: "0x93d...18ac",
    type: "Token Approval",
    amount: "120 USDT",
    risk: "Medium",
    status: "Review",
    time: "32 min ago",
  },
  {
    id: 4,
    wallet: "0x27b...45ef",
    type: "Token Transfer",
    amount: "0.5 ETH",
    risk: "Low",
    status: "Safe",
    time: "1 hour ago",
  },
];

export default function ActivityTable() {
  return (
    <div className="mt-8 bg-[#111827] border border-gray-800 rounded-xl p-6">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-white">
          Recent Security Activity
        </h2>

        <button className="text-blue-400 text-sm hover:text-blue-300">
          View all
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[650px]">

          <thead>
            <tr className="text-gray-500 text-sm border-b border-gray-800">
              <th className="py-4">Wallet</th>
              <th>Activity</th>
              <th>Amount</th>
              <th>Risk</th>
              <th>Status</th>
              <th>Time</th>
            </tr>
          </thead>

          <tbody>
            {activities.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-800 text-sm"
              >
                <td className="py-5 text-white">{item.wallet}</td>

                <td className="text-gray-300">{item.type}</td>

                <td className="text-gray-300">{item.amount}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      item.risk === "Low"
                        ? "bg-green-500/10 text-green-400"
                        : item.risk === "Medium"
                        ? "bg-yellow-500/10 text-yellow-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {item.risk}
                  </span>
                </td>

                <td className="text-gray-300">{item.status}</td>

                <td className="text-gray-500">{item.time}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
