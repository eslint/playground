const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const yaml = require("js-yaml");

module.exports = function(eleventyConfig) {

    // Load site-specific data
    const siteName = process.env.ESLINT_SITE_NAME || "en";
    eleventyConfig.addGlobalData("site_name", siteName);

    // Support YAML data files
    eleventyConfig.addDataExtension("yml", contents => yaml.load(contents));


    /*****************************************************************************************
     *  Plugins
     * ***************************************************************************************/
    eleventyConfig.addPlugin(syntaxHighlight, {
        alwaysWrapLineHighlights: true,
    });


    eleventyConfig.addWatchTarget("./src/assets/");

    /*****************************************************************************************
     *  File PassThroughs
     * ***************************************************************************************/

    eleventyConfig.addPassthroughCopy({
        "./src/static": "/"
    });

    eleventyConfig.addPassthroughCopy('./src/assets/');

    return {
        passthroughFileCopy: true,

        /*
         * When deployed, this app is loaded from /play and proxied to
         * the correct server. To ensure that URLs are correct, we need
         * to apply a prefix.
         * 
         * To ensure that we can get valid deploy previews, we need to
         * omit the path prefix in that context. `CONTEXT` is an env
         * variable defined by Netlify that specifies where the app
         * is being deployed.
         */
        pathPrefix: process.env.CONTEXT === "deploy-preview" ? "" : "/play",

        markdownTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',

        dir: {
            input: "src",
            includes: "_includes",
            layouts: "_includes/layouts",
            data: "_data",
            output: "_site"
        }
    };
};
