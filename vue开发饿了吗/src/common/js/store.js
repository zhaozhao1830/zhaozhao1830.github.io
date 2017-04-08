export function saveToStorage(id,key,val) {
  let storage=window.localStorage._seller_;
  // 判断seller这个仓库存不存在，如果不存在将storage设置成一个对象，它下面的ID也是一个对象
  if(!storage){
    storage={}
    storage[id]={}
  }else{
    // 如果这个仓库存在，那么就将它转化成对象形式
    storage=JSON.parse(storage)
    if(!storage[id]){
      storage[id]={}
    }
  }
  storage[id][key]=val

  window.localStorage._seller_=JSON.stringify(storage)
}

export function getFromStorage(id,key,def) {
  let storage=window.localStorage._seller_;

  if(!storage){
    return def
  }
  storage=JSON.parse(storage)
  if(!storage[id]){
    return def
  }
  if(!storage[id][key]){
    return def
  }

  return storage[id][key]
}
