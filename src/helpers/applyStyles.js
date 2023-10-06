export const applyStyles = (styles) => {
    for (const el in styles) {
        const $el = $(el);
        const methods = styles[el];

        for (const method in methods) {
            $el[method](methods[method]);
        }
    }
}