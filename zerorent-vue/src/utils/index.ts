export const isFormData = param => {
    return Object.prototype.toString.call(param) === '[object FormData]'
}