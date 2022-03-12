import React, { useState } from "react";

import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";

import "../css/editor.css";


const code = `function add(a, b) {
  return a + b;
}

const a = 123;
`;

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

export default function CodeEditor() {
    const [codeValue, setCodeValue] = useState(code);

    return (
        <Editor
            value={codeValue}
            onValueChange={code => setCodeValue(code)}
            highlight={code => hightlightWithLineNumbers(code, languages.js)}
            padding={10}
            textareaId="codeArea"
            className="editor"
            style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 18,
                outline: 0
            }}
        />
    );
}

