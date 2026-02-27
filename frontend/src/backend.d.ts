import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Exchange {
    response: string;
    prompt: string;
}
export interface backendInterface {
    clearHistory(): Promise<void>;
    getHistory(): Promise<Array<Exchange>>;
    submitPrompt(prompt: string): Promise<string>;
}
