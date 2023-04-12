const LS_KEY = 'selectedvalue';
const LOCALSTORAGE_KEY = 'selectedvalues';
const form = document.querySelector('.basket-form');

form.addEventListener('submit', handleSubmit);
form.addEventListener('change', handleChangeForm);
// form.addEventListener('input', handleFormInput);

initForm();

function handleSubmit(e) {
    e.preventdefault;
    const formData = new FormData();
    formData.forEachvalue((value, name)=> console.log(value, name));
    localStorage.removeItem(LS_KEY);
}

function handleChangeForm(e) {
    let persistedFilters = localStorage.getItem(LS_KEY);
    persistedFilters = persistedFilters? JSON.parse(persistedFilters):{};
    persistedFilters[e.target.name] = e.target.value;
    localStorage.setItem(LS_KEY, JSON.stringify(persistedFilters));
}


function initForm() {
    let persistedFilters = localStorage.getItem(LS_KEY);
    console.log(persistedFilters);
    if (persistedFilters) { persistedFilters = JSON.parse(persistedFilters);
        Object.entries(persistedFilters).forEach(([name, value])=>{
            form.elements[name].value = value;
        })
    }

}