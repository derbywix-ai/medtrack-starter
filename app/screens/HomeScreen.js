import React from 'react';
import { 
  Home, Calendar, Clock, Settings,
  Activity, Pill, Heart, Plus, TrendingUp, User
} from 'lucide-react';

const PRIMARY_BLUE = 'rgb(30, 64, 175)'; // Darker blue
const ACCENT_BLUE = 'rgb(59, 130, 246)'; // Lighter blue
const BACKGROUND_LIGHT = '#f8fafc'; // Gray-50


const NavItem = ({ Icon, label, active, onClick }) => (
    <button 
        className={`flex flex-col items-center p-2 rounded-xl transition-colors ${active ? 'text-blue-600' : 'text-gray-400 hover:text-blue-400'}`}
        onClick={() => {
            onClick(label);
            console.log(`Navigation clicked: ${label}`);
        }}
    >
        <Icon className="w-6 h-6" />
        <span className={`text-xs font-semibold mt-1 ${active ? 'text-blue-600' : 'text-gray-500'}`}>{label}</span>
    </button>
);


const ProgressRing = ({ progress }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className="relative w-28 h-28 mx-auto flex-shrink-0">
            <svg className="w-full h-full transform -rotate-90">
                {/* Background circle */}
                <circle 
                    cx="50%" cy="50%" r={radius} strokeWidth="10" fill="transparent" 
                    className="text-gray-200" stroke="currentColor" 
                />
                {/* Progress circle */}
                <circle
                    cx="50%" cy="50%" r={radius} strokeWidth="10" fill="transparent"
                    stroke={ACCENT_BLUE} strokeDasharray={circumference}
                    strokeDashoffset={offset} strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
                />
            </svg>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <div className="text-center">
                    <p className="text-xl font-extrabold" style={{ color: PRIMARY_BLUE }}>{progress}%</p>
                    <p className="text-xs text-gray-500">Adherence</p>
                </div>
            </div>
        </div>
    );
};

const MOCK_DATA = {
    userName: "Jane Doe",
    progress: 78, 
    activityCards: [
        { icon: Pill, title: "Meds Today", count: '5/6', color: 'bg-blue-600', shadow: 'shadow-blue-500/50', key: 'meds' },
        { icon: Clock, title: "Next Dose", count: '4:00 PM', color: 'bg-indigo-600', shadow: 'shadow-indigo-500/50', key: 'dose' },
        { icon: Activity, title: "Activity", count: '3.1 Kcal', color: 'bg-teal-600', shadow: 'shadow-teal-500/50', key: 'activity' },
        { icon: Heart, title: "Blood Pres.", count: '120/80', color: 'bg-rose-600', shadow: 'shadow-rose-500/50', key: 'bp' },
    ],
    
};


const App = () => {
    const [activeTab, setActiveTab] = React.useState('Home'); 

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
        // The pb-24 class ensures content above the fixed bottom navigation bar is visible
        <div className="min-h-screen pb-24" style={{ backgroundColor: BACKGROUND_LIGHT, fontFamily: 'Inter, sans-serif' }}>
            <div className="w-full max-w-md mx-auto">
                
                {/* Header Section (The Blue Bar) */}
                <div 
                    className="w-full h-48 pt-10 px-6 text-white flex justify-between items-start rounded-b-3xl"
                    style={{ backgroundColor: PRIMARY_BLUE, boxShadow: '0 4px 15px rgba(30, 64, 175, 0.4)' }}
                >
                    <div>
                        <p className="text-sm opacity-80">Welcome back,</p>
                        <h2 className="text-2xl font-bold">{MOCK_DATA.userName}</h2>
                    </div>
                    <button 
                        className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors active:scale-95"
                        onClick={() => console.log('Settings clicked')}
                    >
                        <Settings className="w-5 h-5" />
                    </button>
                </div>

                {/* Progress Card (Overlapping the Blue Bar) */}
                <div className="relative -mt-16 px-4">
                    <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col sm:flex-row items-center justify-around">
                        <ProgressRing progress={MOCK_DATA.progress} />
                        <div className="text-center sm:text-left mt-4 sm:mt-0 sm:ml-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-2">Today's Goal</h3>
                            <p className="text-sm text-gray-500">You've completed 
                                <span className='font-bold' style={{ color: PRIMARY_BLUE }}> {MOCK_DATA.progress}%</span> of your adherence tasks.
                            </p>
                            <button 
                                className="text-sm font-semibold mt-3 py-1.5 px-4 rounded-full text-white active:scale-95 transition-transform"
                                style={{ backgroundColor: ACCENT_BLUE }}
                                onClick={() => console.log('View Plan clicked')}
                            >
                                View Detailed Plan
                            </button>
                        </div>
                    </div>
                </div>

                {/* Quick Actions Grid */}
                <div className="p-4 pt-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {MOCK_DATA.activityCards.map((card) => (
                            <button
                                key={card.key}
                                className={`rounded-2xl p-4 text-white shadow-xl transform transition-transform hover:scale-[1.03] active:scale-[0.98] text-left`}
                                style={{ backgroundColor: card.color }}
                                onClick={() => console.log(`${card.title} card clicked`)}
                            >
                                <card.icon className="w-7 h-7 mb-3" />
                                <p className="text-sm opacity-80">{card.title}</p>
                                <p className="text-2xl font-extrabold mt-1">{card.count}</p>
                            </button>
                        ))}
                    </div>
                </div>
                
                
            </div>

            {/* Bottom Navigation */}
            <BottomNavigationBar />
        </div>
    );
};

export default App;