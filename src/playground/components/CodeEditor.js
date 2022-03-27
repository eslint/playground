import React from "react";
import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from "@codemirror/view";
import { history } from "@codemirror/history";
import { tags as t, HighlightStyle} from "@codemirror/highlight"
import { bracketMatching } from "@codemirror/matchbrackets";
import { javascript, esLint } from '@codemirror/lang-javascript';
import { linter } from "@codemirror/lint";
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
                minHeight="100%"
                //theme={localStorage.getItem("theme") }
                autoFocus={true}
                
                extensions={
                    [
                        history(),
                        bracketMatching(),
                        myHighlightStyle,
                        linter(esLint(new ESLint(), eslintOptions)),
                        // lintGutter(),
                        javascript(),
                        EditorView.theme(
                            {
                                ".cm-editor": {
                                    minHeight: "100%",
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
                                ".cm-activeLine, .cm-activeLineGutter": {
                                    backgroundColor: "var(--body-background-color)",
                                    caretColor: "var(--color-primary-500)"
                                },
                                ".cm-line": {
                                    caretColor: "var(--color-primary-500)"
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
