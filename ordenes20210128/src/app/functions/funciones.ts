export function formatDate(date):string {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
  
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
  
    return [year, month, day].join('-');
  }

export function fechaHoyStr():string{

    return formatDate(new Date());
}



export function str2ab(str ) {
  const arr = str.split(',');
  const view = new Uint8Array(arr);
  return view.buffer;
}