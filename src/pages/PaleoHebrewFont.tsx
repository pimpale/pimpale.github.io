
import React from 'react';
import { useState, useMemo } from 'react';

import '../styles/style.scss';

const TRANSLITERATION: Record<string, string> = {
    // Consonants
    "'": '\u{10900}', // ALF
    'b': '\u{10901}', // BET
    'g': '\u{10902}', // GAML
    'd': '\u{10903}', // DELT
    'h': '\u{10904}', // HE
    'w': '\u{10905}', // WAU
    'z': '\u{10906}', // ZAYIN
    'x': '\u{10907}', // HET
    'T': '\u{10908}', // TET
    'y': '\u{10909}', // YOD
    'k': '\u{1090A}', // KAF
    'l': '\u{1090B}', // LAMD
    'm': '\u{1090C}', // MEM
    'n': '\u{1090D}', // NUN
    's': '\u{1090E}', // SEMK
    'A': '\u{1090F}', // AIN
    'p': '\u{10910}', // PE
    'S': '\u{10911}', // SADE
    'q': '\u{10912}', // QOF
    'r': '\u{10913}', // ROSH
    'j': '\u{10914}', // SHIN
    't': '\u{10915}', // TAW
    // Numbers
    'a': '\u{10916}', // ONE
    'i': '\u{10917}', // TEN
    'u': '\u{10918}', // TWENTY
    'o': '\u{10919}', // ONE HUNDRED
    // Combining diacritics
    '0': '\u0323', // COMBINING DOT BELOW
    '1': '\u0307', // COMBINING DOT ABOVE
    '2': '\u0308', // COMBINING DIAERESIS
    '3': '\u1AB4', // COMBINING TRIPLE DOT
    '1a': '\u064E', // ARABIC FATHA
    '2a': '\u0650', // ARABIC KASRA
    '3a': '\u064F', // ARABIC DAMMA
    '1h': '\u05B7', // HEBREW PATACH
    '2h': '\u05B4', // HEBREW HIRIQ
    '3h': '\u05BB', // HEBREW QUBUTS
    'v': '\u030C', // COMBINING CARON
    '^': '\u0302', // COMBINING CIRCUMFLEX ACCENT
    '_': '\u0331', // COMBINING MACRON BELOW
    '|': '\u{1091F}', // PHOENICIAN WORD SEPARATOR
    '-': '\u0304', // COMBINING MACRON
};

// Longest matching key length (so multi-char keys like "1a" win over "1").
const MAX_KEY_LEN = Math.max(...Object.keys(TRANSLITERATION).map((k) => k.length));

function transliterate(input: string): string {
    const chars = Array.from(input);
    let out = '';
    let i = 0;
    while (i < chars.length) {
        let matched = false;
        for (let len = MAX_KEY_LEN; len >= 1; len--) {
            const token = chars.slice(i, i + len).join('');
            if (token in TRANSLITERATION) {
                out += TRANSLITERATION[token];
                i += len;
                matched = true;
                break;
            }
        }
        if (!matched) {
            out += chars[i];
            i++;
        }
    }
    return out;
}

const FONTS = [
    { label: 'Segoe UI Historic', family: '"Segoe UI Historic"' },
    { label: 'Noto Sans Phoenician (system)', family: '"Noto Sans Phoenician"' },
    { label: 'Noto Sans Phoenician (bundled)', family: '"Noto Sans Phoenician Local"' },
    { label: 'inherit', family: 'inherit' },
] as const;

type Direction = 'ltr' | 'rtl' | 'default';

const DIRECTIONS: { value: Direction; label: string }[] = [
    { value: 'ltr', label: 'LTR' },
    { value: 'default', label: 'Default' },
    { value: 'rtl', label: 'RTL' },
];

export default function PaleoHebrewWidget() {
    const [input, setInput] = useState('');
    const [fontSize, setFontSize] = useState(48);
    const [direction, setDirection] = useState<Direction>('default');
    const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

    const toggleCollapsed = (label: string) =>
        setCollapsed((prev) => ({ ...prev, [label]: !prev[label] }));

    const phoenician = useMemo(() => transliterate(input), [input]);

    const dirStyle: React.CSSProperties =
        direction === 'default' ? {} : { direction, unicodeBidi: 'bidi-override' };

    return (
        <div className="container py-4">
            <h4 className="mb-3">Phoenician/Paleo Hebrew Font Renderer</h4>

            <div className="mb-3">
                <label className="form-label">Latin transliteration</label>
                <textarea
                    className="form-control font-monospace"
                    placeholder="e.g.  'bgdhw"
                    rows={3}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    autoFocus
                />
            </div>

            <div className="mb-3 d-flex align-items-center gap-3 flex-wrap">
                <label className="form-label mb-0 text-nowrap">
                    Font size: {fontSize}px
                </label>
                <input
                    type="range"
                    className="form-range flex-grow-1"
                    min={12}
                    max={128}
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                />
            </div>

            <div className="mb-4 d-flex align-items-center gap-3">
                <span className="form-label mb-0">Direction:</span>
                <div className="btn-group" role="group">
                    {DIRECTIONS.map(({ value, label }) => (
                        <label
                            key={value}
                            className={`btn btn-sm ${direction === value ? 'btn-primary' : 'btn-outline-secondary'}`}
                        >
                            <input
                                type="radio"
                                className="btn-check"
                                name="direction"
                                checked={direction === value}
                                onChange={() => setDirection(value)}
                            />
                            {label}
                        </label>
                    ))}
                </div>
            </div>

            <div className="row g-3">
                {FONTS.map(({ label, family }) => {
                    const isCollapsed = collapsed[label];
                    return (
                        <div className="col-12" key={label}>
                            <div className="card">
                                <button
                                    type="button"
                                    className="card-header d-flex justify-content-between align-items-center w-100 border-0 bg-transparent text-start"
                                    onClick={() => toggleCollapsed(label)}
                                    aria-expanded={!isCollapsed}
                                >
                                    <code>{label}</code>
                                    <span className="text-muted">{isCollapsed ? '▸' : '▾'}</span>
                                </button>
                                {!isCollapsed && (
                                    <div
                                        className="card-body"
                                        style={{
                                            fontFamily: family,
                                            fontSize: `${fontSize}px`,
                                            lineHeight: 1.6,
                                            overflowX: 'auto',
                                            minHeight: '4rem',
                                            wordBreak: 'break-all',
                                            whiteSpace: 'pre-wrap',
                                            ...dirStyle,
                                        }}
                                    >
                                        {phoenician || (
                                            <span className="text-muted" style={{ fontSize: '1rem' }}>
                                                type something above…
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <h3>Transliteration reference</h3>
            <div className="row mt-2 font-monospace" style={{ fontSize: '0.85rem' }}>
                <div className="col-md-6">
                    <h6>Consonants</h6>
                    <pre className="mb-0">{`'  → 𐤀 ALF       b → 𐤁 BET       g → 𐤂 GAML
d  → 𐤃 DELT      h → 𐤄 HE        w → 𐤅 WAU
z  → 𐤆 ZAYIN     x → 𐤇 HET       T → 𐤈 TET
y  → 𐤉 YOD       k → 𐤊 KAF       l → 𐤋 LAMD
m  → 𐤌 MEM       n → 𐤍 NUN       s → 𐤎 SEMK
A  → 𐤏 AIN       p → 𐤐 PE        S → 𐤑 SADE
q  → 𐤒 QOF       r → 𐤓 ROSH      j → 𐤔 SHIN
t  → 𐤕 TAW`}</pre>
                </div>
                <div className="col-md-3">
                    <h6>Numbers</h6>
                    <pre className="mb-0">{`a → 𐤖 ONE
i → 𐤗 TEN
u → 𐤘 TWENTY
o → 𐤙 HUNDRED`}</pre>
                </div>
                <div className="col-md-3">
                    <h6>Diacritics</h6>
                    <pre className="mb-0">{`0  → ◌̣  DOT BELOW
1  → ◌̇  DOT ABOVE
2  → ◌̈  DIAERESIS
3  → ◌᪴  TRIPLE DOT
-  → ◌̄  MACRON
_  → ◌̱  UNDERMACRON
v  → ◌̌  CARON
^  → ◌̂  CIRCUMFLEX
1a → ◌َ  FATHA
2a → ◌ِ  KASRA
3a → ◌ُ  DAMMA
1h → ◌ַ  PATACH
2h → ◌ִ  HIRIQ
3h → ◌ֻ  QUBUTS
|  → 𐤟  WORD SEP`}</pre>
                </div>
            </div>
        </div>
    );
}


const PaleoHebrewFontPage = () => <ArticleLayout>{
    ({ Citation, CitationBank }) => {
        return <PaleoHebrewWidget />
    }
}</ArticleLayout>


// Bootstrap CSS & JS
import '../styles/style.scss';
import 'bootstrap/dist/js/bootstrap';

import { createRoot } from 'react-dom/client';
import ArticleLayout from '../components/ArticleLayout';

const root = createRoot(document.getElementById('root')!);
root.render(
    <React.StrictMode>
        <PaleoHebrewFontPage />
    </React.StrictMode>,
);
