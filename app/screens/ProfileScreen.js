import React from 'react';
import { User, Settings, LogOut } from 'lucide-react';

const PRIMARY_BLUE = 'rgb(30, 64, 175)';
const BACKGROUND_LIGHT = '#f8fafc';

const ProfileScreen = () => {
  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: BACKGROUND_LIGHT, fontFamily: 'Inter, sans-serif' }}>
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold" style={{ color: PRIMARY_BLUE }}>My Profile</h1>
        <Settings className="w-6 h-6 text-gray-600" />
      </header>

      <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center mb-6">
        <User className="w-20 h-20 text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-800">John Doe</h2>
        <p className="text-gray-500 text-sm">johndoe@example.com</p>
      </div>

      <div className="space-y-4">
        <button className="w-full bg-blue-50 text-blue-700 font-semibold py-3 rounded-xl flex items-center justify-center shadow hover:bg-blue-100 transition">
          <LogOut className="w-5 h-5 mr-2" /> Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileScreen;
