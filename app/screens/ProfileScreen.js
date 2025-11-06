import React from 'react';
import { 
  Home, Calendar, Settings, TrendingUp, User, Plus,
  Bell, Lock, LogOut, Heart, Mail, UserCheck
} from 'lucide-react';

// This is a standalone application component focusing on the User Profile flow.

// --- Configuration & Constants ---

const PRIMARY_BLUE = 'rgb(30, 64, 175)'; 
const ACCENT_BLUE = 'rgb(59, 130, 246)'; 
const BACKGROUND_LIGHT = '#f8fafc'; 

// --- Mock Data ---

const MOCK_USER_DATA = {
    name: "Alex Smith",
    email: "alex.smith@example.com",
    lastLogin: "Today, 10:30 AM",
    condition: "High Blood Pressure",
    medicationsCount: 5
};

// --- Utility Components ---

/**
 * Navigation Item component for the bottom bar.
 */
const NavItem = ({ Icon, label, active, onClick }) => (
    <button 
        className={`flex flex-col items-center p-2 rounded-xl transition-colors ${active ? 'text-blue-600' : 'text-gray-400 hover:text-blue-400'}`}
        onClick={() => {
            onClick(label);
            // Simulate navigation update
        }}
    >
        <Icon className="w-6 h-6" />
        <span className={`text-xs font-semibold mt-1 ${active ? 'text-blue-600' : 'text-gray-500'}`}>{label}</span>
    </button>
);

/**
 * Settings Row Component
 */
const SettingsRow = ({ Icon, title, onClick, color = 'text-gray-800' }) => (
    <button 
        className="w-full flex justify-between items-center bg-white p-4 rounded-xl shadow-sm hover:bg-gray-50 transition-colors active:scale-[0.99]"
        onClick={() => console.log(`${title} clicked`)}
    >
        <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gray-100">
                <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <span className={`font-medium ${color}`}>{title}</span>
        </div>
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
        </svg>
    </button>
);

/**
 * Main Application Component (The focused Profile Screen)
 */
const App = () => {
    const [activeTab, setActiveTab] = React.useState('Profile'); 

    const BottomNavigationBar = () => (
        <div className="fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto bg-white border-t border-gray-100 shadow-2xl rounded-t-3xl py-3 px-6 z-50">
            <div className="flex justify-around items-center h-full">
                <NavItem Icon={Home} label="Home" active={activeTab === 'Home'} onClick={setActiveTab} />
                <NavItem Icon={Calendar} label="Calendar" active={activeTab === 'Calendar'} onClick={setActiveTab} />
                <div className="relative -mt-10">
                    {/* Floating Action Button */}
                    <button 
                        className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-105 transition-transform active:scale-95"
                        style={{ backgroundColor: PRIMARY_BLUE, boxShadow: `0 8px 20px ${PRIMARY_BLUE}50` }}
                        onClick={() => console.log('Add New Item clicked')}
                    >
                        <Plus className="w-7 h-7" />
                    </button>
                </div>
                <NavItem Icon={TrendingUp} label="Stats" active={activeTab === 'Stats'} onClick={setActiveTab} />
                <NavItem Icon={User} label="Profile" active={activeTab === 'Profile'} onClick={setActiveTab} />
            </div>
        </div>
    );

    return (
        <div className="min-h-screen pb-24" style={{ backgroundColor: BACKGROUND_LIGHT, fontFamily: 'Inter, sans-serif' }}>
            <div className="w-full max-w-md mx-auto p-4">
                
                {/* Header */}
                <header className="flex justify-between items-center py-4 px-2">
                    <h1 className="text-3xl font-extrabold" style={{ color: PRIMARY_BLUE }}>My Profile</h1>
                    <button 
                        className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors active:scale-95"
                        onClick={() => console.log('Settings clicked')}
                    >
                        <Settings className="w-5 h-5 text-gray-600" />
                    </button>
                </header>

                {/* User Info Card */}
                <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center mb-8">
                    {/* Placeholder Avatar */}
                    <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-3 border-4 border-blue-500">
                        <User className="w-10 h-10 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">{MOCK_USER_DATA.name}</h2>
                    <p className="text-sm text-gray-500 flex items-center mt-1">
                        <Mail className="w-3 h-3 mr-1" />
                        {MOCK_USER_DATA.email}
                    </p>
                    <div className="mt-4 flex space-x-4">
                        <span className="text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-full font-medium">
                            {MOCK_USER_DATA.condition}
                        </span>
                        <span className="text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-full font-medium">
                            {MOCK_USER_DATA.medicationsCount} Meds Active
                        </span>
                    </div>
                </div>

                {/* Account Settings Section */}
                <h3 className="text-lg font-bold text-gray-800 mb-3">Account</h3>
                <div className="space-y-3">
                    <SettingsRow Icon={UserCheck} title="Edit Personal Details" />
                    <SettingsRow Icon={Lock} title="Change Password" />
                    <SettingsRow Icon={Bell} title="Notification Preferences" />
                </div>

                {/* Health & Support Section */}
                <h3 className="text-lg font-bold text-gray-800 mt-6 mb-3">Support</h3>
                <div className="space-y-3">
                    <SettingsRow Icon={Heart} title="Health Records Integration" />
                    <SettingsRow Icon={Mail} title="Contact Support" />
                </div>

                {/* Logout Button */}
                <div className="mt-8">
                    <SettingsRow 
                        Icon={LogOut} 
                        title="Sign Out" 
                        color="text-red-500" 
                        onClick={() => console.log('Signing out user...')} 
                    />
                </div>

            </div>

            {/* Bottom Navigation */}
            <BottomNavigationBar />
        </div>
    );
};

export default App;