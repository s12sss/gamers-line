const fs = require('fs');
const path = './src/app/compare/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// Replace state
content = content.replace(
  /const \[filter, setFilter\] = useState<[^>]+>\('ALL'\);\s*const \[speedFilter, setSpeedFilter\] = useState<'all' \| '10g' \| '1g'>\('all'\);/,
  `const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  const toggleFilter = (key: string) => {
    setActiveFilters(prev => 
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };`
);

// Replace filter logic
const oldFilterLogic = `  let compareIsps = ispsData.filter(isp => {
    // 10G/1G filter
    if (speedFilter === '10g' && isp.max_speed_gbps < 10) return false;
    if (speedFilter === '1g' && isp.max_speed_gbps >= 10) return false;
    
    // Existing category filter
    if (filter === 'ALL') return true;
    if (filter === '10G') return isp.max_speed_gbps >= 10;
    if (filter === 'VDSL') return isp.vdsl_support;
    if (filter === 'AU') return isp.mobile_discount.includes('au');
    if (filter === 'DOC') return isp.mobile_discount.includes('docomo');
    if (filter === 'SB') return isp.mobile_discount.includes('softbank');
    return true;
  });`;

const newFilterLogic = `  let compareIsps = ispsData.filter(isp => {
    // Speed Filter
    if (activeFilters.includes('10G') && isp.max_speed_gbps < 10) return false;
    if (activeFilters.includes('1G') && isp.max_speed_gbps >= 10) return false;
    
    // Features
    if (activeFilters.includes('VDSL') && !isp.vdsl_support) return false;
    if (activeFilters.includes('au') && !isp.mobile_discount.includes('au')) return false;
    if (activeFilters.includes('docomo') && !isp.mobile_discount.includes('docomo')) return false;
    if (activeFilters.includes('softbank') && !isp.mobile_discount.includes('softbank')) return false;
    
    // Regions
    const selectedRegions = activeFilters.filter(f => ['hokkaido', 'tohoku', 'kanto', 'tokai', 'kansai', 'chugoku', 'shikoku', 'kyushu'].includes(f));
    if (selectedRegions.length > 0) {
      const supportsSelectedRegion = selectedRegions.some(r => isp.regions.includes(r));
      if (!supportsSelectedRegion) return false;
    }
    
    return true;
  });`;

content = content.replace(oldFilterLogic, newFilterLogic);

// Replace UI
const oldUI = `<div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex flex-wrap gap-2 flex-1">
              <button onClick={() => setFilter('ALL')} className={\`px-4 py-2 rounded-full text-[0.8rem] font-bold transition-all \${filter === 'ALL' ? 'bg-cyan text-black shadow-[0_0_15px_rgba(0,229,255,0.4)]' : 'bg-white/5 text-text-muted hover:bg-white/10'}\`}>すべて</button>
              <button onClick={() => setFilter('10G')} className={\`px-4 py-2 rounded-full text-[0.8rem] font-bold transition-all \${filter === '10G' ? 'bg-cyan text-black shadow-[0_0_15px_rgba(0,229,255,0.4)]' : 'bg-white/5 text-text-muted hover:bg-white/10'}\`}>10G対応</button>
              <button onClick={() => setFilter('VDSL')} className={\`px-4 py-2 rounded-full text-[0.8rem] font-bold transition-all \${filter === 'VDSL' ? 'bg-cyan text-black shadow-[0_0_15px_rgba(0,229,255,0.4)]' : 'bg-white/5 text-text-muted hover:bg-white/10'}\`}>VDSL対応</button>
              <button onClick={() => setFilter('AU')} className={\`px-4 py-2 rounded-full text-[0.8rem] font-bold transition-all \${filter === 'AU' ? 'bg-cyan text-black shadow-[0_0_15px_rgba(0,229,255,0.4)]' : 'bg-white/5 text-text-muted hover:bg-white/10'}\`}>au割</button>
              <button onClick={() => setFilter('DOC')} className={\`px-4 py-2 rounded-full text-[0.8rem] font-bold transition-all \${filter === 'DOC' ? 'bg-cyan text-black shadow-[0_0_15px_rgba(0,229,255,0.4)]' : 'bg-white/5 text-text-muted hover:bg-white/10'}\`}>ドコモ割</button>
              <button onClick={() => setFilter('SB')} className={\`px-4 py-2 rounded-full text-[0.8rem] font-bold transition-all \${filter === 'SB' ? 'bg-cyan text-black shadow-[0_0_15px_rgba(0,229,255,0.4)]' : 'bg-white/5 text-text-muted hover:bg-white/10'}\`}>SoftBank割</button>
            </div>
            
            <div className="flex bg-black/60 border border-white/10 rounded-full p-1 self-start shrink-0">
              <button 
                onClick={() => setSpeedFilter('all')} 
                className={\`px-5 py-2 rounded-full text-[0.8rem] font-bold transition-all \${speedFilter === 'all' ? 'bg-cyan text-black shadow-[0_0_15px_rgba(0,229,255,0.3)]' : 'text-text-muted hover:text-white'}\`}
              >
                すべて
              </button>
              <button 
                onClick={() => setSpeedFilter('10g')} 
                className={\`px-5 py-2 rounded-full text-[0.8rem] font-bold transition-all \${speedFilter === '10g' ? 'bg-cyan text-black shadow-[0_0_15px_rgba(0,229,255,0.3)]' : 'text-text-muted hover:text-white'}\`}
              >
                10Gのみ
              </button>
              <button 
                onClick={() => setSpeedFilter('1g')} 
                className={\`px-5 py-2 rounded-full text-[0.8rem] font-bold transition-all \${speedFilter === '1g' ? 'bg-cyan text-black shadow-[0_0_15px_rgba(0,229,255,0.3)]' : 'text-text-muted hover:text-white'}\`}
              >
                10G除外
              </button>
            </div>
          </div>`;

const newUI = `          <div className="flex flex-col gap-4 mb-8 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="flex items-center gap-3">
              <span className="text-[0.75rem] font-bold text-text-dim w-16 shrink-0">速度/条件</span>
              <div className="flex flex-wrap gap-2">
                {['10G', '1G', 'VDSL'].map(key => (
                  <button 
                    key={key}
                    onClick={() => {
                      if (key === '10G' && activeFilters.includes('1G')) toggleFilter('1G');
                      if (key === '1G' && activeFilters.includes('10G')) toggleFilter('10G');
                      toggleFilter(key);
                    }}
                    className={\`px-4 py-1.5 rounded-full text-[0.75rem] font-bold transition-all \${activeFilters.includes(key) ? 'bg-cyan text-black shadow-[0_0_15px_rgba(0,229,255,0.4)]' : 'bg-white/5 text-text-muted hover:bg-white/10'}\`}
                  >
                    {key === '10G' ? '10Gプラン' : key === '1G' ? '1Gプラン' : 'VDSL対応'}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="text-[0.75rem] font-bold text-text-dim w-16 shrink-0">スマホ割</span>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'au', label: 'au/UQ割' },
                  { id: 'docomo', label: 'docomo割' },
                  { id: 'softbank', label: 'SoftBank/Y!割' }
                ].map(item => (
                  <button 
                    key={item.id}
                    onClick={() => toggleFilter(item.id)}
                    className={\`px-4 py-1.5 rounded-full text-[0.75rem] font-bold transition-all \${activeFilters.includes(item.id) ? 'bg-cyan text-black shadow-[0_0_15px_rgba(0,229,255,0.4)]' : 'bg-white/5 text-text-muted hover:bg-white/10'}\`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="text-[0.75rem] font-bold text-text-dim w-16 shrink-0">提供エリア</span>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'hokkaido', label: '北海道' },
                  { id: 'tohoku', label: '東北' },
                  { id: 'kanto', label: '関東' },
                  { id: 'tokai', label: '東海' },
                  { id: 'kansai', label: '関西' },
                  { id: 'chugoku', label: '中国' },
                  { id: 'shikoku', label: '四国' },
                  { id: 'kyushu', label: '九州' }
                ].map(item => (
                  <button 
                    key={item.id}
                    onClick={() => toggleFilter(item.id)}
                    className={\`px-4 py-1.5 rounded-full text-[0.75rem] font-bold transition-all \${activeFilters.includes(item.id) ? 'bg-cyan text-black shadow-[0_0_15px_rgba(0,229,255,0.4)]' : 'bg-white/5 text-text-muted hover:bg-white/10'}\`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>`;

content = content.replace(oldUI, newUI);
fs.writeFileSync(path, content);
console.log("compare/page.tsx updated!");
