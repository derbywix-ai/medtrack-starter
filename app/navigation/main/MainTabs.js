import React from 'react';
import { View } from 'react-native';
import { Home, Calendar, TrendingUp, User, Plus } from 'lucide-react';

// Import your screens
import HomeScreen from './HomeScreen';
import CalendarScreen from './CalendarScreen';
import StatsScreen from './StatsScreen';
import ProfileScreen from './ProfileScreen';

const PRIMARY_BLUE = 'rgb(30, 64, 175)';

const NavItem = ({ Icon, label, active, onPress }) => (
  <button
    className={`flex flex-col items-center p-2 rounded-xl transition-colors ${active ? 'text-blue-600' : 'text-gray-400 hover:text-blue-400'}`}
    onClick={onPress}
  >
    <Icon className="w-6 h-6" />
    <span className={`text-xs font-semibold mt-1 ${active ? 'text-blue-600' : 'text-gray-500'}`}>{label}</span>
  </button>
);

const MainTabs = () => {
  const [activeTab, setActiveTab] = React.useState('Home');

  const renderScreen = () => {
    switch (activeTab) {
      case 'Home':
        return <HomeScreen />;
      case 'Calendar':
        return <CalendarScreen />;
      case 'Stats':
        return <StatsScreen />;
      case 'Profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-screen pb-24">
      {renderScreen()}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto bg-white border-t border-gray-100 shadow-2xl rounded-t-3xl py-3 px-6 z-50 flex justify-around items-center">
        <NavItem Icon={Home} label="Home" active={activeTab === 'Home'} onPress={() => setActiveTab('Home')} />
        <NavItem Icon={Calendar} label="Calendar" active={activeTab === 'Calendar'} onPress={() => setActiveTab('Calendar')} />

        {/* Floating Action Button */}
        <div className="relative -mt-10">
          <button
            className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-105 transition-transform active:scale-95"
            style={{ backgroundColor: PRIMARY_BLUE, boxShadow: `0 8px 20px ${PRIMARY_BLUE}50` }}
            onClick={() => console.log('Add New Item clicked')}
          >
            <Plus className="w-7 h-7" />
          </button>
        </div>

        <NavItem Icon={TrendingUp} label="Stats" active={activeTab === 'Stats'} onPress={() => setActiveTab('Stats')} />
        <NavItem Icon={User} label="Profile" active={activeTab === 'Profile'} onPress={() => setActiveTab('Profile')} />
      </div>
    </div>
  );
};

export default MainTabs;
