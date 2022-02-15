const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {

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

    eleventyConfig.addPassthroughCopy({
        './src/content/**/*.png': "/assets/images"
    });

    eleventyConfig.addPassthroughCopy({
        './src/content/**/*.jpg': "/assets/images"
    });

    eleventyConfig.addPassthroughCopy({
        './src/content/**/*.jpeg': "/assets/images"
    });

    eleventyConfig.addPassthroughCopy({
        './src/content/**/*.svg': "/assets/images"
    });

    eleventyConfig.addPassthroughCopy({
        './src/content/**/*.mp4': "/assets/videos"
    });

    eleventyConfig.addPassthroughCopy({
        './src/content/**/*.pdf': "/assets/documents"
    });

    return {
        passthroughFileCopy: true,

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
