import english from './english.json';

function expandContractions(word: string): string[] {
    if(word.slice(-2) === "'s") {
        return [word.slice(0, -2), "is"];
    } else if(word === "won't") {
        return ["will", "not"];
    } else if(word.slice(-3) === "n't") {
        return [word.slice(0, -3), "not"];
    } else if(word.slice(-3) === "'re") {
        return [word.slice(0, -3), "are"];
    } else if (word === "I'm") {
        return ["I", "am"];
    } else if (word.slice(-3) === "'ll") {
        return [word.slice(0, -3), "will"];
    } else {
        return [word];
    }
}

function stem(word: string): string {
    // irregular verbs
    switch (word) {
        case "am":
        case "is":
        case "are":
        case "was":
        case "were":
            return "be";
        default:
            return word;
    }
}

export function lex(input: string): string[] {
    // split on whitespace
    const words = input.split(/\s+/);
    return words
        .flatMap(word => expandContractions(word))
        .map(word => word.toLowerCase())
        .map(word => stem(word));
}