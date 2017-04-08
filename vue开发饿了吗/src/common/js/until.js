export function windowUrl() {
  //如果不设置一个默认的ID值，search为空，下面就会报错
  let url=window.location.search || '?id=0';
  let reg = /[?&][^?&]+=(\w+)+/g;
  let arr = url.match(reg);
  console.log(arr)
  let obj={};
  if(arr.length>0){
    arr.forEach((item)=>{
      let items=item.substring(1).split("=");
      let k=items[0];
      let val=items[1];
      obj[k]=val
    })
  }

  return obj
}
