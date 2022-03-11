import React from "react";
import Footer from "./Footer";
import MonacoEditor from '@uiw/react-monacoeditor';

export default function Editor() {
    return (
        <div class="playground-wrapper">
            <div class="playground__config-and-footer">
                <section class="playground__config" aria-labelledby="playground__config-toggle">
                    <button class="playground__config-toggle" id="playground__config-toggle" hidden>
                        <span>Configuration</span>
                        <svg width="20" height="20" viewBox="20 20 60 60" aria-hidden="true" focusable="false">
                            <path id="ham-top" d="M30,37 L70,37 Z" stroke="currentColor"></path>
                            <path id="ham-middle" d="M30,50 L70,50 Z" stroke="currentColor"></path>
                            <path id="ham-bottom" d="M30,63 L70,63 Z" stroke="currentColor"></path>
                        </svg>
                    </button>
                    <span class="visually-hidden" id="infobox">Changing configurations will apply the selected changes to the playground.</span>
                    <div class="playground__config-options" id="playground__config-options">
                        <div class="playground__config-options__sections">
                            <div class="playground__config-options__section">
                                <h2 data-config-section-title>Share URL</h2>
                                <div data-config-section>
                                    <div class="share-url-wrapper">
                                        <div class="share-url">
                                            <input type="text" id="code-snippet" value="https://play.eslint.org/A5do85Ip" aria-readonly="true" readonly tabindex="-1"/>
                                            <button class ="share-url__btn" id="copyBtn" aria-labelledby="copy-button-label" hidden>
                                            <span hidden id="copy-button-label">Copy URL to clipboard</span>
                                            <svg width="20" height="20" viewBox="0 0 20 20" class ="c-icon" role="img" aria-label="copy" fill="none" focusable="false">
                                            <path d="M4.16667 12.5H3.33333C2.89131 12.5 2.46738 12.3244 2.15482 12.0118C1.84226 11.6993 1.66667 11.2754 1.66667 10.8333V3.33332C1.66667 2.8913 1.84226 2.46737 2.15482 2.15481C2.46738 1.84225 2.89131 1.66666 3.33333 1.66666H10.8333C11.2754 1.66666 11.6993 1.84225 12.0118 2.15481C12.3244 2.46737 12.5 2.8913 12.5 3.33332V4.16666M9.16667 7.49999H16.6667C17.5871 7.49999 18.3333 8.24618 18.3333 9.16666V16.6667C18.3333 17.5871 17.5871 18.3333 16.6667 18.3333H9.16667C8.24619 18.3333 7.5 17.5871 7.5 16.6667V9.16666C7.5 8.24618 8.24619 7.49999 9.16667 7.49999Z" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                            </button>
                                        </div>
                                        <span id="share-url__announcement" class="share-url__announcement" aria-live="polite" aria-atomic="true"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="playground__config-options__section">
                                <h2 data-config-section-title class="title-toggle">Versioning and Config</h2>
                                <div data-config-section>
                                    <div class="c-field-group">
                                        <label class="c-field" for="eslint-version">
                                            <span class="label__text">ESLint Version</span>
                                            <select name="eslint-version" id="eslint-version" class="c-custom-select">
                                                <option value="one" selected>One</option>
                                                <option value="two">two</option>
                                                <option value="three">three</option>
                                            </select>
                                        </label>
                                        <label class="c-field" for="ecma-version">
                                            <span class="label__text">ECMA Version</span>
                                            <select name="ecma-version" id="ecma-version" class="c-custom-select">
                                                <option value="one" selected>One</option>
                                                <option value="two">two</option>
                                                <option value="three">three</option>
                                            </select>
                                        </label>
                                    </div>
                                    <label class="c-field" for="source-type">
                                        <span class="label__text">Source Type</span>
                                        <select name="source-type" id="source-type" class="c-custom-select">
                                            <option value="one" selected>One</option>
                                            <option value="two">two</option>
                                            <option value="three">three</option>
                                        </select>
                                    </label>
                                    <div class="combo">
                                        <label id="ecma-combo-label" class="label__text">ECMA Features</label>
                                        <span id="combo-remove" hidden>remove</span>
                                        <ul role="list" class="selected-options pills" id="ecma-combo-selected"></ul>
                                        <div class="combo js-multiselect">
                                            <input aria-activedescendant="" autocomplete="off" aria-autocomplete="none" aria-controls="listbox3" aria-expanded="false" aria-haspopup="listbox" aria-labelledby="ecma-combo-label combo-selected" id="ecma-combo" class="combo-input c-field__input custom-select" role="combobox" type="text" placeholder="Choose features" />
                                            <div class="combo-menu" role="listbox" id="listbox3"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="playground__config-options__section">
                                <h2 data-config-section-title>Environments</h2>
                                <div data-config-section>
                                    {/* <!-- <label class="c-checkbox c-field" for="env-select-all">
                                        <input type="checkbox" id="env-select-all">
                                        <span class ="label__text">Enable all</span>
                                        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="none" class ="c-checkbox__icon">
                                        <rect x="0.5" y="0.5" width="15" height="15" rx="3.5" fill="var(--lightest-background-color)" />
                                        <path class ="cm" d="M12 5L6.5 10.5L4 8" stroke="transparent" stroke-width="1.6666" stroke-linecap="round" stroke-linejoin="round" />
                                        <rect class ="border" x="0.5" y="0.5" width="15" height="15" rx="3.5" stroke="var(--border-color)" />
                                        </svg>
                                    </label> --> */}
                                    <div class="combo">
                                        <label id="environments-combo-label" class="combo-label visually-hidden">Select Environments</label>
                                        <span id="combo-remove" hidden>remove</span>
                                        <ul role="list" class="selected-options pills" id="environments-combo-selected"></ul>
                                        <div class="combo js-multiselect">
                                            <input aria-activedescendant="" autocomplete="off" aria-autocomplete="none" aria-controls="listbox3" aria-expanded="false" aria-haspopup="listbox" aria-labelledby="environments-combo-label combo-selected" id="environments-combo" class="combo-input c-field__input custom-select" role="combobox" type="text" placeholder="Choose enviroments" />
                                            <div class="combo-menu" role="listbox" id="listbox3"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="playground__config-options__section playground__config-options__section--rules">
                                <h2 data-config-section-title>Rules</h2>
                                <div data-config-section>
                                    <label for="rules" class="combo-label"><span class="label__text">Choose a rule</span></label>
                                    <div class="combo js-combobox">
                                        <input
                                            aria-activedescendant=""
                                            aria-autocomplete="none"
                                            aria-controls="rules_list"
                                            aria-expanded="false"
                                            aria-haspopup="listbox"
                                            id="rules"
                                            class="combo-input custom-select c-field__input code"
                                            role="combobox"
                                            type="text"
                                        />
                                        <div class="combo-menu" role="listbox" id="rules_list"></div>
                                    </div>
                                    <button role="button" class="c-btn c-btn--ghost add-rule-btn">Add this rule</button>
                                    <ul class="config__added-rules" role="list" aria-labelledby="added-rules-label">
                                        <h3 id="added-rules-label" hidden> Added rules</h3>
                                        <li class="config__added-rules__item">
                                            <h4 class="config__added-rules__rule-name">accessor-pairs</h4>
                                            <div class="config__added-rules__rule-content" contenteditable="true">
                                                {/* {setWithoutGet: true, getWithoutSet: false, enforceForClassMembers: true } */}
                                            </div>
                                        </li>
                                        <li class="config__added-rules__item">
                                            <h4 class="config__added-rules__rule-name">array-bracket-newline</h4>
                                            <div class="config__added-rules__rule-content" contenteditable="true">
                                                "always"
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="playground__config-options__section">
                                <h2 data-config-section-title>Plugins</h2>
                                <div data-config-section>
                                    {/* <!-- <label class="c-checkbox c-field" for="plugins-select-all">
                                        <input type="checkbox" id="plugins-select-all">
                                        <span class ="label__text">Install plugins</span>
                                        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="none" class ="c-checkbox__icon">
                                        <rect x="0.5" y="0.5" width="15" height="15" rx="3.5" fill="var(--lightest-background-color)" />
                                        <path class ="cm" d="M12 5L6.5 10.5L4 8" stroke="transparent" stroke-width="1.6666" stroke-linecap="round" stroke-linejoin="round" />
                                        <rect class ="border" x="0.5" y="0.5" width="15" height="15" rx="3.5" stroke="var(--border-color)" />
                                        </svg>
                                    </label> --> */}
                                    <div class="combo">
                                        <label id="plugins-combo-label" class="combo-label visually-hidden">Select plugins</label>
                                        <span id="combo-remove" hidden>remove</span>
                                        <ul role="list" class="selected-options pills" id="plugins-combo-selected"></ul>
                                        <div class="combo js-multiselect">
                                            <input aria-activedescendant="" autocomplete="off" aria-autocomplete="none" aria-controls="listbox3" aria-expanded="false" aria-haspopup="listbox" aria-labelledby="plugins-combo-label combo-selected" id="plugins-combo" class="combo-input c-field__input custom-select" role="combobox" type="text" placeholder="Choose plugins" />
                                            <div class="combo-menu" role="listbox" id="listbox3"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <a href="/" download class="c-btn c-btn--primary playground__config__download-btn">Download this config file</a>
                        </div>
                        <Footer/>
                    </div>
                </section>

            </div>

            <div class="playground__main">
                <main class="playground__editor" id="main" tabindex="0" contenteditable="true" aria-label="Editor">
                    // CODE IS HERE

                    {/* {% from 'components/popup.macro.html' import popup, popup_with_options %}
                    {{ popup_with_options() }} */}
                </main>
                <section class="playground__console" aria-labelledby="playground__console-label">
                    {/* <span id="playground__console-label" hidden>Console</span>
                    <!-- the contents of this live region should update as the warnings and errors logged are updated. It announces to screen readers what has been logged so that they can check them out, instead of announcing each and every warning or error, which can easily turn into a bad experience. -->
                    <div class="playground__console-announcements visually-hidden" aria-live="polite" aria-atomic="true">
                        2 warnings and 1 error logged to the console.
                    </div>
                    {% from 'components/alert.macro.html' import warning, important, alert_with_options %}
                    {{ warning() }}
                    {{ important() }}
                    {{ alert_with_options() }} */}
                </section>
            </div>
        </div>

    );
}
