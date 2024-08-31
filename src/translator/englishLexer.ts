import english from './english.json';

class Lexer {
    private partsOfSpeech: Set<string>;

    constructor() {
        // Create a set of all parts of speech
        this.partsOfSpeech = new Set();
        // object containing 
        
        for(const [word, def] of Object.entries(english)) {
            for(const pos of def.partsOfSpeech) {
                this.partsOfSpeech.add(pos);
            }
        }
    }



    // Returns whether a given string is a part of speech
    has = (token) => {
        return this.partsOfSpeech.has(token);
    }
}
