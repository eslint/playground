import React from "react";
import Select from "react-select";
import ShareURL from "./ShareURL";
import { ECMA_FEATURES, ECMA_VERSIONS, SOURCE_TYPES, ENV_NAMES } from "../utils/constants";

export default function Configuration({ docs, eslintVersion, onUpdate, options, ruleNames, ...props }) {
    const sourceTypeOptions = SOURCE_TYPES.map((sourceType) => ({ value: sourceType, label: sourceType }));
    const ECMAFeaturesOptions = ECMA_FEATURES.map((ecmaFeature) => ({ value: ecmaFeature, label: ecmaFeature }));
    const ECMAVersionsOptions = ECMA_VERSIONS.map((ecmaVersion) => ({ value: ecmaVersion === "latest" ? ecmaVersion : Number(ecmaVersion), label: ecmaVersion }));
    const envNamesOptions = ENV_NAMES.map((envName) => ({ value: envName, label: envName }));
    const ruleNamesOptions = ruleNames.map((ruleName) => ({ value: ruleName, label: ruleName }));

    //console.log(options);
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
                            <span className="label__text">{`v${eslintVersion}`}</span>
                            {/* <select name="eslint-version" id="eslint-version" className="c-custom-select">
                                <option value="one" selected>One</option>
                                <option value="two">two</option>
                                <option value="three">three</option>
                            </select> */}
                        </label>
                        <label className="c-field" for="ecma-version">
                            <span className="label__text">ECMA Version</span>
                            <Select
                                isSearchable={false}
                                defaultValue={ECMAVersionsOptions.filter((ecmaVersion) => options.parserOptions.ecmaVersion === ecmaVersion.value)}
                                options={ECMAVersionsOptions}
                                onChange={selected =>{
                                    options.parserOptions.ecmaVersion = selected.value;
                                    onUpdate(options);
                                }}
                            />
                            {/* <select name="ecma-version" id="ecma-version" className="c-custom-select">
                                {ECMA_VERSIONS.map((ECMAVerseion) => (<option value={ECMAVerseion}>{ECMAVerseion}</option>))}
                            </select> */}
                        </label>
                    </div>
                    <label className="c-field" for="source-type">
                        <span className="label__text">Source Type</span>
                        <Select
                            isSearchable={false}
                            defaultValue={sourceTypeOptions.filter((sourceTypeOption) => options.parserOptions.sourceType === sourceTypeOption.value) }
                            options={sourceTypeOptions}
                            onChange={selected => {
                                options.parserOptions.sourceType = selected.value;
                                onUpdate(options);
                            }}
                        />
                        {/* <select name="source-type" id="source-type" className="c-custom-select">
                            {SOURCE_TYPES.map((sourceType) => (<option value={sourceType}>{sourceType}</option>))}
                        </select> */}
                    </label>
                    <div className="combo">
                        <label id="ecma-combo-label" className="label__text">ECMA Features</label>
                        <Select
                            isClearable
                            isMulti
                            defaultValue={ECMAFeaturesOptions.filter((ecmaFeatureName) => options.parserOptions.ecmaFeatures[ecmaFeatureName.value])}
                            isSearchable={false}
                            options={ECMAFeaturesOptions}
                            onChange={selectedOptions => {
                                options.parserOptions.ecmaFeatures = {};
                                selectedOptions.forEach((selected) => {
                                    options.parserOptions.ecmaFeatures[selected.value] = true;
                                })
                                onUpdate(options);
                            }}
                        />
                        {/* <span id="combo-remove" hidden>remove</span>
                        <ul role="list" className="selected-options pills" id="ecma-combo-selected"></ul>
                        <div className="combo js-multiselect">
                            <input aria-activedescendant="" autocomplete="off" aria-autocomplete="none" aria-controls="listbox3" aria-expanded="false" aria-haspopup="listbox" aria-labelledby="ecma-combo-label combo-selected" id="ecma-combo" className="combo-input c-field__input custom-select" role="combobox" type="text" placeholder="Choose features" />
                            <div className="combo-menu" role="listbox" id="listbox3"></div>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className="playground__config-options__section">
                <h2 data-config-section-title>Environments</h2>
                <div data-config-section>
                    <Select
                        isMulti
                        defaultValue={envNamesOptions.filter((envName) => options.env[envName.value])}
                        options={envNamesOptions}
                        onChange={selectedOptions => {
                            options.env = {};
                            selectedOptions.forEach((selected) => {
                                options.env[selected.value] = true;
                            })
                            onUpdate(options);
                        }}
                    />
                </div>
            </div>
            <div className="playground__config-options__section playground__config-options__section--rules">
                <h2 data-config-section-title>Rules</h2>
                <div data-config-section>
                    <label for="rules" className="combo-label"><span className="label__text">Choose a rule</span></label>
                    <Select
                        isClearable
                        isSearchable
                        onChange={selected => {
                            options.rules[selected.value] = ["error"];
                            onUpdate(options);
                        }}
                        options={ruleNamesOptions}
                    />
                    <button role="button" className="c-btn c-btn--ghost add-rule-btn">
                        Add this rule
                    </button>
                    <ul className="config__added-rules" role="list" aria-labelledby="added-rules-label">
                        {options.rules && Object.keys(options.rules).reverse().map((ruleName) => (
                            <li className="config__added-rules__item">
                                <h4 className="config__added-rules__rule-name">{ruleName}</h4>
                                <div className="config__added-rules__rule-content" contenteditable="true">
                                    {JSON.stringify(options.rules[ruleName])}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {/* TODO: Add Plugins */}
            {/* <div className="playground__config-options__section">
                <h2 data-config-section-title>Plugins</h2>
                <div data-config-section>
                     <!-- <label className="c-checkbox c-field" for="plugins-select-all">
                                            <input type="checkbox" id="plugins-select-all">
                                            <span class ="label__text">Install plugins</span>
                                            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="none" class ="c-checkbox__icon">
                                            <rect x="0.5" y="0.5" width="15" height="15" rx="3.5" fill="var(--lightest-background-color)" />
                                            <path class ="cm" d="M12 5L6.5 10.5L4 8" stroke="transparent" stroke-width="1.6666" stroke-linecap="round" stroke-linejoin="round" />
                                            <rect class ="border" x="0.5" y="0.5" width="15" height="15" rx="3.5" stroke="var(--border-color)" />
                                            </svg>
                                        </label> --> 
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
            </div> */}
            <a 
                href={
                    `data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(options, null, 4))}`
                }
                download=".eslintrc.json"
                className="c-btn c-btn--primary playground__config__download-btn"
            >
                Download this config file
            </a>
        </div>
    )
}
