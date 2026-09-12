import React from 'react';
export const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-center px-1 mb-1">
    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">
      {children}
    </span>
  </div>
);
export const PillButton: React.FC<{
  icon?: React.ReactNode; 
  children: React.ReactNode;
  variant?: 'filled' | 'outline' | 'solid'; 
  onClick?: () => void;
  disabled?: boolean;
}> = ({ icon, children, variant = 'filled', onClick, disabled }) => {
  const base = 'flex items-center gap-[8px] justify-center w-full h-[38px] rounded-2xl font-bold tracking-[0.1px] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';
  const variants: Record<string, string> = {
    filled: 'bg-white/5 hover:bg-white/10 active:bg-white/15 text-white text-[11px] px-4 select-none border border-white/5',
    outline: 'border border-white/10 hover:bg-white/5 active:bg-white/10 backdrop-blur-[40px] text-[11px] px-4 text-white select-none',
    solid: 'bg-white hover:bg-gray-100 active:bg-gray-200 text-black text-[11px] px-4 select-none shadow-sm',
  };
  return (
    <button className={`${base} ${variants[variant]}`} onClick={onClick} disabled={disabled}>
      {icon}
      <span>{children}</span>
    </button>
  );
};
export const TextInput: React.FC<{
  value: string; 
  onChange: (val: string) => void; 
  placeholder?: string;
}> = ({ value, onChange, placeholder }) => (
  <textarea 
    value={value} 
    onChange={(e) => onChange(e.target.value)} 
    placeholder={placeholder}
    className="border border-white/5 hover:border-white/10 focus:border-indigo-500/30 rounded-2xl w-full h-[90px] px-4 py-3.5 resize-none bg-white/5 text-[11px] font-medium text-white placeholder-white/20 tracking-[0.1px] focus:outline-none transition-all" 
  />
);
export const SegmentedToggle: React.FC<{
  value: string;
  items: { value: string; label: string; icon?: React.ReactNode }[];
  onChange: (val: string) => void;
}> = ({ value, items, onChange }) => (
  <div className="flex w-full items-center border border-white/5 rounded-2xl overflow-hidden bg-white/5 p-1">
    {items.map((item) => (
      <button key={item.value} type="button" onClick={() => onChange(item.value)}
        className={`flex-1 flex items-center justify-center gap-1.5 h-[34px] px-3 rounded-xl text-[10px] font-bold tracking-tight transition-all cursor-pointer ${
          value === item.value 
          ? 'bg-white/10 text-white shadow-sm' 
          : 'text-white/30 hover:text-white/60'
        }`}>
        {item.icon}<span>{item.label}</span>
      </button>
    ))}
  </div>
);
