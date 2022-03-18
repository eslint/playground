import React from "react";

import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
// TODO: Fix theme for light & dark mode toggle
// import "prismjs/themes/prism.css";

import "../css/editor.css";

function debounce(func, wait, immediate) {
    let timeout;

    return function (...args) {
        const context = this; // eslint-disable-line no-invalid-this

        function later() {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        }
        const callNow = immediate && !timeout;

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
            func.apply(context, args);
        }
    };
}

const hightlightWithLineNumbers = (input, language) =>
    highlight(input, language)
        .split("\n")
        .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
        .join("\n");

export default function CodeEditor({codeValue, onValueChange,  ...props}) {
    return (
        <Editor
            value={codeValue}
            onValueChange={onValueChange}
            highlight={code => hightlightWithLineNumbers(code, languages.js)}
            padding={10}
            textareaId="codeArea"
            className="editor"
            style={{
                fontFamily: `var(--mono-font), Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace`,
                fontSize: "1em",
                outline: 0
            }}
        />
    );
}
