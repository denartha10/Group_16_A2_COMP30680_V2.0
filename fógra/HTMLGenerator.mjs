function createElement(tag, attrs, ...children) {
    const element = document.createElement(tag);
    Object.assign(element, attrs);
    element.append(...children);
    return element;
}

export {
    createElement
}
