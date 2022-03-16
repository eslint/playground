import React from "react";
import ShareURL from "./ShareURL";

export default function Configuration() {
    return (
        <div className="playground__config-options__sections">
            <div className="playground__config-options__section">
                <ShareURL url={window.location}/>
            </div>
            <div className="playground__config-options__section">
                <h2 data-config-section-title className="title-toggle">Versioning and Config</h2>
                <div data-config-section>
                    <div className="c-field-group">
                        <label className="c-field" for="eslint-version">
                            <span className="label__text">ESLint Version</span>
                            <select name="eslint-version" id="eslint-version" className="c-custom-select">
                                <option value="one" selected>One</option>
                                <option value="two">two</option>
                                <option value="three">three</option>
                            </select>
                        </label>
                        <label className="c-field" for="ecma-version">
                            <span className="label__text">ECMA Version</span>
                            <select name="ecma-version" id="ecma-version" className="c-custom-select">
                                <option value="one" selected>One</option>
                                <option value="two">two</option>
                                <option value="three">three</option>
                            </select>
                        </label>
                    </div>
                    <label className="c-field" for="source-type">
                        <span className="label__text">Source Type</span>
                        <select name="source-type" id="source-type" className="c-custom-select">
                            <option value="one" selected>One</option>
                            <option value="two">two</option>
                            <option value="three">three</option>
                        </select>
                    </label>
                    <div className="combo">
                        <label id="ecma-combo-label" className="label__text">ECMA Features</label>
                        <span id="combo-remove" hidden>remove</span>
                        <ul role="list" className="selected-options pills" id="ecma-combo-selected"></ul>
                        <div className="combo js-multiselect">
                            <input aria-activedescendant="" autocomplete="off" aria-autocomplete="none" aria-controls="listbox3" aria-expanded="false" aria-haspopup="listbox" aria-labelledby="ecma-combo-label combo-selected" id="ecma-combo" className="combo-input c-field__input custom-select" role="combobox" type="text" placeholder="Choose features" />
                            <div className="combo-menu" role="listbox" id="listbox3"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="playground__config-options__section">
                <h2 data-config-section-title>Environments</h2>
                <div data-config-section>
                    {/* <!-- <label className="c-checkbox c-field" for="env-select-all">
                                            <input type="checkbox" id="env-select-all">
                                            <span class ="label__text">Enable all</span>
                                            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="none" class ="c-checkbox__icon">
                                            <rect x="0.5" y="0.5" width="15" height="15" rx="3.5" fill="var(--lightest-background-color)" />
                                            <path class ="cm" d="M12 5L6.5 10.5L4 8" stroke="transparent" stroke-width="1.6666" stroke-linecap="round" stroke-linejoin="round" />
                                            <rect class ="border" x="0.5" y="0.5" width="15" height="15" rx="3.5" stroke="var(--border-color)" />
                                            </svg>
                                        </label> --> */}
                    <div className="combo">
                        <label id="environments-combo-label" className="combo-label visually-hidden">Select Environments</label>
                        <span id="combo-remove" hidden>remove</span>
                        <ul role="list" className="selected-options pills" id="environments-combo-selected"></ul>
                        <div className="combo js-multiselect">
                            <input aria-activedescendant="" autocomplete="off" aria-autocomplete="none" aria-controls="listbox3" aria-expanded="false" aria-haspopup="listbox" aria-labelledby="environments-combo-label combo-selected" id="environments-combo" className="combo-input c-field__input custom-select" role="combobox" type="text" placeholder="Choose enviroments" />
                            <div className="combo-menu" role="listbox" id="listbox3"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="playground__config-options__section playground__config-options__section--rules">
                <h2 data-config-section-title>Rules</h2>
                <div data-config-section>
                    <label for="rules" className="combo-label"><span className="label__text">Choose a rule</span></label>
                    <div className="combo js-combobox">
                        <input
                            aria-activedescendant=""
                            aria-autocomplete="none"
                            aria-controls="rules_list"
                            aria-expanded="false"
                            aria-haspopup="listbox"
                            id="rules"
                            className="combo-input custom-select c-field__input code"
                            role="combobox"
                            type="text"
                        />
                        <div className="combo-menu" role="listbox" id="rules_list"></div>
                    </div>
                    <button role="button" className="c-btn c-btn--ghost add-rule-btn">Add this rule</button>
                    <ul className="config__added-rules" role="list" aria-labelledby="added-rules-label">
                        <h3 id="added-rules-label" hidden> Added rules</h3>
                        <li className="config__added-rules__item">
                            <h4 className="config__added-rules__rule-name">accessor-pairs</h4>
                            <div className="config__added-rules__rule-content" contenteditable="true">
                                {`{setWithoutGet: true, getWithoutSet: false, enforceForClassMembers: true }`}
                            </div>
                        </li>
                        <li className="config__added-rules__item">
                            <h4 className="config__added-rules__rule-name">array-bracket-newline</h4>
                            <div className="config__added-rules__rule-content" contenteditable="true">
                                "always"
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="playground__config-options__section">
                <h2 data-config-section-title>Plugins</h2>
                <div data-config-section>
                    {/* <!-- <label className="c-checkbox c-field" for="plugins-select-all">
                                            <input type="checkbox" id="plugins-select-all">
                                            <span class ="label__text">Install plugins</span>
                                            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="none" class ="c-checkbox__icon">
                                            <rect x="0.5" y="0.5" width="15" height="15" rx="3.5" fill="var(--lightest-background-color)" />
                                            <path class ="cm" d="M12 5L6.5 10.5L4 8" stroke="transparent" stroke-width="1.6666" stroke-linecap="round" stroke-linejoin="round" />
                                            <rect class ="border" x="0.5" y="0.5" width="15" height="15" rx="3.5" stroke="var(--border-color)" />
                                            </svg>
                                        </label> --> */}
                    <div className="combo">
                        <label id="plugins-combo-label" className="combo-label visually-hidden">Select plugins</label>
                        <span id="combo-remove" hidden>remove</span>
                        <ul role="list" className="selected-options pills" id="plugins-combo-selected"></ul>
                        <div className="combo js-multiselect">
                            <input aria-activedescendant="" autocomplete="off" aria-autocomplete="none" aria-controls="listbox3" aria-expanded="false" aria-haspopup="listbox" aria-labelledby="plugins-combo-label combo-selected" id="plugins-combo" className="combo-input c-field__input custom-select" role="combobox" type="text" placeholder="Choose plugins" />
                            <div className="combo-menu" role="listbox" id="listbox3"></div>
                        </div>
                    </div>
                </div>
            </div>
            <a href="/" download className="c-btn c-btn--primary playground__config__download-btn">Download this config file</a>
        </div>
    )
}
