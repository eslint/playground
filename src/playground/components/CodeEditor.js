import React from "react";
import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from "@codemirror/view";
import { history } from "@codemirror/history";
import { tags as t, HighlightStyle} from "@codemirror/highlight"
import { bracketMatching } from "@codemirror/matchbrackets";
import { javascript, esLint } from '@codemirror/lang-javascript';
import { linter } from "../utils/codemirror-linter-extension";
import { Linter as ESLint } from "../node_modules/eslint/lib/linter/";

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
                height="390px"
                autoFocus={true}
                extensions={
                    [
                        history(),
                        bracketMatching(),
                        myHighlightStyle,
                        linter(esLint(new ESLint(), eslintOptions), { delay: 0}),
                        javascript(),
                        EditorView.theme(
                            {
                                ".cm-editor": {
                                    caretColor: "var(--color-primary-500)"
                                },
                                ".cm-scroller": {
                                    minHeight: "100%",
                                    backgroundColor: "var(--body-background-color)",
                                    border: "1px solid #ced4da",
                                    fontFamily: `var(--mono-font), Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace`,
                                    fontSize: "1em",
                                    color: "var(--body-text-color)"
                                },
                                ".cm-content": {
                                    caretColor: "var(--color-primary-500)"  
                                },
                                ".cm-cursor, .cm-dropCursor": {
                                    borderLeftColor: "var(--link-color)"
                                },
                                "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": {
                                    backgroundColor: "var(--color-primary-800)"
                                },
                                "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
                                    backgroundColor: "var(--color-primary-800)",
                                    color: "#fff",
                                    outline: "1px solid #515a6b"
                                },
                                ".cm-activeLine, .cm-activeLineGutter": {
                                    backgroundColor: "var(--body-background-color)",
                                },
                                ".cm-gutter": {
                                    paddingRight: "1px",
                                    backgroundColor: "var(--body-background-color)",
                                }
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
