import { createEffect, createElement } from "../../fógraJS/index.mjs";
import { popupDisplaySettings, setPopupDisplaySettings, popupData } from "../dataStore.mjs";

// Disable scrolling
function disablePageScroll() {
	const scrollX = window.scrollX;
	const scrollY = window.scrollY;

	window.onscroll = () => {
		window.scrollTo(scrollX, scrollY);
	};
}
// Enable scrolling
function enablePageScroll() {
	window.onscroll = null;
}

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
