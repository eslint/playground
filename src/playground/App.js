import "regenerator-runtime/runtime";

import React, { useState } from "react";
import Alert from "./components/Alert";
import Footer from "./components/Footer";
import CodeEditor from "./components/CodeEditor";
import { Linter, SourceCodeFixer } from "./node_modules/eslint/lib/linter/";
import Unicode from "./utils/unicode";
import Configuration from "./components/Configuration";

const linter = new Linter();
const rules = linter.getRules();
const ruleNames = Array.from(rules.keys());
const rulesMeta = Array.from(rules.entries()).reduce((result, [key, value]) => {
    result[key] = value.meta;
    return result;
}, {});

const getUrlState = () => {
    try {
        return JSON.parse(Unicode.decodeFromBase64(window.location.hash.replace(/^#/u, "")));
    } catch {
        return {};
    }
};

const hasLocalStorage = () => {
    try {
        window.localStorage.setItem("localStorageTest", "foo");
        window.localStorage.removeItem("localStorageTest");
        return true;
    } catch {
        return false;
    }
};

const App = () => {
    const { text: storedText, options: storedOptions } = JSON.parse(window.localStorage.getItem("linterDemoState") || "{}");
    const { text: urlText, options: urlOptions } = getUrlState();

    const [text, setText] = useState(urlText || storedText || `/* eslint quotes: ["error", "double"] */\nconst a = 'b';`);
    const [fix, setFix] = useState(false);
    const [options, setOptions] = useState(
        urlOptions || storedOptions || {
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "script",
                ecmaFeatures: {}
            },
            rules: [...rules.entries()].reduce((result, [ruleId, rule]) => {
                if (rule.meta.docs.recommended) {
                    result[ruleId] = ["error"];
                }
                return result;
            }, {}),
            env: {
                es6: true
            }
        }
    );

    const lint = () => {
        try {
            const { messages, output } = linter.verifyAndFix(text, options, { fix });
            let fatalMessage;

            if (messages && messages.length > 0 && messages[0].fatal) {
                fatalMessage = messages[0];
            }

            return {
                messages,
                output,
                fatalMessage
            };
        } catch (error) {
            return {
                messages: [],
                output: text,
                error
            };
        }
    }

    const storeState = ({ newText, newOptions }) => {
        const serializedState = JSON.stringify({ text: newText || text, options: newOptions || options });

        if (hasLocalStorage()) {
            window.localStorage.setItem("linterDemoState", serializedState);
        }

        window.location.hash = Unicode.encodeToBase64(serializedState);
    }

    const { messages, output, fatalMessage } = lint();
    const isInvalidAutofix = fatalMessage && text !== output;
    const sourceCode = linter.getSourceCode();

    const onFix = (message) => {
        const { fix } = message;

        if (fix && message.fix) {
            const { output: fixedCode } = SourceCodeFixer.applyFixes(text, [message], true);
            setText(fixedCode);
            storeState({ newText: fixedCode});
        }
    }

    const updateOptions = (newOptions) => {
        setOptions(newOptions);
        storeState({ newOptions });
    };

    return (
        <div className="playground-wrapper">
            <div className="playground__config-and-footer">
                <section className="playground__config" aria-labelledby="playground__config-toggle">
                    <button className="playground__config-toggle" id="playground__config-toggle" hidden>
                        <span>Configuration</span>
                        <svg width="20" height="20" viewBox="20 20 60 60" aria-hidden="true" focusable="false">
                            <path id="ham-top" d="M30,37 L70,37 Z" stroke="currentColor"></path>
                            <path id="ham-middle" d="M30,50 L70,50 Z" stroke="currentColor"></path>
                            <path id="ham-bottom" d="M30,63 L70,63 Z" stroke="currentColor"></path>
                        </svg>
                    </button>
                    <span className="visually-hidden" id="infobox">Changing configurations will apply the selected changes to the playground.</span>
                    <div className="playground__config-options" id="playground__config-options" data-open="false">
                        <Configuration
                            ruleNames={ruleNames}
                            options={options}
                            onUpdate={updateOptions}
                            rulesMeta={rulesMeta}
                            eslintVersion={linter.version}
                        />
                        <Footer />
                    </div>
                </section>
            </div>

            <div className="playground__main">
                <main className="playground__editor" id="main" tabIndex="0" aria-label="Editor">
                    <CodeEditor
                        codeValue={text}
                        errors={messages}
                        eslintOptions={options}
                        onUpdate={(value) => {
                            setFix(false);
                            setText(value);
                            storeState({ newText: value});
                        }}
                        getIndexFromLoc={sourceCode && sourceCode.getIndexFromLoc.bind(sourceCode)}
                    />
                </main>
                <section className="playground__console" aria-labelledby="playground__console-label">
                    {/* <div className="playground__console-announcements visually-hidden" aria-live="polite" aria-atomic="true">
                        2 warnings and 1 error logged to the console.
                    </div> */}

                    {
                        isInvalidAutofix && <Alert type="error" text={`Invalid autofix! ${fatalMessage.message}`} />
                    }
                    {messages.length > 0 && messages.map((message) => (
                        message.suggestions ?  (
                            <Alert 
                                key={`${message.ruleId}-${message.line}-${message.column}`}
                                type={message.severity === 2 ? 'error' : 'warning'}
                                message={message}
                                suggestions={message.suggestions}
                                onFix={onFix}
                            />
                        ) : (
                                <Alert
                                    key={`${message.ruleId}-${message.line}-${message.column}`}
                                    type={message.severity === 2 ? 'error' : 'warning'}
                                    message={message}
                                    onFix={onFix}
                                />
                        )
                    ))}
                </section>
            </div>
        </div>
    )
};

export default App;
