import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import LeftMenuBar from "../../Components/Dashboard/LeftMenuBar";
import TopNavigationBar from "../../Components/Dashboard/TopNavigationBar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Sector,
  Cell,
} from "recharts";

function MainPage() {
  const [report, setReport] = useState();

  const data = [
    {
      name: "Applied",
      candidates: report?.appliedSum,
    },
    {
      name: "Rejected",
      candidates: report?.rejectedSum,
    },
    {
      name: "Hired",
      candidates: report?.hiredSum,
    },
  ];

  const educationalStats = [
    { name: "BS", value: report?.countMap.BS },
    { name: "MS", value: report?.countMap.MS },
    { name: "Ph.D", value: report?.countMap[`Ph.D`] },
  ];

  //   const data3 = [
  //     { name: "Attock", value: 10 },
  //     { name: "Islamabad", value: 20 },
  //     { name: "Karachi", value: 15 },
  //     // Add more data for other cities
  //   ];
  var data3;
  if (report) {
    data3 = Object.entries(report?.citiesList)?.map(([name, value]) => ({
      name,
      value,
    }));
  }

  var UniversityLists;
  if (report) {
    UniversityLists = Object.entries(report?.UniversitiesList)?.map(
      ([name, Universities]) => ({
        name,
        Universities,
      })
    );
  }
  var genderRatio;
  if (report) {
    genderRatio = [
      { name: "Male", value: report?.GenderPercentage.Male },
      { name: "Female", value: report?.GenderPercentage.Female },
    ];
  }

  useEffect(() => {
    const getCandidates = async () => {
      const options = {
        url: "http://localhost:8080/report/main",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        data: { id: localStorage.getItem("organization_id") },
      };

      axios(options)
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            setReport(response.data);
          } else {
            // alert("something went wrong , try again");
          }
        })
        .catch((e) => {
          //   alert("something went wrong , try again");
        });
    };

    getCandidates();
  }, [0]);

  const colors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"];
  const genderColors = ["#3B82F6", "#EC4899"];

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="12"
        fontWeight="600"
      >
        {`${educationalStats[index].name}`}
      </text>
    );
  };

  const CustomizedAxisTick = (props) => {
    const { x, y, payload } = props;
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={80}
          y={0}
          dy={6}
          textAnchor="end"
          fontSize={10}
          fill="#64748B"
          fontWeight="500"
          transform="rotate(-25)"
        >
          {payload.value}
        </text>
      </g>
    );
  };

  console.log(report?.citiesList);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <div className="hidden sm:block w-2/12 bg-white h-screen shadow-sm">
        <LeftMenuBar />
      </div>
      <div className="w-full bg-gray-50">
        <div className="sticky top-0 z-10 bg-white shadow-sm">
          <TopNavigationBar title={"Statistics"} />
        </div>

        <div className="p-6 space-y-8">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Analytics</h1>
            <p className="text-gray-600">Overview of your recruitment statistics and insights</p>
          </div>

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            <div className="group">
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 group-hover:border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                    </svg>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Jobs Created</p>
                    <p className="text-xs text-gray-400 mt-1">Till now</p>
                  </div>
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {report?.totallJobsPosted || 0}
                </div>
                <div className="flex items-center text-sm text-green-600">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span>Active positions</span>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 group-hover:border-green-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Applied Candidates</p>
                    <p className="text-xs text-gray-400 mt-1">Total</p>
                  </div>
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {report?.totallApplicants || 0}
                </div>
                <div className="flex items-center text-sm text-blue-600">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Total applicants</span>
                </div>
              </div>
            </div>
          </div>

          {/* Application Status Chart */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Status Overview</h2>
              <p className="text-gray-600">Track the journey of your candidates from application to hiring</p>
            </div>
            
            <div className="flex justify-center">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart
                  data={data}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 20,
                  }}
                  barSize={60}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12, fill: '#64748B' }}
                    axisLine={{ stroke: '#E2E8F0' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: '#64748B' }}
                    axisLine={{ stroke: '#E2E8F0' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: 'none',
                      borderRadius: '8px',
                      color: 'white'
                    }}
                  />
                  <Bar
                    dataKey="candidates"
                    fill="#3B82F6"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Education and Gender Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Educational Qualifications */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Educational Qualifications</h2>
                <p className="text-gray-600">Distribution of candidate qualifications</p>
              </div>
              
              <div className="flex justify-center">
                <PieChart width={350} height={350}>
                  <Pie
                    data={educationalStats}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={120}
                    fill="#3B82F6"
                  >
                    {educationalStats?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: 'none',
                      borderRadius: '8px',
                      color: 'white'
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: '20px' }}
                    iconType="circle"
                  />
                </PieChart>
              </div>
            </div>

            {/* Gender Distribution */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Gender Distribution</h2>
                <p className="text-gray-600">Applicant gender ratio percentage</p>
              </div>
              
              <div className="flex justify-center">
                <PieChart width={350} height={350}>
                  <Pie
                    data={genderRatio}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#3B82F6"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {genderRatio?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={genderColors[index % genderColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: 'none',
                      borderRadius: '8px',
                      color: 'white'
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: '20px' }}
                    iconType="circle"
                  />
                </PieChart>
              </div>
            </div>
          </div>

          {/* Geographic Distribution */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Geographic Distribution</h2>
              <p className="text-gray-600">Cities where our applicants are located</p>
            </div>
            
            <div className="flex justify-center">
              <PieChart width={500} height={400}>
                <Pie
                  data={data3}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={140}
                  fill="#3B82F6"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {data3?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconType="circle"
                />
              </PieChart>
            </div>
          </div>

          {/* University Distribution */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">University Distribution</h2>
              <p className="text-gray-600">Educational institutions our applicants graduated from</p>
            </div>
            
            <div className="overflow-x-auto">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={UniversityLists}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 100,
                  }}
                  barSize={30}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis
                    dataKey="name"
                    tick={<CustomizedAxisTick />}
                    interval={0}
                    height={100}
                    axisLine={{ stroke: '#E2E8F0' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: '#64748B' }}
                    axisLine={{ stroke: '#E2E8F0' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: 'none',
                      borderRadius: '8px',
                      color: 'white'
                    }}
                  />
                  <Bar
                    dataKey="Universities"
                    fill="#3B82F6"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;