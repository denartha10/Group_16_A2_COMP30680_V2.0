import { createEffect, createElement } from "../fógra/index.mjs";
import { popupData, popupDisplaySettings } from "./dataStore.mjs";

// Disable scrolling
function disableScroll() {
	// Get the current scroll position
	let scrollX = window.scrollX;
	let scrollY = window.scrollY;

	// Scroll to the current position to prevent the page from jumping
	window.onscroll = function () {
		window.scrollTo(scrollX, scrollY);
	};
}

export default function PopupComponent() {
	const dialogueElement = createElement("dialog", { id: "floating" });

	createEffect(() => {
		if (popupDisplaySettings().open) {
			dialogueElement.innerHTML = "";
			dialogueElement.append(
				createElement("h4", {}, "More Details"),
				...Object.entries(popupData()).map(([k, v]) => {
					console.log(`${k}: ${v}`);
					return k === "websiteLink"
						? createElement("a", { href: v }, `${k}: ${v}`)
						: createElement("p", {}, `${k}: ${v}`);
				})
			);

			dialogueElement.open = true;
			disableScroll();
		}
	});
	return dialogueElement;
}
