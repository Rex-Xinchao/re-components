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
  const type = getDataType(obj);
  if (['string', 'number', 'boolean', 'undefined', 'regExp', 'date'].indexOf(type) >= 0) {
    return obj
  } else if (type === 'arry') {
    let back = [];
    obj.forEach(item => {
      back.push(deepClone(item))
    });
    return back
  } else if (type === 'object') {
    let back = {};
    for (let key in obj) {
      back[key] = deepClone(obj[key])
    }
    return back
  } else if (type === 'function') {
    return obj
  }
};

export { toUnderline, getDataType, deepClone }
