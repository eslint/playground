import React from "react";

export default function Alert({ type, text, message, onFix, options, ...props}) {
    if (!message) {
        return (
            <article aria-roledescription={type} className={`alert alert--${type}`}>
                <div className="alert__content">
                    <div className="alert__position">
                        <svg className="alert__icon" aria-hidden="true" focusable="false" width="19" height="20" viewBox="0 0 19 20" fill="none">
                            <path d="M9.49999 6.66667V10M9.49999 13.3333H9.50832M17.8333 10C17.8333 14.6024 14.1024 18.3333 9.49999 18.3333C4.89762 18.3333 1.16666 14.6024 1.16666 10C1.16666 5.39763 4.89762 1.66667 9.49999 1.66667C14.1024 1.66667 17.8333 5.39763 17.8333 10Z" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <div className="alert__text">
                        {text}
                    </div>
                </div>
            </article>
        );
    }

    const { line, column, message: alertMessage, ruleId } = message;

    return (
        <article aria-roledescription={type} className={`alert alert--${type}`}>
            <div className="alert__content">
                <div className="alert__position">
                    <svg className="alert__icon" aria-hidden="true" focusable="false" width="19" height="20" viewBox="0 0 19 20" fill="none">
                        <path d="M9.49999 6.66667V10M9.49999 13.3333H9.50832M17.8333 10C17.8333 14.6024 14.1024 18.3333 9.49999 18.3333C4.89762 18.3333 1.16666 14.6024 1.16666 10C1.16666 5.39763 4.89762 1.66667 9.49999 1.66667C14.1024 1.66667 17.8333 5.39763 17.8333 10Z" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <span className="visually-hidden">Error</span>
                    <a href="#" className="alert__line-number">
                        <span className="line-number">{line}</span>
                        <span aria-hidden="true">:</span>
                        <span className="colun-number">{column}</span>
                    </a>
                </div>
                <div className="alert__text">
                    {alertMessage}
                    {ruleId && (<a href={`https://eslint.org/docs/rules/${ruleId}`} target="_blank">{ruleId}</a>)}
                </div>
            </div>

            {/*
                keyboard functionality needs to be implemented to make this menu accessible ‼️
                Implementation details: https://w3c.github.io/aria-practices/examples/menu-button/menu-button-actions.html
            */}
            {options ? (
            <>
                    <button className="alert__fix-btn" aria-expanded="false" aria-haspopup="true" id="UNIQUE_BUTTON_ID_2" data-toggle hidden>
                        <span>Fix</span>
                        <svg width="12" height="8" aria-hidden="true" focusable="false" viewBox="0 0 12 8"><g fill="none"><path fill="currentColor" d="M1.41.59l4.59 4.58 4.59-4.58 1.41 1.41-6 6-6-6z" /><path d="M-6-8h24v24h-24z" /></g></svg>
                    </button>
                    <ul className="alert__fix-options" role="menu" aria-labelledby="UNIQUE_BUTTON_ID_2" id="js-fix-options_2" data-panel>
                        <li className="alert__fix-options__item" role="menuitem" tabindex="-1">Fix using this option</li>
                        <li className="alert__fix-options__item" role="menuitem" tabindex="-1">Fix using another option</li>
                        <li className="alert__fix-options__item" role="menuitem" tabindex="-1">Fix using another another option</li>
                        <li className="alert__fix-options__item" role="menuitem" tabindex="-1">ignore this message</li>
                    </ul>
            </>
            ) : (
                    <button onClick={onFix} disabled={true} className="alert__fix-btn">
                        Fix
                    </button>
            )}
        </article>
    )
}
