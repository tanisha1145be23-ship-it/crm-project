import { motion } from "framer-motion";
import {
  FaUsers,
  FaChartLine,
  FaUserCheck,
  FaMoneyBillWave,
} from "react-icons/fa";

function Dashboard() {
  const cards = [
    {
      title: "Total Leads",
      value: "1,248",
      icon: <FaUsers />,
    },
    {
      title: "Conversions",
      value: "312",
      icon: <FaUserCheck />,
    },
    {
      title: "Revenue",
      value: "$24K",
      icon: <FaMoneyBillWave />,
    },
    {
      title: "Growth",
      value: "+18%",
      icon: <FaChartLine />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white p-10">

      <h1 className="text-5xl font-black mb-10">
        CRM Dashboard 
      </h1>

      {/* Cards */}
      <div className="grid md:grid-cols-4 gap-6">

        {cards.map((card, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl"
          >
            <div className="text-4xl mb-4 text-cyan-400">
              {card.icon}
            </div>

            <h2 className="text-gray-400">
              {card.title}
            </h2>

            <p className="text-4xl font-bold mt-2">
              {card.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Fake Analytics */}
      <div className="mt-12 grid md:grid-cols-2 gap-8">

        <div className="bg-white/10 rounded-3xl p-8 backdrop-blur-xl border border-white/10">
          <h2 className="text-2xl font-bold mb-6">
            Lead Performance
          </h2>

          <div className="space-y-4">
            <div>
              <p>Instagram Ads</p>
              <div className="w-full bg-gray-700 rounded-full h-3 mt-2">
                <div className="bg-cyan-400 h-3 rounded-full w-[80%]" />
              </div>
            </div>

            <div>
              <p>SEO Campaign</p>
              <div className="w-full bg-gray-700 rounded-full h-3 mt-2">
                <div className="bg-purple-400 h-3 rounded-full w-[65%]" />
              </div>
            </div>

            <div>
              <p>Email Marketing</p>
              <div className="w-full bg-gray-700 rounded-full h-3 mt-2">
                <div className="bg-pink-400 h-3 rounded-full w-[45%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Leads */}
        <div className="bg-white/10 rounded-3xl p-8 backdrop-blur-xl border border-white/10">
          <h2 className="text-2xl font-bold mb-6">
            Recent Leads
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between bg-black/20 p-4 rounded-2xl">
              <span>Tanisha Sharma</span>
              <span className="text-green-400">
                Converted
              </span>
            </div>

            <div className="flex justify-between bg-black/20 p-4 rounded-2xl">
              <span>Edufo Pvt Ltd</span>
              <span className="text-yellow-400">
                Pending
              </span>
            </div>

            <div className="flex justify-between bg-black/20 p-4 rounded-2xl">
              <span>GrowthLab Agency</span>
              <span className="text-cyan-400">
                New
              </span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;