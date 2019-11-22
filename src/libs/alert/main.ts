import Vue from 'vue'
import Main from '@component/alert.vue'
// 全局应用$alert
let AlertConstructor = Vue.extend(Main);

let instance: any = null;
let instances = [];
let seed: number = 1;

const Alert = function (msg: string, type: string, time: number = 5) {
    if (Vue.prototype.$isServer) return;
    let id = 'alert_' + seed++;
    instance = new AlertConstructor({
        data: {
            message: msg,
            type: type,
            time: time
        }
    })
    instance.id = id;
    instance.$mount();
    document.body.appendChild(instance.$el);
    instance.visible = true;
    instances.push(instance);
    return instance
}

export default Alert
