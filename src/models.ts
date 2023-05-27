export type Chapter = {
    user: string,
    narrative: string,
    imagery: string,
    image: string,
};

export type Adventure = {
    id: string,
    title: string,
    chapters: Chapter[],
    adventureEnded: boolean,
};

export type AdventureRequest = {
	id: string,
	prompt: string,
};

export type AdventureResponse = {
    success: boolean,
    adventure: Adventure | null,
    error: Error | null,
};

export type ContinueAdventureResponse = {
    id: string,
    chapter: Chapter
};
