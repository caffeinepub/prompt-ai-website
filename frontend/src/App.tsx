import { useState } from 'react';
import { Heart } from 'lucide-react';
import AppHeader from './components/AppHeader';
import ConversationThread from './components/ConversationThread';
import PromptInput from './components/PromptInput';

export default function App() {
  const [isPending, setIsPending] = useState(false);

  const appId = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'prompt-ai-studio'
  );

  return (
    <div className="flex flex-col h-screen" style={{ background: 'oklch(0.16 0.010 45)' }}>
      {/* Header */}
      <AppHeader />

      {/* Main chat area */}
      <main className="flex flex-col flex-1 min-h-0 max-w-3xl w-full mx-auto w-full">
        {/* Conversation thread */}
        <ConversationThread isPending={isPending} />

        {/* Prompt input */}
        <PromptInput onSubmitting={setIsPending} />
      </main>

      {/* Footer */}
      <footer className="py-3 px-4 text-center border-t border-border/30">
        <p className="text-xs text-muted-foreground/50 flex items-center justify-center gap-1.5">
          <span>© {new Date().getFullYear()} PromptAI Studio · Built with</span>
          <Heart
            className="w-3 h-3 inline-block"
            style={{ color: 'oklch(0.72 0.13 15)', fill: 'oklch(0.72 0.13 15)' }}
            aria-label="love"
          />
          <span>using</span>
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline transition-colors"
            style={{ color: 'oklch(0.72 0.13 15)' }}
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
