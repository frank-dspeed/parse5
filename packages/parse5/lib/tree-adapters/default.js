'use strict';

const { DOCUMENT_MODE } = require('../common/html');
const createTextNode = function(value) {
    return {
        nodeName: '#text',
        value: value,
        parentNode: null
    };
};

//Tree mutation
const appendChild = function(parentNode, newNode) {
    parentNode.childNodes.push(newNode);
    newNode.parentNode = parentNode;
};

const insertBefore = function(parentNode, newNode, referenceNode) {
    const insertionIdx = parentNode.childNodes.indexOf(referenceNode);

    parentNode.childNodes.splice(insertionIdx, 0, newNode);
    newNode.parentNode = parentNode;
};

module.exports = {
    //Node construction
    createDocument() {
        return {
            nodeName: '#document',
            mode: DOCUMENT_MODE.NO_QUIRKS,
            childNodes: []
        };
    },
    createDocumentFragment() {
        return {
            nodeName: '#document-fragment',
            childNodes: []
        };
    },
    createElement(tagName, namespaceURI, attrs) {
        return {
            nodeName: tagName,
            tagName: tagName,
            attrs: attrs,
            namespaceURI: namespaceURI,
            childNodes: [],
            parentNode: null
        };
    },
    
    createCommentNode(data) {
        return {
            nodeName: '#comment',
            data: data,
            parentNode: null
        };
    },
    appendChild,
    insertBefore,
    setTemplateContent(templateElement, contentElement) {
        templateElement.content = contentElement;
    },
    
    getTemplateContent(templateElement) {
        return templateElement.content;
    },
    
    setDocumentType(document, name, publicId, systemId) {
        let doctypeNode = null;
    
        for (let i = 0; i < document.childNodes.length; i++) {
            if (document.childNodes[i].nodeName === '#documentType') {
                doctypeNode = document.childNodes[i];
                break;
            }
        }
    
        if (doctypeNode) {
            doctypeNode.name = name;
            doctypeNode.publicId = publicId;
            doctypeNode.systemId = systemId;
        } else {
            appendChild(document, {
                nodeName: '#documentType',
                name: name,
                publicId: publicId,
                systemId: systemId
            });
        }
    },
    
    setDocumentMode(document, mode) {
        document.mode = mode;
    },
    
    getDocumentMode(document) {
        return document.mode;
    },
    
    detachNode(node) {
        if (node.parentNode) {
            const idx = node.parentNode.childNodes.indexOf(node);
    
            node.parentNode.childNodes.splice(idx, 1);
            node.parentNode = null;
        }
    },
    
    insertText(parentNode, text) {
        if (parentNode.childNodes.length) {
            const prevNode = parentNode.childNodes[parentNode.childNodes.length - 1];
    
            if (prevNode.nodeName === '#text') {
                prevNode.value += text;
                return;
            }
        }
    
        appendChild(parentNode, createTextNode(text));
    },
    
    insertTextBefore(parentNode, text, referenceNode) {
        const prevNode = parentNode.childNodes[parentNode.childNodes.indexOf(referenceNode) - 1];
    
        if (prevNode && prevNode.nodeName === '#text') {
            prevNode.value += text;
        } else {
            insertBefore(parentNode, createTextNode(text), referenceNode);
        }
    },
    
    adoptAttributes(recipient, attrs) {
        const recipientAttrsMap = [];
    
        for (let i = 0; i < recipient.attrs.length; i++) {
            recipientAttrsMap.push(recipient.attrs[i].name);
        }
    
        for (let j = 0; j < attrs.length; j++) {
            if (recipientAttrsMap.indexOf(attrs[j].name) === -1) {
                recipient.attrs.push(attrs[j]);
            }
        }
    },
    
    //Tree traversing
    getFirstChild(node) {
        return node.childNodes[0];
    },
    
    getChildNodes(node) {
        return node.childNodes;
    },
    
    getParentNode(node) {
        return node.parentNode;
    },
    
    getAttrList(element) {
        return element.attrs;
    },
    
    //Node data
    getTagName(element) {
        return element.tagName;
    },
    
    getNamespaceURI(element) {
        return element.namespaceURI;
    },
    
    getTextNodeContent(textNode) {
        return textNode.value;
    },
    
    getCommentNodeContent(commentNode) {
        return commentNode.data;
    },
    
    getDocumentTypeNodeName(doctypeNode) {
        return doctypeNode.name;
    },
    
    getDocumentTypeNodePublicId(doctypeNode) {
        return doctypeNode.publicId;
    },
    
    getDocumentTypeNodeSystemId(doctypeNode) {
        return doctypeNode.systemId;
    },
    
    //Node types
    isTextNode(node) {
        return node.nodeName === '#text';
    },
    
    isCommentNode(node) {
        return node.nodeName === '#comment';
    },
    
    isDocumentTypeNode(node) {
        return node.nodeName === '#documentType';
    },
    
    isElementNode(node) {
        return !!node.tagName;
    },
    
    // Source code location
    setNodeSourceCodeLocation(node, location) {
        node.sourceCodeLocation = location;
    },
    
    getNodeSourceCodeLocation(node) {
        return node.sourceCodeLocation;
    },
    
    updateNodeSourceCodeLocation(node, endLocation) {
        node.sourceCodeLocation = Object.assign(node.sourceCodeLocation, endLocation);
    }
}