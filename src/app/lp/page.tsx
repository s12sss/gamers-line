'use client';

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const GAMES = [
  { id: 'valorant',   label: 'VALORANT',            genre: 'fps' },
  { id: 'apex',       label: 'Apex Legends',         genre: 'fps' },
  { id: 'ff14',       label: 'ファイナルファンタジーXIV', genre: 'mmo' },
  { id: 'sf6',        label: 'ストリートファイター6',  genre: 'fighting' },
  { id: 'tekken8',    label: '鉄拳8',                genre: 'fighting' },
  { id: 'mhwilds',   label: 'モンスターハンター',     genre: 'casual' },
  { id: 'lol',        label: 'League of Legends',    genre: 'moba' },
  { id: 'ow2',        label: 'Overwatch 2',           genre: 'fps' },
  { id: 'dbd',        label: 'Dead by Daylight',     genre: 'fps' },
  { id: 'fortnite',   label: 'Fortnite',             genre: 'fps' },
];

const GENRES = [
  { id: 'fps',      label: 'FPS / TPS' },
  { id: 'fighting', label: '格闘ゲーム' },
  { id: 'mmo',      label: 'MMO' },
  { id: 'moba',     label: 'MOBA' },
  { id: 'casual',   label: 'マルチプレイ' },
];

export default function LPPage() {
  const [showGenre, setShowGenre] = useState(false);

  const handleGame = (genre: string) => {
    const params = new URLSearchParams({ genre });
    window.location.href = `/diagnosis?${params}`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">

      {/* ミニヘッダー（ロゴのみ） */}
      <div className="px-6 py-4 border-b border-white/5">
        <span className="font-heading font-bold text-lg tracking-tighter">
          Gamer's <span className="text-cyan drop-shadow-[0_0_20px_rgba(0,229,255,0.6)]">Line</span>
        </span>
      </div>

      {/* Hero */}
      <div className="relative flex flex-col items-center text-center px-4 pt-14 pb-10 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(0,229,255,0.08),transparent_70%)]" />
        <div className="font-mono text-[0.65rem] text-cyan tracking-[0.3em] uppercase opacity-70 mb-4">
          // FIND YOUR BEST LINE
        </div>
        <h1 className="font-heading font-black text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-tight mb-4">
          そのラグ、<span className="text-cyan drop-shadow-[0_0_18px_rgba(0,229,255,0.5)]">回線</span>のせいかも。
        </h1>
        <p className="text-text-muted text-sm sm:text-base max-w-md leading-[1.7] mb-2">
          プレイ中のゲームを選ぶだけで<br />
          あなたに最適な回線が30秒でわかります
        </p>
      </div>

      {/* ゲーム選択 */}
      <div className="flex-1 px-4 pb-16 max-w-2xl mx-auto w-full">
        <p className="text-center text-sm font-bold text-white/80 mb-5 tracking-wide">
          今プレイしているゲームは？
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          {GAMES.map(game => (
            <button
              key={game.id}
              onClick={() => handleGame(game.genre)}
              className="group relative px-4 py-4 rounded-2xl border border-white/10 bg-white/[0.03] text-sm font-bold tracking-tight text-left text-text-muted transition-all duration-200 hover:border-cyan/40 hover:bg-cyan/5 hover:text-white"
            >
              <span className="font-mono text-[0.55rem] text-cyan/50 uppercase tracking-widest block mb-1">
                {game.genre === 'fps' ? 'FPS/TPS' : game.genre === 'fighting' ? '格ゲー' : game.genre === 'mmo' ? 'MMO' : game.genre === 'moba' ? 'MOBA' : ''}
              </span>
              {game.label}
            </button>
          ))}
        </div>

        {/* ジャンル選択 */}
        {!showGenre ? (
          <button
            onClick={() => setShowGenre(true)}
            className="w-full py-3 rounded-xl border border-white/10 text-text-muted text-sm hover:border-white/20 hover:text-white transition-all flex items-center justify-center gap-2"
          >
            ここにないゲームをプレイしている
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="border border-white/10 rounded-2xl p-5 bg-white/[0.02]">
            <p className="text-sm text-text-muted mb-4 text-center">ゲームジャンルを選んでください</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {GENRES.map(g => (
                <button
                  key={g.id}
                  onClick={() => handleGame(g.id)}
                  className="px-5 py-2.5 rounded-full border border-white/10 text-sm font-bold text-text-muted hover:border-cyan/40 hover:text-cyan hover:bg-cyan/5 transition-all"
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ミニフッター */}
      <div className="border-t border-white/5 px-6 py-4 flex items-center justify-between">
        <span className="font-heading font-bold text-sm tracking-tighter text-white/50">
          Gamer's Line
        </span>
        <span className="text-[0.65rem] text-text-muted/50">
          ※当サイトはアフィリエイトプログラムを利用して収益を得ています
        </span>
      </div>

    </div>
  );
}
