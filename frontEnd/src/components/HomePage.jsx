import React, { useState } from 'react';
import { Leaf, CheckCircle, Trophy, Recycle, Trash2, Info, Battery, ArrowRight, X, Loader2, Star } from 'lucide-react';

// --- COMPONENTE UI ---

const GlassCard = ({ children, className = "", onClick, darkMode }) => (
  <div 
    onClick={onClick} 
    className={`${darkMode ? 'bg-[#1A2C20]/80 border-white/5 text-white' : 'bg-white border-gray-100 text-gray-800'} 
    backdrop-blur-md border rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md hover:border-[#0df259]/30 cursor-pointer ${className}`}
  >
    {children}
  </div>
);

const PrimaryButton = ({ children, onClick, className = "", icon: Icon, disabled, loading }) => (
  <button 
    onClick={onClick} 
    disabled={disabled || loading}
    className={`bg-[#0df259] text-[#102216] font-bold rounded-xl py-3 px-6 shadow-[0_0_20px_rgba(13,242,89,0.3)] 
    hover:shadow-[0_0_30px_rgba(13,242,89,0.5)] transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] 
    flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
  >
    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (Icon && <Icon className="w-5 h-5" />)}
    {children}
  </button>
);

// --- PAGINA PRINCIPALĂ ---

export default function HomePage({ darkMode, leaderboard = [], currentUser, onUpdateUser }) {
  const API_URL = process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:5000';
  
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [isClaiming, setIsClaiming] = useState(false);

  // Date Ghid Reciclare
  const recyclingInfo = {
    plastic: {
      title: "Plastic și Metal",
      detail: "Reciclează PET-uri, doze de aluminiu și conserve. Este ESENȚIAL să le clătești și să le strivești pentru a economisi spațiu în containere.",
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
      icon: Trash2
    },
    hartie: {
      title: "Hârtie și Carton",
      detail: "Include cutii, ziare și pliante. ATENȚIE: Hârtia murdară de ulei (ex. cutii de pizza) nu se poate recicla și trebuie aruncată la gunoi menajer.",
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      icon: Info
    },
    sticle: {
      title: "Sticlă",
      detail: "Borcane și sticle de orice culoare. Scoate capacele metalice înainte. Nu recicla aici oglinzi, geamuri sparte sau porțelan.",
      color: "text-green-400",
      bg: "bg-green-400/10",
      icon: CheckCircle
    },
    baterii: {
      title: "Deșeuri Speciale",
      detail: "Bateriile și electronicele conțin substanțe toxice. Nu le arunca la gunoi! Folosește punctele speciale din supermarketuri.",
      color: "text-purple-400",
      bg: "bg-purple-400/10",
      icon: Battery
    }
  };

  // Logica Provocare Dinamică
  const challengeGoal = 5;
  const currentReports = currentUser?.report_count || 0;
  const progress = Math.min((currentReports / challengeGoal) * 100, 100);
  const canClaim = currentReports >= challengeGoal && !currentUser?.challenge_completed;

  const handleClaimXP = async () => {
    if (!canClaim) return;
    setIsClaiming(true);
    
    try {
      const response = await fetch(`${API_URL}/api/users/claim-reward`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUser.id, xpAmount: 100 })
      });

      if (response.ok) {
        const data = await response.json();
        onUpdateUser(data.user); // Actualizează XP-ul în tot restul aplicației
        alert("Felicitări! Ai primit 100 XP pentru protejarea mediului!");
      }
    } catch (err) {
      console.error("Eroare la revendicare XP:", err);
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <div className={`flex flex-col animate-in fade-in duration-500 ${darkMode ? 'bg-[#0A120D]' : 'bg-gray-50'}`}>
      
      {/* HERO SECTION */}
      <section className="relative w-full h-[320px] group overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" 
             style={{backgroundImage: "url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')"}}>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
        <div className="relative h-full flex flex-col justify-end p-6 md:p-12 max-w-7xl mx-auto w-full">
            <div className="mb-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0df259]/20 backdrop-blur-sm w-fit border border-[#0df259]/30">
                <Leaf className="text-[#0df259] w-3 h-3 animate-pulse" />
                <span className="text-xs font-bold text-[#0df259] uppercase tracking-wider">Eroul Local: {currentUser?.name || 'Reciclator'}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mt-2 mb-2 tracking-tight">
                România Curată <br />
                <span className="text-[#0df259]">Începe cu Noi!</span>
            </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto w-full px-4 md:px-12 py-8 space-y-10">
        
        {/* DINAMIC CHALLENGE CARD */}
        <div className={`rounded-2xl p-1 shadow-lg border overflow-hidden relative group transition-all ${darkMode ? 'bg-gradient-to-br from-[#1A2C20] to-black border-white/10' : 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-200'}`}>
            <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-transparent relative z-10">
                <div className="flex-1">
                     <div className="flex items-center gap-2 mb-3">
                        <span className="bg-[#0df259] text-black text-xs font-bold px-2 py-0.5 rounded uppercase">Provocare Activă</span>
                        <p className="text-white text-sm font-bold uppercase tracking-wider flex items-center gap-1">
                            <Star className="text-[#0df259] fill-[#0df259] w-4 h-4" /> Recompensă: 100 XP
                        </p>
                     </div>
                    <h3 className="text-white text-2xl font-bold mb-1">Misiune de Curățenie</h3>
                    <p className="text-gray-300 text-sm mb-4">Raportează cel puțin 5 puncte cu deșeuri pentru a finaliza provocarea.</p>
                    <div className="flex items-center gap-3 max-w-md">
                        <div className="flex-1 bg-white/10 rounded-full h-3 overflow-hidden">
                             <div className="bg-[#0df259] h-full rounded-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
                        </div>
                        <span className="text-sm font-bold text-[#0df259]">{currentReports}/{challengeGoal}</span>
                    </div>
                </div>
                <PrimaryButton 
                  onClick={handleClaimXP} 
                  loading={isClaiming}
                  disabled={!canClaim} 
                  className="w-full md:w-auto" 
                  icon={currentReports >= challengeGoal ? CheckCircle : ArrowRight}
                >
                    {currentUser?.challenge_completed ? 'Completat!' : (currentReports >= challengeGoal ? 'Revendică 100 XP' : 'În curs...')}
                </PrimaryButton>
            </div>
        </div>

        {/* LEADERBOARD */}
        <section>
            <div className="flex items-center gap-4 mb-6">
                 <div className="flex items-center gap-2 px-4 py-1 rounded-full border border-[#0df259]/30 bg-[#0df259]/5 shadow-[0_0_15px_rgba(13,242,89,0.1)] text-[#0df259]">
                     <Trophy className="w-5 h-5" />
                     <h3 className="text-lg font-bold uppercase tracking-wider">Top Reciclatori</h3>
                 </div>
                 <div className="h-px bg-gray-700 flex-1 opacity-20"></div>
            </div>
            <div className="flex flex-col gap-3">
                {leaderboard.slice(0, 5).map((user, index) => (
                    <GlassCard key={user.id} darkMode={darkMode} className="p-4 flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${index === 0 ? 'bg-[#0df259] text-black' : 'bg-gray-700 text-white'}`}>
                            {index + 1}
                        </div>
                        <div className="flex-1">
                            <p className="font-bold">{user.name} {user.id === currentUser?.id && "(Tu)"}</p>
                            <p className="text-xs text-gray-500">{user.report_count || 0} rapoarte</p>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-[#0df259]">{user.xp} XP</p>
                        </div>
                    </GlassCard>
                ))}
            </div>
        </section>

        {/* GUIDE SECTION - WITH DETAILS BOX */}
        <section className="space-y-6 pb-10">
            <h3 className="text-xl font-bold flex items-center gap-2">
                <Recycle className="text-[#0df259] w-5 h-5" /> Ghid & Sfaturi
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(recyclingInfo).map(([key, info]) => (
                    <GlassCard 
                        key={key} 
                        darkMode={darkMode} 
                        onClick={() => setSelectedGuide(key)}
                        className={`p-4 flex flex-col items-center gap-2 text-center transition-all ${selectedGuide === key ? 'ring-2 ring-[#0df259]' : ''}`}
                    >
                        <div className={`${info.bg} w-12 h-12 rounded-full flex items-center justify-center`}><info.icon className={`${info.color} w-6 h-6`}/></div>
                        <h4 className="font-bold text-sm">{info.title}</h4>
                    </GlassCard>
                ))}
            </div>

            {selectedGuide && (
                <div className={`p-6 rounded-2xl animate-in slide-in-from-top-2 duration-300 border relative ${darkMode ? 'bg-white/5 border-white/10' : 'bg-gray-100 border-gray-200'}`}>
                    <button onClick={() => setSelectedGuide(null)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X className="w-5 h-5"/></button>
                    <div className="flex items-center gap-3 mb-2">
                        {React.createElement(recyclingInfo[selectedGuide].icon, { className: `w-5 h-5 ${recyclingInfo[selectedGuide].color}` })}
                        <h4 className="font-bold text-lg">{recyclingInfo[selectedGuide].title}</h4>
                    </div>
                    <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{recyclingInfo[selectedGuide].detail}</p>
                </div>
            )}
        </section>
      </div>
    </div>
  );
}