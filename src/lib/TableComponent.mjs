import { filteredDataForTable, setPopupDisplaySettings } from "../dataStore.mjs";
import { createEffect, createElement } from "../../fógra/index.mjs";

export default function TableComponent() {
  const table = createElement("table", { id: "governorTable", onrowclick: () => console.log("hey")  });
  const tableHead = createElement("thead", {});
  const tableBody = createElement("tbody", {});

  const thList = () =>
    filteredDataForTable().length > 0
      ? Object.keys(filteredDataForTable()[0]).map((k) =>
          createElement("th", {}, k)
        )
      : [];

  const trList = () =>
    filteredDataForTable().length > 0
      ? filteredDataForTable().map((trRowObject) =>
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
    filteredDataForTable();
    tableHead.innerHTML = "";
    tableBody.innerHTML = "";
    tableHead.append(...thList());
    tableBody.append(...trList());
  });

  table.append(tableHead, tableBody);

  return table;
}
