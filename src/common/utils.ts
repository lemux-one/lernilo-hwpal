function isEmpty(data: any) {
    return data === null || data === undefined;
}

function isObject(data: any) {
    return data && typeof data === "object";
}

function isBlank(data: any) {
    return isEmpty(data) ||
        (Array.isArray(data) && data.length === 0) ||
        (isObject(data) && Object.keys(data).length === 0) ||
        (typeof data === "string" && data.trim().length === 0);
}

function isBrowser() {
    return typeof window === undefined;
}

export { isBlank, isBrowser, isEmpty, isObject };
