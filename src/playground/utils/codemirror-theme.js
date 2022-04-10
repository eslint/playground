import {EditorView} from "@codemirror/view"
import {HighlightStyle, tags as t} from "@codemirror/highlight"

export const ESLintPlaygroundTheme = EditorView.theme({
  ".cm-content": {
    caretColor: "var(--link-color)"
  },
  "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
       backgroundColor: "var(--color-primary-800)",
       color: "#fff",
       outline: "1px solid #515a6b"
   },
   ".cm-content": {
       caretColor: "var(--link-color)"
   },
   ".cm-cursor, .cm-dropCursor": {
       borderLeftColor: "var(--link-color)"
   },
}, { dark: true });

/// The highlighting style for code in the One Dark theme.
export const ESLintPlaygroundHighlightStyle = HighlightStyle.define([
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

export const ESLintPlayground = [ESLintPlaygroundTheme, ESLintPlaygroundHighlightStyle]