// @method
// @name iframedMarkup
//
// @author dan.west@chrometoaster.com
//
// @summary
//  Copy of kss-node's markup handlebars helper with additional assets added.
//
// @returns string
//
// @description
//  In order to facilitate responsive component presentation we need to generate a full set of the
//  the components markup with any assets (css and javascript). This is then added to the iframe's
//  srcdoc attribute.

var fs = require('fs');

var Kss = require(__dirname + '/../../node_modules/kss/lib/kss.js');

var addJs;


// This file is required for psedo state style generation
fs.readFile(__dirname + '/../public/js/kss.js', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }
    addJs = '<script>' + data + '</script>';
});

module.exports.register = function(handlebars, config) {
    config = config || {};

    handlebars.registerHelper('iframedMarkup', function(options) {
        var partials = options.data.root.partials,
            scripts = options.data.root.scripts,
            section,
            modifier = false,
            template,
            partial,
            data,
            styles = options.data.root.styles;

        if (!this) {
            return '';
        }

        // Determine if the element is a section object or a modifier object.
        if (this.modifiers) {
            // If this is the section object, use the default markup without a modifier class.
            section = new Kss.KssSection(this);
        } else {
            // If this is the markup object, find the modifier class and the section object.
            modifier = new Kss.KssModifier(this);
            section = modifier.section();
        }

        // Load the information about this section's markup partial.
        partial = partials[section.reference()];


        // Prepare the sample data for the partial.
        data = JSON.parse(JSON.stringify(partial.data));
        /* eslint-disable camelcase */
        if (data.modifier_class) {
            data.modifier_class += ' ';
        } else {
            data.modifier_class = '';
        }
        // Display the modifier's classname or, if a section, the placeholder text
        // if this section has modifiers.
        if (modifier) {
            data.modifier_class += modifier.className();
        } else if (section.firstModifier() !== false) {
            data.modifier_class += config.placeholder;
        }
        /* eslint-enable camelcase */

        // Compile the section's markup partial into a template.
        template = handlebars.compile('{{> "' + partial.name + '"}}');
        // We don't wrap the rendered template in "new handlebars.SafeString()" since
        // we want the ability to display it as a code sample with {{ }} and as
        // rendered HTML with {{{ }}}.

        // force fonts to load
        var markup = template(data);
        markup = '<div class="fonts-stage-2">' + markup + '</div>'

        // concat the styles, markup and JS
        var iframeSrc = styles + markup + addJs + scripts;

        return iframeSrc;
    });
};
