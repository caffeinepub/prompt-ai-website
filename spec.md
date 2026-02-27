# Specification

## Summary
**Goal:** Build a chat-style AI prompt website with a simulated backend, warm dark editorial UI inspired by moody monochrome tones with blush/rose accents.

**Planned changes:**
- Create a backend actor with `submitPrompt(text)`, `getHistory()`, and `clearHistory()` functions; conversation stored in stable variables with simulated AI responses
- Build a chat interface displaying prompt/response pairs: user messages right-aligned, AI responses left-aligned, with auto-scroll to latest message and empty state
- Build a multi-line prompt input area with submit on button click or Enter key, loading indicator during response, and auto-clear after submission
- Add a "Clear Conversation" button that calls `clearHistory()` and resets the displayed thread
- Apply a warm dark theme (charcoal/dark beige background, off-white text, rose/blush accents, refined sans-serif font) consistently across header, chat bubbles, input, and buttons
- Render the hero background image (`/assets/generated/hero-bg.dim_1440x900.png`) in the app header/page background
- Display the logo icon (`/assets/generated/logo-icon.dim_128x128.png`) in the header

**User-visible outcome:** Users can type prompts, receive simulated AI responses in a styled chat thread, and clear the conversation — all within a sleek warm dark editorial UI.
