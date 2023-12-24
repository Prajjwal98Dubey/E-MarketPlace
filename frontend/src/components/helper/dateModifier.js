
export const modifyDate = (s)=>{
    const numberToWordMonth={
        "1":"Jan",
        "2":"Feb",
        "3":"Mar",
        "4":"Apr",
        "5":"May",
        "6":"Jun",
        "7":"Jul",
        "8":"Aug",
        "9":"Sep",
        "10":"Oct",
        "11":"Nov",
        "12":"Dec"
    }
    const date = s.split("-")
    const year = date[0]
    const month=numberToWordMonth[date[1]]
    const day = date[2].substring(0,2)
    return [day,month,year]
}   