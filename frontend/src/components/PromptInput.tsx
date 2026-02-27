import { useState, useRef, useCallback } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { useSubmitPrompt } from '@/hooks/useQueries';

interface PromptInputProps {
  onSubmitting: (pending: boolean) => void;
}

export default function PromptInput({ onSubmitting }: PromptInputProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const submitMutation = useSubmitPrompt();

  const handleSubmit = useCallback(async () => {
    const trimmed = value.trim();
    if (!trimmed || submitMutation.isPending) return;

    setValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    onSubmitting(true);
    try {
      await submitMutation.mutateAsync(trimmed);
    } finally {
      onSubmitting(false);
    }
  }, [value, submitMutation, onSubmitting]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    // Auto-resize textarea
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 160) + 'px';
  };

  const isDisabled = submitMutation.isPending || !value.trim();

  return (
    <div className="input-area px-4 py-4">
      <div
        className="flex items-end gap-3 rounded-2xl border border-border/60 px-4 py-3 transition-all duration-200 focus-within:border-rose-blush/40 focus-within:shadow-glow-sm"
        style={{ background: 'oklch(0.22 0.012 45)' }}
      >
        {/* AI icon */}
        <div className="flex-shrink-0 mb-0.5">
          <Sparkles
            className="w-4 h-4"
            style={{ color: submitMutation.isPending ? 'oklch(0.72 0.13 15)' : 'oklch(0.50 0.015 50)' }}
          />
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything… (Enter to send, Shift+Enter for new line)"
          disabled={submitMutation.isPending}
          rows={1}
          maxLength={500}
          className="flex-1 bg-transparent resize-none outline-none text-sm text-warm-cream placeholder:text-muted-foreground/60 leading-relaxed disabled:opacity-60 min-h-[24px] max-h-[160px] overflow-y-auto"
          style={{ scrollbarWidth: 'none' }}
          aria-label="Prompt input"
        />

        {/* Character count + Send button */}
        <div className="flex items-center gap-2 flex-shrink-0 mb-0.5">
          {value.length > 400 && (
            <span
              className="text-xs tabular-nums"
              style={{ color: value.length > 480 ? 'oklch(0.704 0.191 22.216)' : 'oklch(0.60 0.015 50)' }}
            >
              {500 - value.length}
            </span>
          )}
          <button
            onClick={handleSubmit}
            disabled={isDisabled}
            className="btn-rose w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            aria-label="Send prompt"
          >
            {submitMutation.isPending ? (
              <span
                className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin"
                style={{ borderColor: 'oklch(0.98 0.005 55)', borderTopColor: 'transparent' }}
              />
            ) : (
              <Send className="w-3.5 h-3.5" style={{ color: 'oklch(0.98 0.005 55)' }} />
            )}
          </button>
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground/50 mt-2">
        Press <kbd className="px-1 py-0.5 rounded text-xs" style={{ background: 'oklch(0.26 0.014 45)' }}>Enter</kbd> to send · <kbd className="px-1 py-0.5 rounded text-xs" style={{ background: 'oklch(0.26 0.014 45)' }}>Shift+Enter</kbd> for new line
      </p>
    </div>
  );
}
