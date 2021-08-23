let getHumanReadableDate = date => {
    let d = new Date(Number(date))
    return d.toDateString()
}
export default getHumanReadableDate