/**
 * It takes a date string in the format of "YYYY-MM-DD" and returns a date string in the format of
 * "Month DD, YYYY".
 * 
 * @return A string with the date in the format: "day month year"
 */
export const Fecha = fecha =>{
    const fechaNueva = new Date(fecha+"T00:00:00")
    const opciones = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    }
    return fechaNueva.toLocaleString('es-Es',opciones)
} 
export const FechaUS = fecha =>{
    const fechaNueva = new Date(fecha+"T00:00:00")
    const opciones = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }
    return fechaNueva.toLocaleDateString('en-CA',options)
} 

export const Fecha2 = fecha =>{
    const fechaNueva = new Date(fecha)
    const opciones = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }
    return fechaNueva.toLocaleString(opciones,'es-ES',{timeZone:"UTC"})
} 