export interface ChatEntry {
    role: 'user' | 'bot',
    mode?: 'mom' | 'monk' | 'normal' | null,
    message: string,
}
export type ChatHistory = ChatEntry[]