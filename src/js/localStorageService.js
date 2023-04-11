export const getDataFromLockalStorageByKey = key => JSON.parse(localStorage.getItem(key));
export const setDataToLocalStorageByKey = (key, dataInitial) => localStorage.setItem(key, JSON.stringify(dataInitial));
export const checkLS = (key) => {
    let data = getDataFromLockalStorageByKey(key);
    if (!data) setDataToLocalStorageByKey(key, []);
    data = getDataFromLockalStorageByKey(key);
    return data;
}