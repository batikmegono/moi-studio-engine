import React from 'react';
import { SectionLabel, PillButton, TextInput, SegmentedToggle } from './UI';
import { MediaItem } from 'flow-sdk';
interface SidebarProps {
  prompt: string;
  setPrompt: (val: string) => void;
  selectedStyle: string;
  setSelectedStyle: (val: string) => void;
  selectedImages: MediaItem[];
  onSelectImage: (index: number) => void;
  onRemoveImage: (index: number) => void;
  aspectRatio: '16:9' | '9:16';
  setAspectRatio: (val: '16:9' | '9:16') => void;
  duration: number;
  setDuration: (val: number) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  hasGeneratedOnce: boolean;
}
const styleColors: Record<string, string> = {
  'None': 'rgba(255,255,255,0.4)',
  'Cinematic': '#f59e0b',
  'Anime': '#fb7185',
  '3D Render': '#06b6d4',
  'Cyberpunk': '#8b5cf6',
  'Watercolor': '#10b981'
};
const styleIcons: Record<string, string> = {
  'None': 'block',
  'Cinematic': 'movie',
  'Anime': 'palette',
  '3D Render': 'view_in_ar',
  'Cyberpunk': 'bolt',
  'Watercolor': 'brush'
};
export const Sidebar: React.FC<SidebarProps> = ({
  prompt,
  setPrompt,
  selectedStyle,
  setSelectedStyle,
  selectedImages,
  onSelectImage,
  onRemoveImage,
  aspectRatio,
  setAspectRatio,
  duration,
  setDuration,
  onGenerate,
  isGenerating,
  hasGeneratedOnce
}) => {
  const slots = [0, 1, 2];
  const styles = ['None', 'Cinematic', 'Anime', '3D Render', 'Cyberpunk', 'Watercolor'];
  return (
    <div className="relative border-r border-white/5 flex flex-col items-start justify-between overflow-hidden px-3 py-4 w-[300px] h-full bg-[#0e0e0e]/40 backdrop-blur-2xl z-20 shadow-2xl">
      <div className="flex flex-col gap-6 items-start w-full overflow-y-auto dark-scrollbar pr-1">
        
        {/* Branding */}
        <div className="flex items-center gap-3 px-1 py-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-0.5 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <div className="w-full h-full bg-[#0e0e0e] rounded-[10px] flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-[20px]">play_circle</span>
            </div>
          </div>
          <div>
            <h1 className="text-white font-black text-base tracking-tighter leading-none italic">MOI STUDIO</h1>
            <p className="text-[8px] text-indigo-400 font-bold uppercase tracking-[0.3em] mt-1">Engine v1.0</p>
          </div>
        </div>
        {/* Style Presets */}
        <div className="flex flex-col gap-2.5 items-start w-full">
          <SectionLabel>Gaya Visual</SectionLabel>
          <div className="grid grid-cols-2 gap-2 w-full">
            {styles.map((s) => {
              const isActive = selectedStyle === s;
              const color = styleColors[s];
              return (
                <button
                  key={s}
                  onClick={() => setSelectedStyle(s)}
                  className={`h-[48px] px-2.5 rounded-2xl text-[10px] font-bold transition-all flex flex-col items-start justify-center gap-1 border relative overflow-hidden group ${
                    isActive 
                    ? 'bg-white/5 border-white/20 text-white' 
                    : 'bg-transparent border-white/5 text-white/40 hover:border-white/10 hover:text-white/60'
                  }`}
                >
                  {isActive && (
                    <div 
                      className="absolute inset-0 opacity-10" 
                      style={{ background: `radial-gradient(circle at center, ${color} 0%, transparent 100%)` }}
                    />
                  )}
                  <div className="flex items-center gap-1.5 z-10">
                    <span 
                      className="material-symbols-outlined text-[14px]" 
                      style={{ color: isActive ? color : 'inherit' }}
                    >
                      {styleIcons[s]}
                    </span>
                    <span className="truncate">{s}</span>
                  </div>
                  <div 
                    className={`h-0.5 rounded-full transition-all duration-300 ${isActive ? 'w-full' : 'w-0'}`}
                    style={{ backgroundColor: color }}
                  />
                </button>
              );
            })}
          </div>
        </div>
        {/* Prompt */}
        <div className="flex flex-col gap-2.5 items-start w-full">
          <SectionLabel>Narasi Kreatif</SectionLabel>
          <TextInput 
            value={prompt} 
            onChange={setPrompt} 
            placeholder="Ketik imajinasi Anda di sini..." 
          />
        </div>
        {/* Media Slots */}
        <div className="flex flex-col gap-2.5 items-start w-full">
          <SectionLabel>Gambar Referensi</SectionLabel>
          <div className="flex gap-2 w-full">
            {slots.map((index) => {
              const image = selectedImages[index];
              return (
                <div key={index} className="flex-1 relative group aspect-square">
                  {image ? (
                    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 group-hover:border-white/20 transition-all">
                      <img 
                        src={`data:${image.mimeType};base64,${image.base64}`} 
                        className="w-full h-full object-cover"
                      />
                      <button 
                        onClick={() => onRemoveImage(index)}
                        className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/80 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 text-white"
                      >
                        <span className="material-symbols-outlined text-[14px]">close</span>
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => onSelectImage(index)}
                      className="w-full h-full rounded-2xl border border-dashed border-white/10 hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all flex items-center justify-center text-white/20"
                    >
                      <span className="material-symbols-outlined text-[20px]">add_photo_alternate</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {/* Aspect Ratio */}
        <div className="flex flex-col gap-2.5 w-full">
          <SectionLabel>Format Video</SectionLabel>
          <SegmentedToggle 
            value={aspectRatio} 
            items={[
              { value: '16:9', label: 'Landskap', icon: <span className="material-symbols-outlined text-[14px]">rectangle</span> },
              { value: '9:16', label: 'Potret', icon: <span className="material-symbols-outlined text-[14px]">stay_current_portrait</span> }
            ]} 
            onChange={(val) => setAspectRatio(val as any)} 
          />
        </div>
        {/* Duration */}
        <div className="flex flex-col gap-2.5 w-full">
          <SectionLabel>Durasi Render</SectionLabel>
          <div className="grid grid-cols-4 gap-1.5 w-full">
            {[4, 6, 8, 10].map((s) => (
              <button
                key={s}
                onClick={() => setDuration(s)}
                className={`h-9 rounded-xl text-[10px] font-black transition-all border ${
                  duration === s 
                  ? 'bg-indigo-500 border-indigo-400 text-white shadow-lg shadow-indigo-500/20' 
                  : 'bg-transparent border-white/5 text-white/30 hover:border-white/10 hover:text-white/50'
                }`}
              >
                {s}s
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Button */}
      <div className="w-full pt-6 mt-auto">
        <button 
          onClick={onGenerate}
          disabled={isGenerating}
          className={`w-full h-12 rounded-2xl flex items-center justify-center gap-2 font-bold text-sm tracking-wide transition-all disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden ${
            isGenerating 
            ? 'bg-white/10 text-white border border-white/10' 
            : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-xl shadow-purple-500/20 hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          {isGenerating ? (
            <>
              <span className="material-symbols-outlined text-[20px] animate-spin">refresh</span>
              <span>Memproses Visual...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[20px] group-hover:rotate-12 transition-transform">auto_awesome</span>
              <span>Mulai Render</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
