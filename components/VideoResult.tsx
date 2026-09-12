import React, { useState } from 'react';
import { PillButton } from './UI';
import { Flow } from 'flow-sdk';
interface VideoResultProps {
  video: any;
  isGenerating: boolean;
}
export const VideoResult: React.FC<VideoResultProps> = ({ video, isGenerating }) => {
  const [downloadState, setDownloadState] = useState<'idle' | 'downloading' | 'done'>('idle');
  const handleDownload = async () => {
    if (!video) return;
    setDownloadState('downloading');
    try {
      await Flow.download({
        base64: video.base64,
        mimeType: video.mimeType,
        filename: `MOI-Studio-${Date.now()}.mp4`
      });
      setDownloadState('done');
      setTimeout(() => setDownloadState('idle'), 2000);
    } catch (e) {
      setDownloadState('idle');
    }
  };
  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center gap-10 py-12 animate-pulse">
        <div className="relative">
          {/* Multi-layered loading spinner */}
          <div className="w-56 h-56 rounded-full border border-white/5 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-transparent rounded-full animate-spin duration-[4s]" />
            <div className="w-48 h-48 rounded-full border-[3px] border-indigo-500/20 flex items-center justify-center">
              <div className="w-40 h-40 rounded-full border-t-4 border-indigo-400 border-r-4 border-r-purple-400 border-b-4 border-b-pink-400 border-l-4 border-l-transparent animate-spin" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="material-symbols-outlined text-5xl text-white/80">auto_videocam</span>
            </div>
          </div>
          
          {/* Dynamic glow blobs */}
          <div className="absolute top-0 -left-10 w-32 h-32 bg-indigo-500/10 blur-[80px]" />
          <div className="absolute bottom-0 -right-10 w-32 h-32 bg-pink-500/10 blur-[80px]" />
        </div>
        
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 uppercase italic">
            Visualizing Engine
          </h2>
          <div className="flex flex-col items-center gap-1">
            <p className="text-white/50 text-[10px] font-bold uppercase tracking-[0.4em]">Merender Imajinasi Anda</p>
            <div className="w-32 h-0.5 bg-white/5 rounded-full overflow-hidden mt-2">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-pink-500 animate-[loading-bar_2s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>
        
        <style>{`
          @keyframes loading-bar {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      </div>
    );
  }
  if (!video) {
    return (
      <div className="flex flex-col items-center gap-8 opacity-40 text-center max-w-sm group">
        <div className="w-40 h-40 rounded-[2.5rem] border-2 border-dashed border-white/20 flex items-center justify-center group-hover:border-indigo-500/30 transition-all duration-500">
          <div className="w-28 h-28 rounded-[1.8rem] bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
            <span className="material-symbols-outlined text-[64px] text-white group-hover:text-indigo-400">play_lesson</span>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-xl font-black tracking-tighter uppercase italic">Ready to Engine</p>
          <p className="text-[10px] font-medium leading-relaxed tracking-wider">
            Sistem siap menerima narasi kreatif Anda.<br />
            Silakan masukkan deskripsi di panel kiri.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-6xl animate-slide-up">
      <div className="relative w-full bg-[#050505] rounded-[2rem] overflow-hidden shadow-2xl border border-white/5 p-1.5 group">
        {/* Colorful border glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none" />
        
        <div className="absolute top-6 left-6 z-10 px-4 py-1.5 bg-black/60 backdrop-blur-xl rounded-2xl border border-white/10 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-black tracking-[0.2em] text-white uppercase italic">Ultra Render Engine</span>
        </div>
        
        <video 
          key={video.mediaId}
          src={`data:${video.mimeType};base64,${video.base64}`} 
          controls 
          autoPlay
          loop
          className="w-full max-h-[70vh] object-contain rounded-[1.6rem] relative z-0"
        />
      </div>
      <div className="flex items-center gap-4">
        <button 
          onClick={handleDownload}
          disabled={downloadState !== 'idle'}
          className={`h-11 px-8 rounded-2xl font-bold text-xs tracking-widest uppercase transition-all flex items-center gap-3 ${
            downloadState === 'done'
            ? 'bg-green-500 text-white'
            : 'bg-white text-black hover:bg-indigo-50 shadow-lg'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">
            {downloadState === 'done' ? 'verified' : 'cloud_download'}
          </span>
          {downloadState === 'idle' ? 'Unduh Hasil Render' : downloadState === 'downloading' ? 'Menyiapkan File...' : 'Tersimpan'}
        </button>
      </div>
    </div>
  );
};
