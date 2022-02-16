(function() {
    var nav_trigger = document.getElementById("nav-toggle"),
        nav = document.getElementById("nav-panel"),
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


(function() {
    // var switchers = document.querySelectorAll('.switcher'),
    //     fallbacks = document.querySelectorAll('.switcher-fallback');

    // if (fallbacks != null) {
    //     fallbacks.forEach(el => {
    //         el.setAttribute('hidden', '');
    //     });
    // }

    // if (switchers != null) {
    //     switchers.forEach(element => {
    //         element.removeAttribute('hidden');
    //         const select = element.querySelector('select');

    //         select.addEventListener('change', function() {
    //             var selected = this.options[this.selectedIndex];
    //             url = selected.getAttribute('data-url');

    //             window.location.href = url;
    //         })
    //     });
    // }
})();

// add utilities
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
