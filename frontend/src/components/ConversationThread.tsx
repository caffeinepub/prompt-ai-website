import { useEffect, useRef } from 'react';
import { Sparkles, User, Trash2, MessageSquare } from 'lucide-react';
import { useGetHistory, useClearHistory } from '@/hooks/useQueries';
import { Button } from '@/components/ui/button';
import type { Exchange } from '../backend';

function TypingIndicator() {
  return (
    <div className="flex items-end gap-3 animate-fade-in-up">
      <div className="w-8 h-8 rounded-full btn-rose flex items-center justify-center flex-shrink-0 shadow-glow-sm">
        <Sparkles className="w-4 h-4" style={{ color: 'oklch(0.98 0.005 55)' }} />
      </div>
      <div className="message-ai rounded-2xl rounded-bl-sm px-4 py-3">
        <div className="flex items-center gap-1.5 h-5">
          <span
            className="w-2 h-2 rounded-full animate-typing-1"
            style={{ background: 'oklch(0.72 0.13 15)' }}
          />
          <span
            className="w-2 h-2 rounded-full animate-typing-2"
            style={{ background: 'oklch(0.72 0.13 15)' }}
          />
          <span
            className="w-2 h-2 rounded-full animate-typing-3"
            style={{ background: 'oklch(0.72 0.13 15)' }}
          />
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ exchange, index }: { exchange: Exchange; index: number }) {
  return (
    <div className="flex flex-col gap-3 animate-fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
      {/* User message */}
      <div className="flex items-end gap-3 justify-end">
        <div className="max-w-[75%] sm:max-w-[65%]">
          <div className="message-user rounded-2xl rounded-br-sm px-4 py-3">
            <p className="text-sm leading-relaxed text-warm-cream">{exchange.prompt}</p>
          </div>
          <p className="text-xs text-muted-foreground mt-1 text-right pr-1">You</p>
        </div>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: 'oklch(0.26 0.014 45)' }}
        >
          <User className="w-4 h-4" style={{ color: 'oklch(0.72 0.13 15)' }} />
        </div>
      </div>

      {/* AI response */}
      <div className="flex items-end gap-3">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-glow-sm"
          style={{ background: 'linear-gradient(135deg, oklch(0.72 0.13 15), oklch(0.62 0.14 12))' }}
        >
          <Sparkles className="w-4 h-4" style={{ color: 'oklch(0.98 0.005 55)' }} />
        </div>
        <div className="max-w-[75%] sm:max-w-[65%]">
          <div className="message-ai rounded-2xl rounded-bl-sm px-4 py-3">
            <p className="text-sm leading-relaxed text-warm-cream/90">{exchange.response}</p>
          </div>
          <p className="text-xs text-muted-foreground mt-1 pl-1">PromptAI</p>
        </div>
      </div>
    </div>
  );
}

interface ConversationThreadProps {
  isPending: boolean;
}

export default function ConversationThread({ isPending }: ConversationThreadProps) {
  const { data: history = [], isLoading } = useGetHistory();
  const clearHistoryMutation = useClearHistory();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isPending]);

  const handleClear = () => {
    clearHistoryMutation.mutate();
  };

  const isEmpty = !isLoading && history.length === 0 && !isPending;

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Thread header */}
      {history.length > 0 && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-border/50">
          <span className="text-xs text-muted-foreground font-medium tracking-wide uppercase">
            {history.length} {history.length === 1 ? 'exchange' : 'exchanges'}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            disabled={clearHistoryMutation.isPending}
            className="text-xs text-muted-foreground hover:text-destructive gap-1.5 h-7 px-2"
          >
            {clearHistoryMutation.isPending ? (
              <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <Trash2 className="w-3 h-3" />
            )}
            Clear
          </Button>
        </div>
      )}

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center gap-3">
              <div
                className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin"
                style={{ borderColor: 'oklch(0.72 0.13 15)', borderTopColor: 'transparent' }}
              />
              <p className="text-sm text-muted-foreground">Loading conversation…</p>
            </div>
          </div>
        ) : isEmpty ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 py-12">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: 'oklch(0.24 0.012 45)' }}
            >
              <MessageSquare className="w-8 h-8" style={{ color: 'oklch(0.72 0.13 15)' }} />
            </div>
            <div className="text-center">
              <p className="font-display text-lg text-warm-cream/80 mb-1">Start a conversation</p>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                Type a prompt below and press Enter or click Send to begin your AI dialogue.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center mt-2">
              {['Tell me a story', 'Explain quantum physics', 'Write a poem about rain'].map((suggestion) => (
                <span
                  key={suggestion}
                  className="text-xs px-3 py-1.5 rounded-full border border-border/60 text-muted-foreground"
                  style={{ background: 'oklch(0.22 0.012 45)' }}
                >
                  {suggestion}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <>
            {history.map((exchange, index) => (
              <MessageBubble key={index} exchange={exchange} index={index} />
            ))}
            {isPending && <TypingIndicator />}
          </>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
