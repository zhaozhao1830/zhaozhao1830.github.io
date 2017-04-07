export function formatDate(date,fms) {
  let re=/(y)+/
 if(re.test(fms)){
   fms=fms.replace(re,function ($0) {
     return $0=(date.getFullYear()+"").substr(4-$0.length)
   })

 }
  var d={
   "M+":date.getMonth()+1,
   "D+":date.getDate(),
   "h+":date.getHours(),
   "m+":date.getMinutes(),
   "s+":date.getSeconds()
  }
  for(let key in d){
    let re=new RegExp('('+key+')')
    if(re.test(fms)){
      fms=fms.replace(re,function ($0) {
        if(d[key]<9){
          d[key]="0"+d[key]
        }else {
          d[key]=""+d[key]
        }
        return $0=d[key]
      })
    }
  }

  return fms
}
