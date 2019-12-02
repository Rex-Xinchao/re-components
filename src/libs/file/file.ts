const dataURIToBlob = (dataURI: string) => {
    let arr: any[] = dataURI.split(','),
        type: string = arr[0].match(/:(.*?);/)[1],
        str: any = atob(arr[1]),
        n: number = str.length,
        u8arr: any = new Uint8Array(n);

    while (n--) {
        u8arr[n] = str.charCodeAt(n);
    }

    return (new Blob([u8arr], {type: type}));
};

const downloadFile = (url: any, fileName: string) => {
    let a = <any>document.createElement('a');
    a.innerHTML = ' ';
    a.id = 'download-btn-pic';
    a.download = fileName || 'download'; //不能为空，ie浏览器会不能兼容
    a.innerHTML = 'download';
    if (typeof url === 'object') {
        a.href = <any> window.URL.createObjectURL(url);
    } else {
        a.href = url
    }
    onLinkClick(a)
};

const onLinkClick = (a: any) => {
    if (document.all) {
        a.click();
        a.remove()
    } else {
        let evt = document.createEvent("MouseEvents");
        evt.initEvent("click", true, true);
        a.dispatchEvent(evt);
        a.remove();
    }
};

const registerDrag = ($box: any, $target: any, callback: any) => {
    // 拖拽事件
    $box.onclick = () => {
        $target.click()
    };
    $box.ondragstart = () => {
        return false
    };
    $box.ondragleave = (e: any) => {
        e.preventDefault()// 阻止离开时的浏览器默认行为
    };
    $box.ondrop = (e: any) => {
        e.preventDefault();// 阻止拖放后的浏览器默认行为
        const fileList = e.dataTransfer.files;// 获取文件对象
        if (fileList) {
            callback(fileList)// 上传文件的方法
        }
    };
    $box.ondragenter = (e: any) => {
        e.preventDefault()//  阻止拖入时的浏览器默认行为
    };
    $box.ondragover = (e: any) => {
        e.preventDefault()//  阻止拖来拖去的浏览器默认行为
    };
};

export {dataURIToBlob, downloadFile, registerDrag}
