import { createEffect } from "../reactive.mjs"

function CustomSelect(listOfOptionsSignal, nameAndID, classList){
    const optionTags = () => listOfOptionsSignal().map(v => {
        const newOption = document.createElement("option");
        newOption.id = v;
        newOption.innerText = v;
        return newOption
    })

    // create the select tag
    const select = document.createElement("select")
    select.name = nameAndID
    select.id = nameAndID
    select.classList.add(...classList)

    // create option tags
    createEffect(() => {
        select.innerHTML = ""
        select.append(...optionTags())
    })

    return select
}

export default CustomSelect