export interface ChatEntry {
    role: 'user' | 'bot',
    mode?: 'mom' | 'monk' | 'normal' | null,
    file?: FormDataEntryValue
    message: string,
}
export type ChatHistory = ChatEntry[]

export type ChatMessage = {
    role: 'user' | 'model';
    message: string;
}
