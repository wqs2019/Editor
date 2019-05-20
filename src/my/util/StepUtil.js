import idgen from "../service/IdGenerator";

export function getDefaultStep(){
    return {
        id: idgen.next(),
        isContainer: true,
        children: [],
        name: "defaultName",
        label: "defaultLabel",
        data: {},
        script:"Defaultscript"
    };
}
