import React from "react";
import chroma from "chroma-js";
import { colorScheme } from "../utils/colorscheme";

export type ColorGlossProps = {
    /**
     * The top line of the gloss (e.g. original words).
     */
    words: React.ReactNode[];
    /**
     * The bottom line of the gloss (e.g. gloss / translation for each word).
     */
    glosses: React.ReactNode[];
    /**
     * Optional additional className for the outer container.
     */
    className?: string;
    /**
    /**
     * Inline-style overrides for the outer container.
     */
    style?: React.CSSProperties;
};

/**
 * Renders an interlinear gloss where each word is vertically aligned with its gloss.
 * The component lays out every word-pair in a single horizontal flex row.
 * If the total width exceeds the parent, horizontal scrolling will be enabled.
 */
const ColorGloss: React.FC<ColorGlossProps> = ({ words, glosses, className, style }) => {
    const n = Math.max(words.length, glosses.length);

    // Build a chroma scale using the same gruvbox palette order as TimezoneDemo.tsx
    const gruvbox = colorScheme();
    const palette = chroma
        .scale([
            gruvbox.blue,
            gruvbox.indigo,
            gruvbox.purple,
            gruvbox.pink,
            gruvbox.red,
            gruvbox.orange,
            gruvbox.yellow,
            gruvbox.green,
            gruvbox.teal,
            gruvbox.cyan,
            gruvbox.blue,
        ])
        .mode("oklab");

    // Pre-compute colours for tokens
    const colours = Array.from({ length: n }, (_, i) => palette(i / Math.max(n - 1, 1)).hex());

    // Helper to choose a readable foreground colour depending on background
    const fg = (bg: string) => (chroma.contrast(bg, "#000") < 4.5 ? "#fff" : "#000");

    return (
        <div style={{ display: "flex", flexDirection: "row" }} children={
            Array.from({ length: n }).map((_, i) => (
                <div key={i} className="mx-2 my-1" style={{ display: "inline-block" }}>
                    <span style={{
                        backgroundColor: colours[i],
                        color: fg(colours[i]),
                    }} className="fs-3">{(words[i] ?? "") + "\n"}</span>
                    <span style={{
                        backgroundColor: colours[i],
                        color: fg(colours[i]),
                    }} className="fs-6">{(glosses[i] ?? "")}</span>
                </div>
            ))}
        />
    );
};

export default ColorGloss;
