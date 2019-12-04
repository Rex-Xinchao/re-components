const toUnderline = key => {
  return key.replace(/([A-Z])/g, '_$1').toLowerCase();
};

const getDataType = data => {
  let type = typeof data;
  if ( type === 'object' ) {
    type = Object.prototype.toString.call(data);
    switch( type ) {
      case '[object Null]':
        type = 'undefined';
        break;
      case '[object Date]':
        type = 'date';
        break;
      case '[object Array]':
        type = 'arry';
        break;
      case '[object RegExp]':
        type = 'regExp';
        break;
      case '[object Object]':
        type = 'object';
        break;
      case '[object JSON]':
        type = 'json';
        break;
      default:
        break;
    }
  }
  return type;
};

const deepClone = obj => {
  let type = getDataType(obj);
  if ( type === 'object' || type === 'arry' ) {
    let back = type === 'object' ? {} : [];
    for( let key in obj ) {
      back[key] = deepClone(obj[key]);
    }
    return back;
  }
  return obj;
};

export { toUnderline, getDataType, deepClone }
