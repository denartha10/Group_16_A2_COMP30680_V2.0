/**
 * Description
 * @param {string} tag - Any valid name for an HTML element tag
 * @param {Record<string, any>} attrs - An object of HTML element object attributes
 * @param {...(HTMLElement | string)} children - Any HTMLElement or a string
 * @returns {HTMLElement}
 */
function createElement(tag, attrs, ...children) {
	const element = document.createElement(tag);
	Object.assign(element, attrs);
	element.append(...children);
	return element;
}

export { createElement };
