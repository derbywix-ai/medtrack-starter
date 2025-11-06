import React from 'react';
import { 
  Home, Calendar, Settings, Clock, Pill, 
  TrendingUp, User, Plus, CheckCircle
} from 'lucide-react';

// This is a standalone application component focusing on the Calendar (History) flow.

// --- Configuration & Constants ---

const PRIMARY_BLUE = 'rgb(30, 64, 175)'; 
const ACCENT_BLUE = 'rgb(59, 130, 246)'; 
const BACKGROUND_LIGHT = '#f8fafc'; 
const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// --- Mock Data ---

const MOCK_CALENDAR_DATA = {
    // Days with full or partial adherence
    activeDays: [5, 6, 8, 9, 10, 11, 12, 14, 15, 17, 18, 19, 21, 22, 23, 25, 26, 28, 29, 30],
    selectedDay: 26,
    monthName: "November 2025"
};

const MOCK_DAILY_EVENTS = [
    { time: '8:00 AM', name: 'Lisinopril 10mg', status: 'Taken', taken: true, color: 'text-green-600' },
    { time: '1:00 PM', name: 'Vitamin D', status: 'Taken', taken: true, color: 'text-green-600' },
    { time: '4:00 PM', name: 'Atorvastatin 20mg', status: 'Missed', taken: false, color: 'text-red-500' },
    { time: '9:00 PM', name: 'Melatonin 5mg', status: 'Taken', taken: true, color: 'text-green-600' },
];

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
 * Calendar Grid Component
 */
const CalendarGrid = ({ data, onSelectDay }) => {
    // Mock the days of the month (starting on a Saturday for visual mock)
    const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);
    const leadingEmptyDays = 6; // Start on Sat (0: Sun, 6: Sat)

    return (
        <div className="bg-white p-4 rounded-2xl shadow-lg mt-4">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">{data.monthName}</h2>
                <div className="flex space-x-2 text-gray-500 text-sm">
                    {/* Placeholder for month navigation */}
                    <button className="px-2 py-1 hover:bg-gray-100 rounded-lg">{'<'}</button>
                    <button className="px-2 py-1 hover:bg-gray-100 rounded-lg">{'>'}</button>
                </div>
            </div>

            {/* Weekday Labels */}
            <div className="grid grid-cols-7 text-center text-sm font-semibold text-gray-400 mb-2">
                {DAYS_OF_WEEK.map(day => <div key={day}>{day}</div>)}
            </div>

            {/* Day Grid */}
            <div className="grid grid-cols-7 gap-2">
                {/* Leading empty days */}
                {Array.from({ length: leadingEmptyDays }, (_, i) => <div key={`empty-${i}`} className="h-10"></div>)}
                
                {daysInMonth.map(day => {
                    const isSelected = day === data.selectedDay;
                    const isActive = data.activeDays.includes(day);

                    return (
                        <button
                            key={day}
                            onClick={() => onSelectDay(day)}
                            className={`
                                w-full aspect-square flex flex-col items-center justify-center p-1 rounded-xl transition-all 
                                text-sm font-medium border-2
                                ${isSelected 
                                    ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                                    : 'text-gray-800 bg-white border-transparent hover:bg-gray-100'
                                }
                            `}
                            style={{ position: 'relative' }}
                        >
                            {day}
                            {/* Adherence Dot */}
                            {isActive && !isSelected && (
                                <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-green-500"></span>
                            )}
                            {!isActive && day <= 30 && !isSelected && (
                                <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-red-500"></span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

/**
 * Main Application Component (The focused Calendar Screen)
 */
const App = () => {
    const [activeTab, setActiveTab] = React.useState('Calendar'); 
    const [selectedDay, setSelectedDay] = React.useState(MOCK_CALENDAR_DATA.selectedDay);

    const handleDaySelect = (day) => {
        setSelectedDay(day);
        console.log(`Selected day: ${day}`);
        // In a real app, this would trigger an API call for events on that day
    };

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
                    <h1 className="text-3xl font-extrabold" style={{ color: PRIMARY_BLUE }}>History</h1>
                    <button 
                        className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors active:scale-95"
                        onClick={() => console.log('Settings clicked')}
                    >
                        <Settings className="w-5 h-5 text-gray-600" />
                    </button>
                </header>

                {/* Calendar View */}
                <CalendarGrid 
                    data={{ ...MOCK_CALENDAR_DATA, selectedDay }} 
                    onSelectDay={handleDaySelect} 
                />

                {/* Daily Schedule / Events */}
                <div className="mt-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Schedule for Nov {selectedDay}</h3>
                    
                    <div className="space-y-4">
                        {MOCK_DAILY_EVENTS.map((event, index) => (
                            <div key={index} className="flex items-center bg-white p-4 rounded-2xl shadow-lg transition-shadow hover:shadow-xl">
                                
                                {/* Time */}
                                <div className='w-20 flex-shrink-0 text-center'>
                                    <p className="font-bold text-gray-800 text-lg leading-none">{event.time.split(' ')[0]}</p>
                                    <p className="text-xs text-gray-400">{event.time.split(' ')[1]}</p>
                                </div>
                                
                                {/* Separator */}
                                <div className="mx-4 h-10 w-px bg-gray-200"></div>

                                {/* Details */}
                                <div className='flex-grow'>
                                    <p className="font-semibold text-gray-800">{event.name}</p>
                                    <div className="flex items-center text-sm mt-1">
                                        <Clock className="w-3 h-3 text-gray-500 mr-1" />
                                        <span className="text-gray-500">{event.status}</span>
                                    </div>
                                </div>
                                
                                {/* Status Indicator */}
                                {event.taken ? (
                                    <CheckCircle className="w-7 h-7 text-green-500 flex-shrink-0 ml-3" />
                                ) : (
                                    <Pill className="w-7 h-7 text-red-500 flex-shrink-0 ml-3" />
                                )}
                            </div>
                        ))}

                        {/* Summary of the day */}
                        <div className="bg-blue-100 text-blue-800 p-4 rounded-xl text-sm font-medium mt-6">
                            Overall Adherence on Nov {selectedDay}: 3 out of 4 doses taken.
                        </div>
                    </div>
                </div>

            </div>

            {/* Bottom Navigation */}
            <BottomNavigationBar />
        </div>
    );
};

export default App;