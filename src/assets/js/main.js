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
