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
const RubyGloss: React.FC<ColorGlossProps> = ({ words, glosses, className, style }) => {
    const n = Math.max(words.length, glosses.length);

    return (
        <ruby className={className} style={style} children={
            Array.from({ length: n }).map((_, i) => (<>
                    {" "}
                    {words[i] ?? ""}
                    <rp>(</rp><rt>{glosses[i] ?? ""}</rt><rp>)</rp>
                    {" "}
                </>
            ))}
        />
        // <div style={{ display: "flex", flexDirection: "row" }} children={
        //     Array.from({ length: n }).map((_, i) => (
        //         <div key={i} className="mx-2 my-1" style={{ display: "inline-block" }}>
        //             <span style={{backgroundColor: colours[i], color: fg(colours[i])}}>{words[i] ?? ""}</span>
        //             <span style={{backgroundColor: colours[i], color: fg(colours[i])}}>{glosses[i] ?? ""}</span>
        //         </div>
        //     ))}
        // />
    );
};

export default RubyGloss;
