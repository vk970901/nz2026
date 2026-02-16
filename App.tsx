import React, { useState, useEffect, useMemo } from 'react';
import { nzItinerary } from './data/nzData';
import { 
  Calendar, MapPin, Clock, Car, Home, Info, CloudSun, Shirt, Plane, 
  Globe, Utensils, Camera, Briefcase, Navigation, Check, 
  AlertCircle, Wallet, Plus, Trash2, Calculator, RefreshCw, ExternalLink, Sparkles,
  ArrowRight, Heart
} from 'lucide-react';
import { TripActivity, BookingStatus } from './types';
import { GoogleGenAI } from "@google/genai";

type TabType = 'itinerary' | 'wallet' | 'packing' | 'reminders';

interface Expense {
  id: string;
  item: string;
  nzd: number;
  twd: number;
  date: string;
}

const Tape: React.FC<{ color?: string }> = ({ color = 'sky' }) => {
  const colorMap: Record<string, string> = {
    sky: 'rgba(56, 189, 248, 0.4)',
    pink: 'rgba(244, 114, 182, 0.4)',
    green: 'rgba(74, 222, 128, 0.4)',
    yellow: 'rgba(251, 191, 36, 0.4)'
  };
  return (
    <div 
      className="absolute top-[-12px] left-1/2 -translate-x-1/2 w-20 h-6 z-20 pointer-events-none"
      style={{ 
        backgroundColor: colorMap[color] || colorMap.sky,
        clipPath: 'polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)',
        transform: 'translateX(-50%) rotate(-2deg)',
        backdropFilter: 'blur(1px)'
      }}
    />
  );
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('itinerary');
  const [activeDayIdx, setActiveDayIdx] = useState(0);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [calcInput, setCalcInput] = useState('');
  const [itemInput, setItemInput] = useState('');
  const [isFetchingWeather, setIsFetchingWeather] = useState(false);
  const [customRate, setCustomRate] = useState(20.5);
  const [aiWeatherInfo, setAiWeatherInfo] = useState<string | null>(null);
  const [searchGrounding, setSearchGrounding] = useState<{ title: string; uri: string }[]>([]);

  const currentDay = nzItinerary.days[activeDayIdx] || nzItinerary.days[0];

  useEffect(() => {
    const saved = localStorage.getItem('nz_expenses_cute_v5');
    if (saved) setExpenses(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('nz_expenses_cute_v5', JSON.stringify(expenses));
  }, [expenses]);

  const handleAddExpense = () => {
    if (!itemInput || !calcInput) return;
    try {
      const sanitized = calcInput.replace(/[^0-9+\-*/().]/g, '');
      const result = new Function(`return (${sanitized})`)();
      const nzd = parseFloat(result);
      if (isNaN(nzd)) throw new Error();
      
      const newExp: Expense = {
        id: Date.now().toString(),
        item: itemInput,
        nzd: Math.round(nzd * 100) / 100,
        twd: Math.round(nzd * customRate),
        date: currentDay.shortDate
      };
      setExpenses([newExp, ...expenses]);
      setCalcInput('');
      setItemInput('');
    } catch (e) {
      alert('輸入內容格式有誤！');
    }
  };

  const removeExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const totalNZD = useMemo(() => expenses.reduce((sum, e) => sum + e.nzd, 0), [expenses]);
  const totalTWD = useMemo(() => expenses.reduce((sum, e) => sum + e.twd, 0), [expenses]);

  const getActivityIcon = (type: TripActivity['type']) => {
    const size = "w-4 h-4";
    switch (type) {
      case 'activity': return <div className="p-2.5 bg-blue-100 rounded-2xl"><Camera className={`${size} text-blue-500`} /></div>;
      case 'restaurant': return <div className="p-2.5 bg-pink-100 rounded-2xl"><Utensils className={`${size} text-pink-500`} /></div>;
      case 'transport': return <div className="p-2.5 bg-emerald-100 rounded-2xl"><Plane className={`${size} text-emerald-500`} /></div>;
      default: return <div className="p-2.5 bg-orange-100 rounded-2xl"><Info className={`${size} text-orange-500`} /></div>;
    }
  };

  const renderBookingBadge = (status?: BookingStatus) => {
    if (!status || status === 'none') {
      return <span className="px-2 py-0.5 bg-slate-100 text-slate-400 text-[8px] font-black rounded-full border border-slate-200">免訂位</span>;
    }
    if (status === 'reserved') {
      return <span className="px-2 py-0.5 bg-emerald-500 text-white text-[8px] font-black rounded-full shadow-sm">已預訂</span>;
    }
    if (status === 'suggested') {
      return <span className="px-2 py-0.5 bg-amber-400 text-white text-[8px] font-black rounded-full shadow-sm">建議預訂</span>;
    }
    return null;
  };

  const fetchRealtimeWeather = async () => {
    setIsFetchingWeather(true);
    setAiWeatherInfo(null);
    setSearchGrounding([]);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `作為紐西蘭旅遊小幫手，請針對 2026年 ${currentDay.location || '南島'} 在 ${currentDay.date} 前後的旅遊建議（包含天氣趨勢、活動適宜度、穿搭進階建議），請用活潑可愛、富有手帳感的語氣撰寫，約 150 字。`,
        config: { tools: [{ googleSearch: {} }] }
      });
      setAiWeatherInfo(response.text);
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks) {
        setSearchGrounding(
          chunks.filter(c => c.web).map(c => ({ title: c.web!.title!, uri: c.web!.uri! }))
        );
      }
    } catch (e) {
      console.error(e);
      setAiWeatherInfo("哎呀，AI 正在休息中，晚點再試試看吧！");
    } finally {
      setIsFetchingWeather(false);
    }
  };

  const renderItinerary = () => (
    <div className="space-y-6 px-4 pb-24 max-w-md mx-auto animate-cute">
      {/* Day Selector */}
      <div className="flex gap-3 overflow-x-auto pb-6 scrollbar-hide -mx-4 px-4 sticky top-[140px] bg-sky-50/80 backdrop-blur-xl z-40 pt-2">
        {nzItinerary.days.map((day, idx) => (
          <button 
            key={idx} 
            onClick={() => { setActiveDayIdx(idx); setAiWeatherInfo(null); setSearchGrounding([]); }}
            className={`flex-shrink-0 w-12 h-16 flex flex-col items-center justify-center rounded-2xl transition-all border-2 ${activeDayIdx === idx ? 'bg-sky-500 border-white text-white shadow-lg -translate-y-1 scale-110' : 'bg-white border-sky-100 text-sky-300 shadow-sm'}`}
          >
            <span className="text-[7px] font-black uppercase opacity-60">Feb</span>
            <span className="text-lg font-black leading-none">{day.shortDate.split('/')[1]}</span>
          </button>
        ))}
      </div>

      {/* Weather Card */}
      <div className="bg-white p-6 rounded-[2.5rem] shadow-xl shadow-sky-200/20 border border-white relative">
        <Tape color="yellow" />
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 shadow-inner">
              <CloudSun className="w-7 h-7" />
            </div>
            <div>
              <p className="text-[8px] font-black uppercase text-sky-400 tracking-widest">Today's Vibe</p>
              <h3 className="text-xl font-black text-slate-800 leading-tight">{currentDay.weatherForecast?.temp || '--'}</h3>
              <p className="text-[10px] font-bold text-slate-400">{currentDay.location}</p>
            </div>
          </div>
          <button 
            onClick={fetchRealtimeWeather} 
            disabled={isFetchingWeather} 
            className={`w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center text-sky-400 active:scale-90 transition-all ${isFetchingWeather ? 'animate-spin' : ''}`}
          >
            <Sparkles className="w-5 h-5" />
          </button>
        </div>
        
        {/* AI Insight Section */}
        {(aiWeatherInfo || isFetchingWeather) && (
          <div className="mb-6 p-5 bg-sky-50/70 border border-white rounded-3xl shadow-inner animate-cute">
            <div className="flex items-center gap-2 mb-3">
              <Heart className="w-3 h-3 text-pink-400 fill-pink-400" />
              <span className="text-[9px] font-black text-sky-500 uppercase">AI 貼心提醒</span>
            </div>
            {isFetchingWeather ? (
              <div className="space-y-2 py-2">
                <div className="h-2.5 bg-sky-100 rounded-full w-4/5 animate-pulse" />
                <div className="h-2.5 bg-sky-100 rounded-full w-2/3 animate-pulse" />
              </div>
            ) : (
              <>
                <p className="text-[11px] font-bold text-slate-600 leading-relaxed whitespace-pre-line mb-4">{aiWeatherInfo}</p>
                {searchGrounding.length > 0 && (
                  <div className="pt-4 border-t border-sky-100 mt-2">
                    <p className="text-[8px] font-black text-sky-400 uppercase mb-3">最新資訊來源</p>
                    <div className="flex flex-wrap gap-2">
                      {searchGrounding.map((link, idx) => (
                        <a key={idx} href={link.uri} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-[9px] font-black text-sky-500 bg-white px-3 py-1.5 rounded-xl border border-sky-100 hover:bg-sky-100 transition-all">
                          <ExternalLink className="w-2.5 h-2.5" /> {link.title}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-sky-50/50 p-4 rounded-3xl border border-white flex flex-col gap-2">
            <div className="flex items-center gap-2"><Shirt className="w-3 h-3 text-sky-400" /><span className="text-[8px] font-black text-sky-400 uppercase">Outfit</span></div>
            <p className="text-[11px] font-bold text-slate-700 leading-snug">{currentDay.outfitSuggestion || '隨意混搭'}</p>
          </div>
          {currentDay.drivingTime && (
            <div className="bg-emerald-50/50 p-4 rounded-3xl border border-white flex flex-col gap-2">
              <div className="flex items-center gap-2"><Car className="w-3 h-3 text-emerald-400" /><span className="text-[8px] font-black text-emerald-400 uppercase">Move</span></div>
              <p className="text-[11px] font-bold text-slate-700 leading-snug">{currentDay.drivingTime}</p>
            </div>
          )}
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="relative pt-4">
        <div className="absolute left-[34px] top-4 bottom-4 w-1 bg-white rounded-full" />
        {currentDay.activities.map((act, idx) => (
          <div key={idx} className="relative mb-8 last:mb-0 flex gap-5 animate-cute" style={{ animationDelay: `${idx * 0.1}s` }}>
            <div className="relative w-14 flex flex-col items-center flex-shrink-0 pt-3">
              <div className="text-sm font-black text-sky-600 mb-2">{act.time}</div>
              <div className="w-5 h-5 rounded-full bg-white border-[4px] border-sky-400 z-10 shadow-md shadow-sky-100" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="bg-white p-5 rounded-[2.2rem] shadow-xl shadow-sky-200/10 border border-white relative active:scale-[0.98] transition-all overflow-hidden">
                {act.duration && (
                  <div className="absolute top-4 right-4 bg-sky-100 text-sky-600 px-3 py-1 rounded-full text-[8px] font-black">{act.duration}</div>
                )}
                
                {act.arrivalNotice && (
                  <div className="mb-4 bg-amber-50 rounded-2xl p-3 border border-amber-100 flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <p className="text-amber-900 text-[10px] font-black leading-tight uppercase tracking-tight">{act.arrivalNotice}</p>
                  </div>
                )}

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-shrink-0">{getActivityIcon(act.type)}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[14px] font-black text-slate-800 leading-tight mb-2 truncate">{act.location}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {renderBookingBadge(act.bookingStatus)}
                      {act.cuisine && <span className="px-2 py-0.5 bg-pink-50 text-pink-500 text-[8px] font-black rounded-full border border-pink-100">{act.cuisine}</span>}
                    </div>
                  </div>
                </div>

                <p className="text-slate-500 font-bold text-[12px] leading-relaxed mb-5">{act.description}</p>
                <div className="flex gap-2">
                  <a href={act.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(act.location)}`} target="_blank" rel="noreferrer" className="flex-1 py-3 bg-sky-500 text-white rounded-2xl text-[11px] font-black text-center flex items-center justify-center gap-2 shadow-lg shadow-sky-200 active:bg-sky-600">
                    <Navigation className="w-3.5 h-3.5" /> 前往導航
                  </a>
                  {act.platform && (
                     <div className="px-4 flex items-center bg-slate-50 rounded-2xl border border-slate-100">
                        <span className="text-[9px] font-black text-slate-400 uppercase">{act.platform}</span>
                     </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Accommodation Sticker */}
      {currentDay.accommodation.name !== "飛機上" && (
        <div className="bg-gradient-to-br from-sky-400 to-blue-500 p-6 rounded-[2.8rem] text-white mt-12 shadow-2xl relative overflow-hidden animate-cute">
          <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          <div className="flex items-center justify-between mb-5 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-white border border-white/20 backdrop-blur-md">
                <Home className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[9px] font-black opacity-60 uppercase tracking-[0.3em]">Accommodation</p>
                <h4 className="text-[16px] font-black leading-tight">{currentDay.accommodation.name}</h4>
              </div>
            </div>
            <a href={currentDay.accommodation.mapUrl} target="_blank" rel="noreferrer" className="w-10 h-10 bg-white text-sky-500 rounded-full flex items-center justify-center shadow-lg active:scale-90"><Navigation className="w-5 h-5" /></a>
          </div>
          <div className="pt-4 border-t border-white/20 relative z-10 flex items-start gap-2">
            <MapPin className="w-3 h-3 mt-1 flex-shrink-0 opacity-70" />
            <p className="text-[11px] font-bold opacity-80 leading-relaxed">{currentDay.accommodation.address}</p>
          </div>
        </div>
      )}
    </div>
  );

  const renderWallet = () => (
    <div className="px-4 space-y-6 animate-cute pb-24 max-w-md mx-auto">
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 rounded-[3rem] text-white shadow-2xl shadow-indigo-200 relative overflow-hidden">
        <Tape color="pink" />
        <div className="relative z-10">
          <p className="text-[11px] font-black uppercase tracking-[0.4em] opacity-60 mb-2">Total Expense</p>
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-4xl font-black">${totalNZD.toLocaleString()}</span>
            <span className="text-lg font-bold opacity-70">NZD</span>
          </div>
          <div className="flex items-center gap-3 pt-6 border-t border-white/10">
            <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-[10px] font-black opacity-60 uppercase">Estimated TWD</p>
              <p className="text-lg font-bold">NT$ {totalTWD.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-7 rounded-[2.5rem] shadow-xl shadow-sky-200/10 border border-white relative">
        <h3 className="text-base font-black text-slate-800 mb-6 flex items-center gap-3">
          <Calculator className="w-5 h-5 text-indigo-500" /> 快速記帳
        </h3>
        <div className="space-y-4">
          <div className="space-y-1.5">
             <label className="text-[9px] font-black text-slate-400 uppercase ml-2 tracking-wider">Item Name</label>
             <input 
                type="text" 
                placeholder="例如: 午餐漢堡" 
                value={itemInput}
                onChange={(e) => setItemInput(e.target.value)}
                className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl text-xs font-bold focus:bg-white focus:border-sky-200 outline-none transition-all shadow-inner"
             />
          </div>
          <div className="space-y-1.5">
             <label className="text-[9px] font-black text-slate-400 uppercase ml-2 tracking-wider">Amount / Formula</label>
             <div className="flex gap-3">
                <input 
                  type="text" 
                  placeholder="算式 15 + 5" 
                  value={calcInput}
                  onChange={(e) => setCalcInput(e.target.value)}
                  className="flex-1 px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl text-xs font-bold focus:bg-white focus:border-sky-200 outline-none transition-all shadow-inner"
                />
                <button onClick={handleAddExpense} className="w-14 h-14 bg-indigo-500 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-100 active:scale-95 transition-all">
                  <Plus className="w-7 h-7" />
                </button>
             </div>
          </div>
          <div className="flex items-center justify-between px-2 pt-2">
            <div className="flex items-center gap-2">
               <span className="text-[10px] font-black text-slate-400 uppercase">Rate: 1 NZD =</span>
               <input 
                  type="number" 
                  value={customRate} 
                  onChange={(e) => setCustomRate(parseFloat(e.target.value) || 0)}
                  className="w-16 px-2 py-1 bg-indigo-50 text-indigo-500 font-black text-[10px] rounded border border-indigo-100 outline-none"
               />
               <span className="text-[10px] font-black text-slate-400 uppercase">TWD</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between px-4">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Recent Expenses</h3>
          <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full">{expenses.length} 筆紀錄</span>
        </div>
        {expenses.map(exp => (
          <div key={exp.id} className="bg-white p-5 rounded-3xl border border-white shadow-sm flex items-center justify-between group animate-cute">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex flex-col items-center justify-center text-slate-400 font-black text-[9px]">
                <span>Feb</span>
                <span className="text-xs">{exp.date.split('/')[1]}</span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-black text-slate-800 truncate">{exp.item}</p>
                <p className="text-[11px] font-bold text-slate-400">約 NT$ {exp.twd.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <span className="text-base font-black text-indigo-600">${exp.nzd}</span>
              <button onClick={() => removeExpense(exp.id)} className="p-2 text-slate-200 hover:text-rose-400 transition-colors">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
        {expenses.length === 0 && (
          <div className="py-16 text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-50">
               <Wallet className="w-7 h-7 text-slate-200" />
            </div>
            <p className="text-[11px] font-black text-slate-300 uppercase tracking-widest">尚無消費紀錄</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pb-32">
      {/* Header Container */}
      <div className="sticky top-0 z-50">
        <header className="bg-white/80 backdrop-blur-2xl border-b border-sky-100 px-4 pt-10 pb-6">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-6 px-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-sky-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-sky-200 transform rotate-[-6deg]">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-xl font-black text-slate-800 tracking-tight">2026 紐西蘭</h1>
                  <p className="text-[8px] font-black text-sky-400 tracking-[0.3em] uppercase leading-none mt-1">Travel Scrapbook</p>
                </div>
              </div>
              <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-sky-400 shadow-sm border border-sky-50">
                <Heart className="w-5 h-5 fill-sky-100" />
              </div>
            </div>
            <nav className="flex bg-slate-50/50 p-1.5 rounded-3xl border border-sky-50 shadow-inner">
              {[ 
                { id: 'itinerary', label: '行程', icon: Calendar }, 
                { id: 'wallet', label: '記帳', icon: Wallet }, 
                { id: 'packing', label: '清單', icon: Briefcase }, 
                { id: 'reminders', label: '筆記', icon: Info } 
              ].map(tab => (
                <button 
                  key={tab.id} 
                  onClick={() => setActiveTab(tab.id as TabType)} 
                  className={`flex-1 py-3 rounded-[1.2rem] text-[11px] font-black transition-all flex items-center justify-center gap-2 ${activeTab === tab.id ? 'bg-white shadow-lg shadow-sky-100 text-sky-500' : 'text-slate-400 hover:text-sky-300'}`}
                >
                  <tab.icon className="w-3.5 h-3.5" /> {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </header>
      </div>

      <main className="max-w-md mx-auto pt-8">
        {activeTab === 'itinerary' && renderItinerary()}
        {activeTab === 'wallet' && renderWallet()}
        {activeTab === 'packing' && (
          <div className="px-5 space-y-6 animate-cute">
            {nzItinerary.packingList.map((cat, i) => (
              <div key={i} className="bg-white p-7 rounded-[2.8rem] border border-white shadow-xl shadow-sky-200/10 relative">
                <Tape color={i % 2 === 0 ? 'sky' : 'pink'} />
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-500 border border-sky-100">
                    <Check className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-black text-slate-800">{cat.category}</h3>
                </div>
                <ul className="space-y-3">
                  {cat.items.map((item, j) => (
                    <li key={j} className="p-4 bg-slate-50/50 rounded-2xl border border-slate-50 text-[12px] font-bold text-slate-600 flex items-center gap-4 group active:bg-sky-50 transition-colors">
                      <div className="w-5 h-5 rounded-lg border-2 border-sky-200 bg-white shadow-inner flex-shrink-0" /> 
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'reminders' && (
          <div className="px-5 space-y-6 animate-cute">
            {nzItinerary.reminders.map((rem, i) => (
              <div key={i} className="bg-white p-8 rounded-[3rem] border border-white shadow-xl shadow-sky-200/10 relative">
                 <Tape color={rem.icon === 'car' ? 'green' : 'yellow'} />
                 <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center shadow-inner border border-white">
                      {rem.icon === 'car' ? <Car className="w-6 h-6 text-emerald-500" /> : <Info className="w-6 h-6 text-orange-500" />}
                    </div>
                    <h3 className="text-lg font-black text-slate-800 tracking-tight">{rem.category}</h3>
                 </div>
                 <ul className="space-y-4">
                    {rem.items.map((item, j) => (
                      <li key={j} className="p-4 bg-sky-50/40 rounded-2xl text-[12px] font-bold text-slate-600 leading-relaxed flex items-start gap-4">
                        <ArrowRight className="w-4 h-4 text-sky-300 mt-1 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                 </ul>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="py-16 text-center">
        <div className="w-10 h-1.5 bg-sky-200 rounded-full mx-auto mb-5" />
        <p className="text-sky-300 text-[10px] font-black uppercase tracking-[0.5em]">Kia Ora New Zealand</p>
        <p className="text-[8px] font-bold text-slate-300 mt-2 uppercase tracking-widest">Est. Feb 2026</p>
      </footer>
    </div>
  );
};

export default App;