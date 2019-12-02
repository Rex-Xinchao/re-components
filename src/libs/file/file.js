const dataURIToBlob = (dataURI) => {
    let arr = dataURI.split(','), type = arr[0].match(/:(.*?);/)[1], str = atob(arr[1]), n = str.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = str.charCodeAt(n);
    }
    return (new Blob([u8arr], { type: type }));
};
const downloadFile = (url, fileName) => {
    let a = document.createElement('a');
    a.innerHTML = ' ';
    a.id = 'download-btn-pic';
    a.download = fileName || 'download'; //不能为空，ie浏览器会不能兼容
    a.innerHTML = 'download';
    if (typeof url === 'object') {
        a.href = window.URL.createObjectURL(url);
    }
    else {
        a.href = url;
    }
    onLinkClick(a);
};
const onLinkClick = (a) => {
    if (document.all) {
        a.click();
        a.remove();
    }
    else {
        let evt = document.createEvent("MouseEvents");
        evt.initEvent("click", true, true);
        a.dispatchEvent(evt);
        a.remove();
    }
};
const registerDrag = ($box, $target, callback) => {
    // 拖拽事件
    $box.onclick = () => {
        $target.click();
    };
    $box.ondragstart = () => {
        return false;
    };
    $box.ondragleave = (e) => {
        e.preventDefault(); // 阻止离开时的浏览器默认行为
    };
    $box.ondrop = (e) => {
        e.preventDefault(); // 阻止拖放后的浏览器默认行为
        const fileList = e.dataTransfer.files; // 获取文件对象
        if (fileList) {
            callback(fileList); // 上传文件的方法
        }
    };
    $box.ondragenter = (e) => {
        e.preventDefault(); //  阻止拖入时的浏览器默认行为
    };
    $box.ondragover = (e) => {
        e.preventDefault(); //  阻止拖来拖去的浏览器默认行为
    };
};
export { dataURIToBlob, downloadFile, registerDrag };
//# sourceMappingURL=file.js.map