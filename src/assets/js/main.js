// helper functions
// get an element's next sibling that matches a selector
var getNextSibling = function(elem, selector) {
    var sibling = elem.nextElementSibling;
    while (sibling) {
        if (sibling.matches(selector)) return sibling;
        sibling = sibling.nextElementSibling
    }
};

// get an element's closest ancestor that matches a selector
var getClosest = function (elem, selector) {
	// Element.matches() polyfill
	if (!Element.prototype.matches) {
	    Element.prototype.matches =
	        Element.prototype.matchesSelector ||
	        Element.prototype.mozMatchesSelector ||
	        Element.prototype.msMatchesSelector ||
	        Element.prototype.oMatchesSelector ||
	        Element.prototype.webkitMatchesSelector ||
	        function(s) {
	            var matches = (this.document || this.ownerDocument).querySelectorAll(s),
	                i = matches.length;
	            while (--i >= 0 && matches.item(i) !== this) {}
	            return i > -1;
	        };
	}

	// Get the closest matching element
	for ( ; elem && elem !== document; elem = elem.parentNode ) {
		if ( elem.matches( selector ) ) return elem;
	}
	return null;

};

// general function that handles all toggles and panels that are created as siblings in the DOM, and have the data-toggle and data-panel set on them
// for example: the alerts that show up in the console use this pattern
(function() {
    var triggers = document.querySelectorAll("[data-toggle]");

    // if (triggers) {
        triggers.forEach(trigger => {
            trigger.removeAttribute('hidden');
            let panel = getNextSibling(trigger, '[data-panel]');
            var open = false;

            trigger.addEventListener("click", () => {

                if (!open) {
                    trigger.setAttribute("aria-expanded", "true");
                    panel.removeAttribute("hidden");
                    open = true;
                } else {
                    trigger.setAttribute("aria-expanded", "false");
                    panel.setAttribute("hidden", "");
                    open = false;
                }
            }, false);
        })
    // }
})();

// the popups have a similar pattern to the previous toggle+panel pattern, but the toggle and panel are _not_ siblings n the DOM (for styling purposes), so this script specifically handles the popup option panels
(function() {
    var popup_fix_buttons = document.querySelectorAll(".popup__fix-btn");

    if (popup_fix_buttons) {
        popup_fix_buttons.forEach(trigger => {
            trigger.removeAttribute('hidden');
            let popup = getClosest(trigger, '.popup');
            let panel = popup.querySelector('#js-popup-fix-options');
            panel.setAttribute('hidden', '');
            var open = false;

            trigger.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();

                if (!open) {
                    trigger.setAttribute("aria-expanded", "true");
                    panel.removeAttribute("hidden");
                    open = true;
                } else {
                    trigger.setAttribute("aria-expanded", "false");
                    panel.setAttribute("hidden", "");
                    open = false;
                }
            }, false);
        })
    }
})();

// main nav responsive behavior (open/close using the nav button)
(function() {
    var nav_trigger = document.getElementById("nav-toggle"),
        nav = document.getElementById("nav-panel"),
        open = false;

    if (matchMedia) {
        const mq = window.matchMedia("(max-width: 1023px)");
        mq.addListener(WidthChange);
        WidthChange(mq);
    }

    // media query change
    function WidthChange(mq) {
        if (mq.matches) {
            nav.setAttribute("data-open", "false");
            nav_trigger.removeAttribute("hidden");
            nav_trigger.setAttribute("aria-expanded", "false");
            nav_trigger.addEventListener("click", togglenav, false);
        } else {
            nav.setAttribute("data-open", "true");
            nav_trigger.setAttribute("hidden", "");
            nav_trigger.setAttribute("aria-expanded", "true");
        }

    }

    function togglenav(e) {
        if (!open) {
            this.setAttribute("aria-expanded", "true");
            nav.setAttribute("data-open", "true");
            open = true;
        } else {
            this.setAttribute("aria-expanded", "false");
            nav.setAttribute("data-open", "false");
            open = false;
        }
    }
})();

// the mobile toggle behavior for the playground configuration
(function() {
    var config_trigger = document.getElementById("playground__config-toggle"),
        config = document.getElementById("playground__config-options"),
        body = document.getElementsByTagName("body")[0],
        open = false;

    if (matchMedia) {
        const mq = window.matchMedia("(max-width: 1023px)");
        mq.addListener(WidthChange);
        WidthChange(mq);
    }

    // media query change
    function WidthChange(mq) {
        if (mq.matches) {
            config_trigger.removeAttribute("hidden");
            config_trigger.setAttribute("aria-expanded", "false");
            config.setAttribute("data-open", "false");

            config.setAttribute("data-open", "false");
            config_trigger.addEventListener("click", toggleconfig, false);
        } else {
            config_trigger.setAttribute("hidden", "");
            config_trigger.setAttribute("aria-expanded", "true");
            config.setAttribute("data-open", "true");

            config.setAttribute("data-open", "true");
            config_trigger.addEventListener("click", toggleconfig, false);
        }

    }

    function toggleconfig(e) {
        if (!open) {
            this.setAttribute("aria-expanded", "true");
            config.setAttribute("data-open", "true");
            open = true;
        } else {
            this.setAttribute("aria-expanded", "false");
            config.setAttribute("data-open", "false");
            open = false;
        }
    }
})();

//  helpful utilities
var util = {
    keyCodes: {
        UP: 38,
        DOWN: 40,
        LEFT: 37,
        RIGHT: 39,
        HOME: 36,
        END: 35,
        ENTER: 13,
        SPACE: 32,
        DELETE: 46,
        TAB: 9,
    },

    generateID: function(base) {
        return base + Math.floor(Math.random() * 999);
    },

    getDirectChildren: function(elm, selector) {
        return Array.prototype.filter.call(elm.children, function(child) {
            return child.matches(selector);
        });
    },
};

// make sections in the config section collapsible
// enhances the headings in the config sections into buttons and handles the toggling of their respective panels
(function(w, doc, undefined) {
    var CollapsibleConfigOptions = {
        allCollapsed: false,
        icon: '<svg class="config-icon" width="12" height="8" aria-hidden="true" focusable="false" viewBox="0 0 12 8"><g fill="none"><path fill="currentColor" d="M1.41.59l4.59 4.58 4.59-4.58 1.41 1.41-6 6-6-6z"/><path d="M-6-8h24v24h-24z"/></g></svg>',
    };
    var CollapsibleConfig = function(inst, options) {
        var _options = Object.assign(CollapsibleConfigOptions, options);
        var el = inst;
        var configToggles = el.querySelectorAll(".playground__config-options [data-config-section-title]");
        var configPanels = el.querySelectorAll(".playground__config-options [data-config-section]");
        var accID = util.generateID("c-config-");

        var init = function() {
            el.classList.add("config-js");

            setupconfigToggles(configToggles);
            setupconfigPanels(configPanels);
        };


        var setupconfigToggles = function(configToggles) {
            Array.from(configToggles).forEach(function(item, index) {
                var $this = item;
                let text = $this.innerText;
                let headingButton = document.createElement("button");
                if (_options.allCollapsed) headingButton.setAttribute("aria-expanded", "false");
                else headingButton.setAttribute("aria-expanded", "true");
                headingButton.setAttribute("data-config-section-toggle", "");
                headingButton.setAttribute("id", accID + "__heading-" + index);
                headingButton.setAttribute(
                    "aria-controls",
                    accID + "__panel-" + index
                );
                headingButton.innerText = text;
                $this.innerHTML = "";
                $this.appendChild(headingButton);
                headingButton.innerHTML += _options.icon;

                headingButton.addEventListener("click", function(e) {
                    e.preventDefault();
                    togglePanel(headingButton);
                }, true);
            });
        };

        var setupconfigPanels = function(configPanels) {
            Array.from(configPanels).forEach(function(item, config) {
                let $this = item;

                $this.setAttribute("id", accID + "__panel-" + config);
                $this.setAttribute(
                    "aria-labelledby",
                    accID + "__item-" + config
                );
                if (_options.allCollapsed) $this.setAttribute("hidden", "");
                else $this.removeAttribute("hidden");
            });
        };

        var togglePanel = function(toggleButton) {
            var thepanel = toggleButton.parentNode.nextElementSibling;

            if (toggleButton.getAttribute("aria-expanded") == "true") {
                toggleButton.setAttribute("aria-expanded", "false");
                thepanel.setAttribute("hidden", "");
            } else {
                toggleButton.setAttribute("aria-expanded", "true");
                thepanel.removeAttribute("hidden");
            }
        };


        init.call(this);
        return this;
    }; // CollapsibleConfig()

    w.CollapsibleConfig = CollapsibleConfig;
})(window, document);

// init
var config = document.getElementById('playground__config-options');
if (config) {
    config = new CollapsibleConfig(config, {
        allCollapsed: true
    });
}
