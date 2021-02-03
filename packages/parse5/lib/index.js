'use strict';

const Parser = require('./parser');
const Serializer = require('./serializer');

const Shorthands = {
    parse(html, options) {
        const parser = new Parser(options);
    
        return parser.parse(html);
    },
    
    parseFragment(fragmentContext, html, options) {
        if (typeof fragmentContext === 'string') {
            options = html;
            html = fragmentContext;
            fragmentContext = null;
        }
    
        const parser = new Parser(options);
    
        return parser.parseFragment(html, fragmentContext);
    },
    
    serialize(node, options) {
        const serializer = new Serializer(node, options);
    
        return serializer.serialize();
    }
};

module.exports = Shorthands;