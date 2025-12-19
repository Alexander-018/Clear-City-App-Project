import React, { useState } from 'react';
import { Leaf, CheckCircle, Trophy, Recycle, Trash2, Info, Battery, ArrowRight, X } from 'lucide-react';

// --- COMPONENTE UI REUTIIZABILE ---

const GlassCard = ({ children, className = "", onClick, darkMode }) => (
  <div 
    onClick={onClick} 
    className={`
      ${darkMode ? 'bg-[#1A2C20]/80 border-white/5 text-white' : 'bg-white border-gray-100 text-gray-800'} 
      backdrop-blur-md border rounded-2xl shadow-sm transition-all duration-300 
      hover:shadow-md hover:border-[#0df259]/30 cursor-pointer ${className}
    `}
  >
    {children}
  </div>
);

const PrimaryButton = ({ children, onClick, className = "", icon: Icon }) => (
  <button 
    onClick={onClick} 
    className={`
      bg-[#0df259] text-[#102216] font-bold rounded-xl py-3 px-6 
      shadow-[0_0_20px_rgba(13,242,89,0.3)] hover:shadow-[0_0_30px_rgba(13,242,89,0.5)] 
      transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] 
      flex items-center justify-center gap-2 ${className}
    `}
  >
    {Icon && <Icon className="w-5 h-5" />}
    {children}
  </button>
);

// --- PAGINA PRINCIPALĂ ---

export default function HomePage({ darkMode, leaderboard = [] }) {
  const API_URL = process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:5000';
  
  // State pentru gestionarea detaliilor de reciclare
  const [selectedGuide, setSelectedGuide] = useState(null);

  // Datele pentru secțiunea de ghid
  const recyclingInfo = {
    plastic: {
      title: "Plastic și Metal",
      desc: "PET-uri, doze aluminiu, conserve",
      detail: "Asigură-te că recipientele sunt golite și clătite. Strivește-le pentru a ocupa mai puțin spațiu. Nu include plastic murdar de grăsime sau ambalaje metalice de vopsea.",
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
      borderColor: "border-yellow-400",
      icon: Trash2
    },
    hartie: {
      title: "Hârtie și Carton",
      desc: "Cutii, ziare, pliante",
      detail: "Reciclează doar hârtia uscată și curată. Cutiile de pizza cu pete de ulei trebuie aruncate la gunoiul menajer, deoarece grăsimea compromite procesul de reciclare.",
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      borderColor: "border-blue-400",
      icon: Info
    },
    sticle: {
      title: "Sticlă",
      desc: "Borcane și ambalaje de sticlă",
      detail: "Include doar ambalaje de sticlă (sticle de băuturi, borcane). Scoate capacele metalice. Nu arunca aici geamuri, oglinzi sau veselă din ceramică/porțelan.",
      color: "text-green-400",
      bg: "bg-green-400/10",
      borderColor: "border-green-400",
      icon: CheckCircle
    },
    baterii: {
      title: "Deșeuri Speciale",
      desc: "Baterii, becuri, electronice",
      detail: "Acestea conțin substanțe periculoase. Nu le arunca la gunoiul comun! Folosește punctele de colectare din supermarketuri sau centrele specializate de colectare DEEE.",
      color: "text-purple-400",
      bg: "bg-purple-400/10",
      borderColor: "border-purple-400",
      icon: Battery
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
                <span className="text-xs font-bold text-[#0df259] uppercase tracking-wider">Misiune Națională</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mt-2 mb-2 tracking-tight">
                România Curată <br />
                <span className="text-[#0df259]">Începe cu Noi!</span>
            </h1>
            <p className="text-gray-200 text-sm md:text-base font-medium max-w-xl opacity-90">
                O țară mai curată nu e doar un vis, e o responsabilitate comună. Raportează problemele, fii eroul orașului tău și inspiră schimbarea.
            </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto w-full px-4 md:px-12 py-8 space-y-10">
        
        {/* CHALLENGE CARD */}
        <div className={`rounded-2xl p-1 shadow-lg border overflow-hidden relative group transform transition-all hover:scale-[1.01] ${darkMode ? 'bg-gradient-to-br from-[#1A2C20] to-black border-white/10' : 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-200'}`}>
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#0df259]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:bg-[#0df259]/20 transition-all"></div>
            <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-transparent relative z-10">
                <div className="flex-1">
                     <div className="flex items-center gap-2 mb-3">
                        <span className="bg-[#0df259] text-black text-xs font-bold px-2 py-0.5 rounded uppercase">Activ Acum</span>
                        <p className="text-white text-sm font-bold uppercase tracking-wider flex items-center gap-1">
                            <CheckCircle className="text-[#0df259] w-4 h-4" /> Provocarea Săptămânii
                        </p>
                     </div>
                    <h3 className="text-white text-2xl font-bold mb-2">Reciclează 5 obiecte de plastic</h3>
                    <p className="text-gray-300 text-sm mb-4">Ajută la reducerea poluării în parcurile din România. Fă o poză la punctul de colectare.</p>
                    <div className="flex items-center gap-3 max-w-md">
                        <div className="flex-1 bg-white/10 rounded-full h-3 overflow-hidden">
                             <div className="bg-[#0df259] h-full rounded-full transition-all duration-1000" style={{ width: '40%' }}></div>
                        </div>
                        <span className="text-sm font-bold text-[#0df259]">2/5</span>
                    </div>
                </div>
                <PrimaryButton className="w-full md:w-auto shrink-0" icon={ArrowRight}>Acceptă Provocarea</PrimaryButton>
            </div>
        </div>

        {/* LEADERBOARD SECTION */}
        <section className="relative pt-4">
             <div className="flex items-center gap-4 mb-6">
                 <div className="h-px bg-gray-700 flex-1 opacity-20"></div>
                  <div className="flex items-center gap-2 px-4 py-1 rounded-full border border-[#0df259]/30 bg-[#0df259]/5 shadow-[0_0_15px_rgba(13,242,89,0.1)]">
                     <Trophy className="text-[#0df259] w-5 h-5" />
                     <h3 className="text-lg font-bold text-[#0df259] uppercase tracking-wider">Top Reciclatori</h3>
                  </div>
                 <div className="h-px bg-gray-700 flex-1 opacity-20"></div>
             </div>
             
              <div className="flex flex-col gap-3">
                  {leaderboard.length === 0 ? (
                    <GlassCard darkMode={darkMode} className="p-6 text-center">
                      <p className="text-gray-500">Se încarcă leaderboard-ul...</p>
                    </GlassCard>
                  ) : (
                    leaderboard.slice(0, 5).map((user, index) => (
                      <GlassCard 
                        key={user.id} 
                        darkMode={darkMode} 
                        className={`p-4 flex items-center gap-4 relative overflow-hidden group hover:bg-[#0df259]/5 ${index === 0 ? 'border-[#0df259]/30' : ''}`}
                      >
                        {index === 0 && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0df259]"></div>}
                        
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm shrink-0 ${
                          index === 0 ? 'bg-[#0df259] text-[#102216] shadow-lg shadow-[#0df259]/20' :
                          index === 1 ? 'bg-gray-400 text-white' :
                          index === 2 ? 'bg-orange-600 text-white' :
                          'bg-gray-700 text-white'
                        }`}>
                          {index + 1}
                        </div>
                        
                        <div 
                          className={`w-10 h-10 rounded-full bg-gray-500 bg-cover ${index === 0 ? 'ring-2 ring-[#0df259]/30' : ''}`}
                          style={{
                            backgroundImage: user.profile_image 
                              ? (user.profile_image.startsWith('http') ? `url('${user.profile_image}')` : `url('${API_URL}${user.profile_image}')`)
                              : `url('https://i.pravatar.cc/150?u=${user.id}')`
                          }}
                        ></div>
                        
                        <div className="flex-1">
                          <p className="font-bold text-base">{user.name}</p>
                          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Nivel {user.level} • {user.report_count || 0} rapoarte
                          </p>
                        </div>
                        
                        <div className="text-right">
                          <p className={`font-bold ${index === 0 ? 'text-[#0df259]' : (darkMode ? 'text-gray-200' : 'text-gray-700')}`}>
                            {user.xp.toLocaleString()}
                          </p>
                          <p className="text-[10px] uppercase font-bold text-gray-500">pct</p>
                        </div>
                      </GlassCard>
                    ))
                  )}
              </div>
        </section>

        {/* GUIDES SECTION - UPDATED */}
        <section className="space-y-6 pb-12">
            <div className="flex items-center justify-between px-1">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Recycle className="text-[#0df259] w-5 h-5" /> Ghid & Sfaturi Colectare
                  </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(recyclingInfo).map(([key, info]) => {
                  const Icon = info.icon;
                  const isActive = selectedGuide === key;
                  return (
                    <GlassCard 
                      key={key}
                      darkMode={darkMode} 
                      onClick={() => setSelectedGuide(isActive ? null : key)}
                      className={`p-4 flex flex-col items-center gap-2 text-center group cursor-pointer border-2 transition-all ${isActive ? `${info.borderColor} ${darkMode ? 'bg-white/5' : 'bg-gray-50'}` : 'border-transparent'}`}
                    >
                        <div className={`${info.bg} w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <Icon className={`${info.color} w-6 h-6`}/>
                        </div>
                        <h4 className="font-bold text-sm">{info.title}</h4>
                        <p className={`text-[10px] ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{info.desc}</p>
                    </GlassCard>
                  );
                })}
            </div>

            {/* DETAILS TEXT BOX */}
            {selectedGuide && (
              <div className={`mt-6 p-6 rounded-2xl animate-in slide-in-from-top-4 fade-in duration-300 border relative ${darkMode ? 'bg-[#1A2C20]/40 border-[#0df259]/20' : 'bg-[#0df259]/5 border-[#0df259]/20'}`}>
                <button 
                  onClick={() => setSelectedGuide(null)}
                  className={`absolute top-4 right-4 p-1 rounded-full hover:bg-black/10 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="flex items-center gap-4 mb-3">
                  <div className={`${recyclingInfo[selectedGuide].bg} p-2 rounded-lg`}>
                    {React.createElement(recyclingInfo[selectedGuide].icon, { className: `w-5 h-5 ${recyclingInfo[selectedGuide].color}` })}
                  </div>
                  <h4 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Detalii: {recyclingInfo[selectedGuide].title}
                  </h4>
                </div>
                
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {recyclingInfo[selectedGuide].detail}
                </p>
              </div>
            )}
        </section>
      </div>
    </div>
  );
}