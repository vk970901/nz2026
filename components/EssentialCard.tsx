
import React from 'react';
import { Info } from 'lucide-react';

interface Props {
  info: any;
}

const EssentialCard: React.FC<Props> = ({ info }) => {
  return (
    <div className="bg-white rounded-[3rem] shadow-xl shadow-sky-100/50 border border-sky-50 p-8">
      <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-sky-100">
            <Info className="w-5 h-5" />
        </div>
        行前懶人包
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-5 bg-sky-50 rounded-[1.8rem] border border-sky-50">
          <p className="text-[10px] uppercase tracking-wider text-sky-400 font-black mb-1">通用貨幣</p>
          <p className="text-sm font-bold text-slate-700">{info.currency}</p>
        </div>
        <div className="p-5 bg-sky-50 rounded-[1.8rem] border border-sky-50">
          <p className="text-[10px] uppercase tracking-wider text-sky-400 font-black mb-1">季節天氣</p>
          <p className="text-sm font-bold text-slate-700">{info.weather}</p>
        </div>
        <div className="p-5 bg-sky-50 rounded-[1.8rem] border border-sky-50">
          <p className="text-[10px] uppercase tracking-wider text-sky-400 font-black mb-1">電壓規格</p>
          <p className="text-sm font-bold text-slate-700">{info.voltage}</p>
        </div>
        <div className="p-5 bg-sky-50 rounded-[1.8rem] border border-sky-50">
          <p className="text-[10px] uppercase tracking-wider text-sky-400 font-black mb-1">駕駛規則</p>
          <p className="text-sm font-bold text-slate-700">{info.drivingSide}</p>
        </div>
      </div>
    </div>
  );
};

export default EssentialCard;
