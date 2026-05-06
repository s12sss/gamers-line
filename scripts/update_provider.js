const fs = require('fs');
const path = './src/app/provider/page.tsx';
let content = fs.readFileSync(path, 'utf8');

const oldHeaderUI = `<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <h2 className="font-heading text-xl sm:text-2xl font-bold">主要プロバイダ詳細一覧</h2>
          
          <div className="flex bg-black/60 border border-white/10 rounded-full p-1 w-full sm:w-auto">
            <button 
              onClick={() => setSpeedFilter('all')} 
              className={\`flex-1 sm:flex-none px-5 py-1.5 rounded-full text-[0.75rem] font-bold transition-all \${speedFilter === 'all' ? 'bg-cyan text-black shadow-[0_0_15px_rgba(0,229,255,0.3)]' : 'text-text-muted hover:text-white'}\`}
            >
              すべて
            </button>
            <button 
              onClick={() => setSpeedFilter('10g')} 
              className={\`flex-1 sm:flex-none px-5 py-1.5 rounded-full text-[0.75rem] font-bold transition-all \${speedFilter === '10g' ? 'bg-cyan text-black shadow-[0_0_15px_rgba(0,229,255,0.3)]' : 'text-text-muted hover:text-white'}\`}
            >
              10Gのみ
            </button>
            <button 
              onClick={() => setSpeedFilter('1g')} 
              className={\`flex-1 sm:flex-none px-5 py-1.5 rounded-full text-[0.75rem] font-bold transition-all \${speedFilter === '1g' ? 'bg-cyan text-black shadow-[0_0_15px_rgba(0,229,255,0.3)]' : 'text-text-muted hover:text-white'}\`}
            >
              10G除外
            </button>
          </div>
        </div>`;

const newHeaderUI = `<div className="flex flex-col gap-6">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold">主要プロバイダ詳細一覧</h2>
          
          {/* Tabs */}
          <div className="flex items-end border-b border-white/10 overflow-x-auto no-scrollbar pt-2">
            <button 
              onClick={() => setSpeedFilter('all')} 
              className={\`relative px-6 py-3 font-bold text-sm transition-all whitespace-nowrap \${speedFilter === 'all' ? 'text-cyan bg-cyan/10 rounded-t-lg border-t border-x border-cyan/30' : 'text-text-muted hover:text-white hover:bg-white/5 rounded-t-lg'}\`}
            >
              すべて (総合)
              {speedFilter === 'all' && <div className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-cyan shadow-[0_0_10px_rgba(0,229,255,0.8)]" />}
            </button>
            <button 
              onClick={() => setSpeedFilter('10g')} 
              className={\`relative px-6 py-3 font-bold text-sm transition-all whitespace-nowrap \${speedFilter === '10g' ? 'text-cyan bg-cyan/10 rounded-t-lg border-t border-x border-cyan/30' : 'text-text-muted hover:text-white hover:bg-white/5 rounded-t-lg'}\`}
            >
              10G対応プラン (最強環境)
              {speedFilter === '10g' && <div className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-cyan shadow-[0_0_10px_rgba(0,229,255,0.8)]" />}
            </button>
            <button 
              onClick={() => setSpeedFilter('1g')} 
              className={\`relative px-6 py-3 font-bold text-sm transition-all whitespace-nowrap \${speedFilter === '1g' ? 'text-cyan bg-cyan/10 rounded-t-lg border-t border-x border-cyan/30' : 'text-text-muted hover:text-white hover:bg-white/5 rounded-t-lg'}\`}
            >
              1G・標準プラン (コスパ重視)
              {speedFilter === '1g' && <div className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-cyan shadow-[0_0_10px_rgba(0,229,255,0.8)]" />}
            </button>
          </div>
        </div>`;

if(content.includes(oldHeaderUI)) {
  content = content.replace(oldHeaderUI, newHeaderUI);
  fs.writeFileSync(path, content);
  console.log("provider/page.tsx updated with Tabs!");
} else {
  console.log("Could not find the UI chunk in provider/page.tsx");
}
