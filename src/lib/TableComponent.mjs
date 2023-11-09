import { filteredData, setPopupDisplaySettings } from "../dataStore.mjs";
import { createEffect, createElement } from "../../fógraJS/index.mjs";

/**
 * Creates a table HTML element with dynamic data.
 *
 * This function uses the `createEffect` function to update the table whenever the data changes.
 *
 * @function 
 * @name TableComponent
 * @returns {HTMLElement} The created table HTML element.
 */
export default function TableComponent() {
  const table = createElement("table", { id: "governorTable", onrowclick: () => console.log("hey")  });
  const tableHead = createElement("thead", {});
  const tableBody = createElement("tbody", {});

  const thList = () =>
    filteredData().length > 0
      ? Object.keys(filteredData()[0]).map((k) =>
          createElement("th", {}, k)
        )
      : [];

  const trList = () =>
    filteredData().length > 0
      ? filteredData().map((trRowObject) =>
          createElement(
            "tr",
            {
              id: trRowObject.osid ?? "",
              onclick: () => {setPopupDisplaySettings({open: true, osid: trRowObject.osid})}
            },
            ...Object.values(trRowObject).map((cellData) =>
              createElement("td", {}, cellData)
            )
          )
        )
      : [];

  tableHead.append(...thList());
  tableBody.append(...trList());

  createEffect(() => {
    filteredData();
    tableHead.innerHTML = "";
    tableBody.innerHTML = "";
    tableHead.append(...thList());
    tableBody.append(...trList());
  });

  table.append(tableHead, tableBody);

  return table;
}
