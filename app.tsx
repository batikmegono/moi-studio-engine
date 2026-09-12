import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { VideoResult } from './components/VideoResult';
import { Flow } from 'flow-sdk';
import { MediaItem } from 'flow-sdk';
export default function App() {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('None');
  const [selectedImages, setSelectedImages] = useState<MediaItem[]>([]);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [duration, setDuration] = useState<number>(4);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<any>(null);
  const [hasGeneratedOnce, setHasGeneratedOnce] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const id = 'flow-design-system-css';
    if (document.getElementById(id)) return;
    const style = document.createElement('style');
    style.id = id;
    style.textContent = `
      input[type=range] { -webkit-appearance: none; appearance: none; background: transparent; width: 100%; cursor: pointer; padding: 8px 0; }
      input[type=range]::-webkit-slider-runnable-track { width: 100%; height: 3px; background: #595959; border-radius: 9999px; }
      input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 14px; height: 14px; border-radius: 50%; background: white; box-shadow: 0px 1px 3px rgba(0,0,0,0.5); margin-top: -5.5px; cursor: grab; }
      input[type=range]::-webkit-slider-thumb:active { cursor: grabbing; }
      
      .dark-scrollbar { scrollbar-width: thin; scrollbar-color: #595959 transparent; }
      .dark-scrollbar::-webkit-scrollbar { width: 4px; }
      .dark-scrollbar::-webkit-scrollbar-track { background: transparent; }
      .dark-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 9999px; }
      
      @keyframes mesh {
        0% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(5%, 5%) scale(1.1); }
        66% { transform: translate(-5%, 2%) scale(0.9); }
        100% { transform: translate(0, 0) scale(1); }
      }
      
      .mesh-bg {
        position: fixed;
        top: -50%;
        left: -50%;
        right: -50%;
        bottom: -50%;
        width: 200%;
        height: 200%;
        background: 
          radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.08) 0%, transparent 40%),
          radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.08) 0%, transparent 40%),
          radial-gradient(circle at 40% 80%, rgba(168, 85, 247, 0.08) 0%, transparent 40%),
          radial-gradient(circle at 70% 70%, rgba(6, 182, 212, 0.08) 0%, transparent 40%);
        animation: mesh 20s ease-in-out infinite alternate;
        z-index: 0;
        pointer-events: none;
      }
      @keyframes slide-up {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-slide-up { animation: slide-up 0.3s ease-out forwards; }
      
      html, body, #root { 
        margin: 0; padding: 0; width: 100%; height: 100%; 
        background: #080808; 
        font-family: 'Google Sans Text', 'Google Sans', sans-serif; 
        letter-spacing: 0.1px; 
        -webkit-font-smoothing: antialiased; 
        color: white; 
        overflow: hidden; 
      }
    `;
    document.head.appendChild(style);
  }, []);
  const stylesMap: Record<string, string> = {
    'None': '',
    'Cinematic': 'cinematic lighting, masterpiece, high fidelity, professional camera',
    'Anime': 'vibrant anime style, studio ghibli aesthetic, clean lines',
    '3D Render': 'unreal engine 5, octane render, highly detailed, photorealistic 3d',
    'Cyberpunk': 'neon lights, futuristic, rainy atmosphere, cyber aesthetic',
    'Watercolor': 'artistic watercolor painting, soft textures, dreamy'
  };
  const handleGenerate = async () => {
    if (!prompt && selectedImages.length === 0) {
      setError('Silakan masukkan prompt atau pilih gambar.');
      return;
    }
    setIsGenerating(true);
    setError(null);
    try {
      const finalPrompt = `${prompt} ${stylesMap[selectedStyle]}`.trim();
      
      const generationOptions: any = {
        prompt: finalPrompt || 'Animate this beautifully',
        aspectRatio: aspectRatio,
        modelDisplayName: 'Omni 1.1 Flash',
        durationSeconds: duration,
      };
      if (selectedImages.length === 1) {
        generationOptions.firstFrameImageMediaId = selectedImages[0].mediaId;
      } else if (selectedImages.length > 1) {
        generationOptions.referenceImageMediaIds = selectedImages.map(img => img.mediaId);
      }
      const result = await Flow.generate.video(generationOptions);
      setGeneratedVideo(result);
      setHasGeneratedOnce(true);
    } catch (err: any) {
      setError(err.message || 'Gagal membuat video.');
    } finally {
      setIsGenerating(false);
    }
  };
  const handleSelectImage = async (index: number) => {
    try {
      const media = await Flow.media.select({ filter: 'image' });
      const newImages = [...selectedImages];
      newImages[index] = media;
      setSelectedImages(newImages.filter(Boolean));
    } catch (e) {}
  };
  const removeImage = (index: number) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
  };
  return (
    <div className="flex h-screen w-screen bg-[#080808] overflow-hidden relative">
      <div className="mesh-bg" />
      
      <Sidebar 
        prompt={prompt}
        setPrompt={setPrompt}
        selectedStyle={selectedStyle}
        setSelectedStyle={setSelectedStyle}
        selectedImages={selectedImages}
        onSelectImage={handleSelectImage}
        onRemoveImage={removeImage}
        aspectRatio={aspectRatio}
        setAspectRatio={(val: any) => setAspectRatio(val)}
        duration={duration}
        setDuration={setDuration}
        onGenerate={handleGenerate}
        isGenerating={isGenerating}
        hasGeneratedOnce={hasGeneratedOnce}
      />
      
      <main className="flex-1 relative flex flex-col items-center justify-center p-6 lg:p-12 overflow-y-auto dark-scrollbar z-10">
        {error && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 rounded-xl text-xs backdrop-blur-xl animate-slide-up flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">error</span>
            {error}
          </div>
        )}
        <VideoResult 
          video={generatedVideo} 
          isGenerating={isGenerating} 
        />
        <footer className="fixed bottom-6 right-8 text-right opacity-30 text-[9px] pointer-events-none mix-blend-screen">
          <p className="tracking-[0.3em] font-black mb-0.5">MOI STUDIO ENGINE</p>
          <p className="font-medium text-white/60">KARANGANYAR • BATANG • JAWA TENGAH</p>
        </footer>
      </main>
    </div>
  );
}
