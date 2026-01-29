import React from 'react';
import { Settings, Star, Flame, Trophy, Footprints, Target, Lock, TrendingUp, Zap } from 'lucide-react';
import BottomNav from '../components/BottomNav';

const Profile = ({ user }) => {
    if (!user) {
        return (
            <div style={{ padding: '20px', textAlign: 'center', marginTop: '50px' }}>
                No user data available.
            </div>
        );
    }

    // Helper to safely access data
    const {
        first_name,
        last_name,
        username,
        photoUrl,
        stars = 0,
        streak = 0,
        badges = [],
        goals = []
    } = user;

    const displayName = first_name ? `${first_name} ${last_name || ''}` : (username || 'User');

    return (
        <div style={{
            paddingBottom: '100px',
            backgroundColor: '#f0f4ff',
            minHeight: '100vh',
            fontFamily: 'var(--font-family)'
        }}>
            {/* Header Section */}
            <div style={{
                background: 'linear-gradient(135deg, #c084fc 0%, #6366f1 100%)',
                padding: '20px 20px 40px',
                borderBottomLeftRadius: '30px',
                borderBottomRightRadius: '30px',
                color: 'white',
                textAlign: 'center',
                position: 'relative'
            }}>
                <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
                    <div style={{
                        background: 'rgba(255,255,255,0.2)',
                        padding: '8px',
                        borderRadius: '12px',
                        backdropFilter: 'blur(5px)'
                    }}>
                        <Settings size={20} />
                    </div>
                </div>

                <div style={{ marginTop: '20px', marginBottom: '10px' }}>
                    <img
                        src={photoUrl || "https://api.dicebear.com/7.x/miniavs/svg?seed=0"}
                        alt="Avatar"
                        style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            border: '4px solid rgba(255,255,255,0.3)',
                            backgroundColor: 'white'
                        }}
                    />
                </div>

                <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
                    {displayName}
                </h2>

                {/* Stats Cards */}
                <div style={{
                    display: 'flex',
                    gap: '15px',
                    justifyContent: 'center',
                    maxWidth: '350px',
                    margin: '0 auto'
                }}>
                    <div style={{
                        flex: 1,
                        background: 'rgba(255,255,255,0.2)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '20px',
                        padding: '15px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <Star fill="#facc15" color="#facc15" size={20} />
                            <span style={{ fontSize: '20px', fontWeight: 'bold' }}>{stars}</span>
                        </div>
                        <span style={{ fontSize: '12px', opacity: 0.9 }}>Stars</span>
                    </div>

                    <div style={{
                        flex: 1,
                        background: 'rgba(255,255,255,0.2)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '20px',
                        padding: '15px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <Flame fill="#fb923c" color="#fb923c" size={20} />
                            <span style={{ fontSize: '20px', fontWeight: 'bold' }}>{streak}</span>
                        </div>
                        <span style={{ fontSize: '12px', opacity: 0.9 }}>Day Streak</span>
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <div style={{ padding: '20px' }}>

                {/* Badges Section */}
                <div style={{ marginBottom: '25px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
                        <Trophy color="#eab308" size={24} />
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b' }}>My Badges</h3>
                        <span style={{
                            background: '#facc15',
                            color: 'white',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            padding: '2px 8px',
                            borderRadius: '10px'
                        }}>{badges.length}</span>
                    </div>

                    {badges.length > 0 ? (
                        <div style={{ display: 'flex', gap: '15px', overflowX: 'auto', paddingBottom: '5px' }}>
                            {badges.map((badge, idx) => (
                                <div key={idx} style={{
                                    background: 'white',
                                    borderRadius: '20px',
                                    padding: '15px',
                                    minWidth: '100px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
                                }}>
                                    {/* Badge Icon Logic needed based on badge type, using Star for generic now */}
                                    <Star color="#eab308" fill="#eab308" size={32} style={{ marginBottom: '8px' }} />
                                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#334155', textAlign: 'center' }}>{badge.name || 'Badge'}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ color: '#94a3b8', fontSize: '14px', fontStyle: 'italic' }}>
                            No badges yet. Keep going!
                        </div>
                    )}
                </div>

                {/* Next Goals Section */}
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
                        <Target color="#ef4444" size={24} />
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b' }}>Next Goals</h3>
                    </div>

                    {goals.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {goals.map((goal, idx) => (
                                <div key={idx} style={{
                                    background: 'white',
                                    borderRadius: '20px',
                                    padding: '15px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <div style={{
                                            width: '50px',
                                            height: '50px',
                                            borderRadius: '15px',
                                            background: '#f1f5f9',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <Target color="#64748b" size={24} />
                                        </div>
                                        <div>
                                            <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1e293b' }}>{goal.title}</h4>
                                            <span style={{ fontSize: '12px', color: '#64748b' }}>{goal.subtitle || 'Complete this goal'}</span>
                                        </div>
                                    </div>
                                    <Lock color="#cbd5e1" size={20} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ color: '#94a3b8', fontSize: '14px', fontStyle: 'italic' }}>
                            No active goals.
                        </div>
                    )}
                </div>
            </div>

            <BottomNav />
        </div>
    );
};

export default Profile;
