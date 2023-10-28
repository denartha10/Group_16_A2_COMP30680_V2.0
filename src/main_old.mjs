function moreInfo(e) {
	disableScroll();

	// e.target.parentNode.id
	const moreDetails = getMoreDetails(data, e.target.parentNode.id);

	const floatingDiv = document.createElement("div");
	floatingDiv.id = "floating";

	const floatingDivBackground = document.createElement("div");
	floatingDivBackground.id = "floatingBack";
	floatingDivBackground.addEventListener("click", closeDetails);

	const title = document.createElement("h4");
	title.style.textDecoration = "underline";
	title.innerText = "More Details";

	floatingDiv.append(
		title,
		...Object.entries(moreDetails).map(([k, v]) => {
			if (k === "websiteLink") {
				const tag = document.createElement("a");
				tag.href = v;
				tag.innerText = `${k}: ${v}`;
				return tag;
			} else {
				const tag = document.createElement("p");
				tag.innerText = `${k}: ${v}`;
				return tag;
			}
		})
	);

	floatingDivBackground.append(floatingDiv);
	document.querySelector("body").append(floatingDivBackground);
}

// ------------------------------------------------------------------------------------------------

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

// Enable scrolling
function enableScroll() {
	window.onscroll = null;
}

function closeDetails() {
	document.getElementById("floating").remove();
	document.getElementById("floatingBack").remove();
	enableScroll();
}