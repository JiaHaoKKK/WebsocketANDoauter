export function GMTToStr (data, time) {
  let date = new Date(data)
  let arr = []
  arr = time.split(':')
  let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
  let Month =
    date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
  let str =
    arr[0] +
    ':' +
    arr[1] +
    ':' +
    arr[2] +
    ':' +
    day +
    ':' +
    Month +
    ':' +
    date.getFullYear()
  return str
}
