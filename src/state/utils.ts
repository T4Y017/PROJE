export interface AsyncTaskStatus {
    type: "loading" | "success" | "error";
    message?: string;
}
export function filterSearch(data, search) {
    if (!search) return data;
    return data.filter(
        (data) =>
            data.username &&
            data.username.toLowerCase().includes(search.toLowerCase())
    );
}
export function filterSearchFirm(data, search) {
    if (!search) return data;
    return data.filter(
        (data) =>
            data.firmName &&
            data.firmName.toLowerCase().includes(search.toLowerCase())
    );
}
