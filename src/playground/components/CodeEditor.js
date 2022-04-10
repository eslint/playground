import React from "react";
import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from "@codemirror/view";
import { history } from "@codemirror/history";
import { tags as t, HighlightStyle} from "@codemirror/highlight"
import { bracketMatching } from "@codemirror/matchbrackets";
import { javascript, esLint } from '@codemirror/lang-javascript';
import { linter } from "../utils/codemirror-linter-extension";
import { Linter as ESLint } from "../node_modules/eslint/lib/linter/";
import "../scss/editor.scss";

export default function CodeEditor({ codeValue, onUpdate, errors, eslintOptions, ...props}) {
    const myHighlightStyle = HighlightStyle.define([
            {
                tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName],
                color: "var(--link-color)"
            },
            {
                tag: t.strong,
                fontWeight: "bold"
            },
            {
                tag: t.emphasis,
                fontStyle: "italic"
            },
            {
                tag: t.strikethrough,
                textDecoration: "line-through"
            },
            {
                tag: t.heading,
                fontWeight: "bold",
                color: "var(--headings-color)"
            }
    ]);

    return (
        <>
            <CodeMirror
                value={codeValue}
                minWidth="100%"
                height="100%"
                autoFocus={true}
                theme="dark"
                extensions={
                    [
                        history(),
                        bracketMatching(),
                        myHighlightStyle,
                        linter(esLint(new ESLint(), eslintOptions), { delay: 0}),
                        javascript(),
                        EditorView.theme(
                            {
                                "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
                                    backgroundColor: "var(--color-primary-800)",
                                    color: "#fff",
                                    outline: "1px solid #515a6b"
                                },
                            }
                        ),
                    ]
                }
                onChange={(value) => {
                    onUpdate(value);
                }}
            />
        </>
    );
}
