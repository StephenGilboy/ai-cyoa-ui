import { Adventure, AdventureRequest, AdventureResponse, Chapter, ContinueAdventureResponse } from '../models';
import { defineStore } from 'pinia';

export interface AdventureState {
    adventures: Adventure[];
    currentAdventure: Adventure | null;
    currentChapterIndex: number;
};

export interface AdventureGetters {
    currentChapter: Chapter | null;
};

export interface AdventureActions {
    previousChapter(): void;
    nextChapter(): void;
    startAdventure(prompt: string): Promise<boolean>;
    endAdventure(): void;
    respond(response: string): Promise<boolean>;
};

const api = 'https://api.aicyoa.com/';

const state = {
    adventures: [],
    currentAdventure: null,
    currentChapterIndex: -1,
} as AdventureState;

export const useAdventureStore = defineStore('adventure', {
    state: () => {
        return state;
    },
    getters: {
        currentChapter(state): Chapter | null {
            if (state.currentChapterIndex > -1) {
                return state.currentAdventure?.chapters[state.currentChapterIndex] ?? null;
            }
            return null;
        },
    },
    actions: {
        previousChapter() {
            if (this.currentChapterIndex > 0) {
                this.currentChapterIndex--;
            }
        },
        nextChapter() {
            if (this.currentAdventure && this.currentChapterIndex < this.currentAdventure.chapters.length - 1) {
                this.currentChapterIndex++;
            }
        },
        async startAdventure(prompt: string) {
            const response = await fetch(api, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: '', prompt }),
            });

            if (response.ok) {
                const adventureResponse: AdventureResponse = await response.json();
                if (adventureResponse.success) {
                    this.adventures.push(adventureResponse.adventure!);
                    this.currentAdventure = adventureResponse.adventure;
                    this.currentChapterIndex = 0;
                    return true;
                } else {
                    console.error(adventureResponse.error);
                    return false;
                }
            } else {
                console.error(response.statusText);
                return false;
            }
        },
        endAdventure() {
            if (!this.currentAdventure) return;
            this.currentAdventure.adventureEnded = true;
        },
        async respond(prompt: string) {
            if (!this.currentAdventure) return false;
            const response = await fetch(api, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: this.currentAdventure.id, prompt }),
            });

            if (response.ok) {
                const adventureResponse: ContinueAdventureResponse = await response.json();
                if (this.currentAdventure.id !== adventureResponse.id) {
                    console.error('Server responded with the wrong adventure!');
                    return false;
                }
                this.currentAdventure.chapters.push(adventureResponse.chapter);
                this.currentChapterIndex = this.currentAdventure.chapters.length - 1;
                return true;
            }
            console.error(response.statusText);
            return false;
        },
    },
});
