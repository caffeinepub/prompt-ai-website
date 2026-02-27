import { Sparkles } from 'lucide-react';

export default function AppHeader() {
  return (
    <header className="relative overflow-hidden">
      {/* Hero background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/generated/hero-bg.dim_1440x900.png')" }}
        aria-hidden="true"
      />
      {/* Gradient overlay for readability */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, oklch(0.16 0.010 45 / 0.55) 0%, oklch(0.16 0.010 45 / 0.85) 100%)'
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center py-12 px-6 text-center">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative w-12 h-12 rounded-2xl overflow-hidden shadow-glow flex-shrink-0">
            <img
              src="/assets/generated/logo-icon.dim_128x128.png"
              alt="PromptAI Studio logo"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback if image fails to load
                const target = e.currentTarget as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.classList.add('btn-rose', 'flex', 'items-center', 'justify-center');
                }
              }}
            />
            <div className="absolute inset-0 hidden items-center justify-center">
              <Sparkles className="w-6 h-6 text-warm-cream" />
            </div>
          </div>
          <div className="text-left">
            <h1 className="font-display text-2xl font-semibold text-warm-cream tracking-tight leading-none">
              PromptAI
            </h1>
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-rose-soft opacity-80">
              Studio
            </span>
          </div>
        </div>

        <p className="text-warm-cream/60 text-sm font-light max-w-xs leading-relaxed">
          Converse with AI. Explore ideas. Create without limits.
        </p>
      </div>
    </header>
  );
}
