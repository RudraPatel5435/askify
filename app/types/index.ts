export interface ChatEntry {
    role: 'user' | 'bot',
    mode?: 'mom' | 'monk' | 'normal' | null,
    file?: FormDataEntryValue
    message: string,
}
export type ChatHistory = ChatEntry[]