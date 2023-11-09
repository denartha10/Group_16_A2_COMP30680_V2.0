import { createEffect, createElement } from "../../fógraJS/index.mjs";
import { popupDisplaySettings, setPopupDisplaySettings, popupData } from "../dataStore.mjs";

/**
 * Disables scrolling on the page.
 *
 * This function prevents the page from being scrolled by overriding the window's onscroll event.
 * It stores the current scroll position in the `scrollX` and `scrollY` variables, and uses them to reset the scroll position whenever a scroll event is detected.
 *
 * @function
 * @name disablePageScroll
 * @returns {void}
 */
function disablePageScroll() {
	const scrollX = window.scrollX;
	const scrollY = window.scrollY;

	window.onscroll = () => {
		window.scrollTo(scrollX, scrollY);
	};
}

/**
 * Enables scrolling on the page.
 *
 * This function allows the page to be scrolled by setting the window's onscroll event to null.
 * This effectively removes the override that was set by the `disablePageScroll` function.
 *
 * @function
 * @name enablePageScroll
 * @returns {void}
 */
function enablePageScroll() {
	window.onscroll = null;
}

/**
 * Creates a PopupComponent with initial display set to none.
 *
 * This function creates a floating div with a background and a containing div with the data.
 * It runs when the popupData changes, but if the popupDisplaySettings() are not set to open, it will not disable the scroll or set the display to open.
 * The popupSettings() will also trigger an update of the DOM.
 *
 * @function
 * @name PopupComponent
 * @returns {HTMLElement} The floating div element.
 */
export default function PopupComponent() {
	const floatingDiv = createElement("div", { id: "floating" });

	const floatingBack = createElement(
		"div",
		{
			id: "floatingBack",
			onclick: () => setPopupDisplaySettings({ open: false, osid: "" }),
		},
		floatingDiv
	);

	createEffect(() => {
		if (popupDisplaySettings().open) {
			disablePageScroll();
			floatingDiv.append(
				createElement("h4", { className: "underline" }, "More Details"),
				...Object.entries(popupData()).map(([k, v]) => {
					return k === "websiteLink"
						? createElement("a", { href: v, className: "link" }, `${k}: ${v}`)
						: createElement("p", { className: "text" }, `${k}: ${v}`);
				})
			);
			floatingBack.style.display = "block";
		} else {
			floatingBack.style.display = "none";
			enablePageScroll();
			floatingDiv.innerHTML = "";
		}
	});

	return floatingBack;
}
