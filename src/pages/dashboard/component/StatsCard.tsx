interface StatsCardProps {
  title: string;
  value: number;
  icon: string;
}

const StatsCard = ({ title, value, icon }: StatsCardProps) => {
  return (
    <div className=" rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
          <span className="text-xl">{icon}</span>
        </div>
        <div>
          <h3 className="text-sm font-medium ">{title}</h3>
          <p className="text-2xl font-semibold ">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
