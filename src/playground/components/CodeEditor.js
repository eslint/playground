import React from "react";
import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from "@codemirror/view";
import { history } from "@codemirror/history";
import { tags as t, HighlightStyle} from "@codemirror/highlight"
import { bracketMatching } from "@codemirror/matchbrackets";
import { javascript, esLint } from '@codemirror/lang-javascript';
import { linter } from "../utils/codemirror-linter-extension";
import { ESLintPlayground } from "../utils/codemirror-theme";
import { Linter as ESLint } from "../node_modules/eslint/lib/linter/";
import "../scss/editor.scss";

export default function CodeEditor({ codeValue, onUpdate, errors, eslintOptions, ...props}) {
    return (
        <>
            <CodeMirror
                value={codeValue}
                minWidth="100%"
                height="100%"
                autoFocus={true}
                extensions={
                    [
                        history(),
                        bracketMatching(),
                        linter(esLint(new ESLint(), eslintOptions), { delay: 0}),
                        javascript(),
                        ...ESLintPlayground,
                        // EditorView.theme(
                        //     {
                        //         "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
                        //             backgroundColor: "var(--color-primary-800)",
                        //             color: "#fff",
                        //             outline: "1px solid #515a6b"
                        //         },
                        //         ".cm-content": {
                        //             caretColor: "var(--link-color)"
                        //         },
                        //         ".cm-cursor, .cm-dropCursor": {
                        //             borderLeftColor: "var(--link-color)"
                        //         },
                        //     }
                        // ),
                    ]
                }
                onChange={(value) => {
                    onUpdate(value);
                }}
            />
        </>
    );
}
