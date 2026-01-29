import React from 'react';
import { Home, Dumbbell, Heart, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { icon: Home, label: 'Home', path: '/home' },
        { icon: Dumbbell, label: 'Workouts', path: '/workouts' },
        { icon: Heart, label: 'Wishlist', path: '/wishlist' },
        { icon: User, label: 'Profile', path: '/profile' },
    ];

    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'white',
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px',
            padding: '10px 20px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 -2px 10px rgba(0,0,0,0.05)',
            zIndex: 100
        }}>
            {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                    <div
                        key={item.label}
                        onClick={() => navigate(item.path)}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            cursor: 'pointer',
                            color: isActive ? '#a855f7' : '#94a3b8',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <div style={{
                            backgroundColor: isActive ? '#f3e8ff' : 'transparent',
                            padding: '8px 20px',
                            borderRadius: '20px',
                            marginBottom: '4px'
                        }}>
                            <item.icon size={24} />
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: 500 }}>{item.label}</span>
                    </div>
                );
            })}
        </div>
    );
};

export default BottomNav;
