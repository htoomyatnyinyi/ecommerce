import React from "react";

const CategoryDistributionChart: React.FC = () => {
  return <div>CategoryDistributionChart</div>;
};

export default CategoryDistributionChart;

// // Install react-chartjs-2
// import { Pie } from "react-chartjs-2";

// const CategoryDistributionChart = ({ categories }) => {
//   const data = {
//     labels: categories.map((c) => c.name),
//     datasets: [
//       {
//         data: categories.map((c) => c.productCount), // You'll need to add this to your API
//         backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
//       },
//     ],
//   };

//   return <Pie data={data} />;
// };
