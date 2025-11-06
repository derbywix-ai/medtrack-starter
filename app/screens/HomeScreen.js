import React from 'react';
import { User, Calendar, Pill, TrendingUp, Settings } from 'lucide-react';

const PRIMARY_BLUE = 'rgb(30, 64, 175)';
const BACKGROUND_LIGHT = '#f8fafc';

const HomeScreen = () => {
  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: BACKGROUND_LIGHT, fontFamily: 'Inter, sans-serif' }}>
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold" style={{ color: PRIMARY_BLUE }}>Welcome Back!</h1>
        <Settings className="w-6 h-6 text-gray-600" />
      </header>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center">
          <Pill className="w-10 h-10 text-blue-500 mb-3" />
          <p className="font-semibold text-gray-700">My Medications</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center">
          <Calendar className="w-10 h-10 text-blue-500 mb-3" />
          <p className="font-semibold text-gray-700">History</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center">
          <TrendingUp className="w-10 h-10 text-blue-500 mb-3" />
          <p className="font-semibold text-gray-700">Stats</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center">
          <User className="w-10 h-10 text-blue-500 mb-3" />
          <p className="font-semibold text-gray-700">Profile</p>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
