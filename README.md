# re-components

> re-components

## Build Setup

``` bash
// 国际化语言切换----------------------------------------
已全局注册，切换语言方法：this.$ils8(lang)
语言现在只支持：en(英文),ZHCN(简体中文),ZHTW(繁体中文)
该功能先只支持在main文件中导入的时候调用，如果是想实现点击按钮切换语言，
要局部刷新所有组件，不然只有当组件触发时才会进行语言的切换刷新。

//alert组件----------------------------------------------
已全局注册，使用方法：this.alert(msg,type,time)
msg: 提示信息
type: 弹窗类型（default/success/error/info）
time: 消息停留时间（单位：秒）

//图片压缩-----------------------------------------------
<re-compress :size="{maxWidth: 100,maxHeight: 100}"></re-compress>
支持参数： size
size: { type: Object, default: { maxWidth: 400,maxHeight: 400 } }#压缩后图片尺寸

//drag组件----------------------------------------------
实现多个list之间的相互拖拽
<re-drag :listMap="listMap"></re-drag>
listMap: {one: [1,2,3], two: [4,5,6], three: [7,8,9]}#会生成3个列，分别是123,456和789
回调事件@change：拖拽完成之后触发，返回调整之后的listMap

//dropdown组件------------------------------------------
支持插槽，使用了drop-link插槽后text字段失效
<re-drop-down :width="120">
    <template slot="drop-link">
        <span>你好</span>
    </template>
    <template slot="drop-down">
        <div v-for="item in list" class="drop-down-item" :value="item.value">{{item.label}}</div>
    </template>
</re-drop-down>
配置参数：
text: {type: String, default: ''},#文本
width: {type: Number, default: 80}#下拉框宽度

// menu组件----------------------------------------------
支持插槽，使用方法
<re-menu :options="menuList" :default="2">
   <template slot-scope="props">
      <span :value="props.value">{{ props.label }}</span>
   </template>
   <template slot="rightTools">
      <span>司机上传回单</span>
   </template>
</re-menu>
menuList: [{label: '全部运单',value: 1,disabled: true}, {label: '在途跟踪',value: 2}]
支持配置参数：
    options: { type: Array, required: true },#下来内容的配置数组
    default: { type: [String, Number], default: '' },#默认选中的值
    backgroundColor: { type: String, default: '#fff' },#背景颜色
    textColor: { type: String, default: '#a0a0a0' },#字体颜色
    activeTextColor: { type: String, default: 'red' }#选中字体的高亮颜色

// progress组件------------------------------------------
进度条组件分2种，线型的和圈型的。
线型：
<re-line :progress="progress"></re-progress>
配置参数：
width: {type: Number, default: 250},#进度条宽度
height: {type: Number, default: 6 },#进度条高度
isInner: { type: Boolean, default: return true },#字体文字
color: {type: String, default: '#409eff'},#进度条颜色
progress: {type: Number, default: 50, validator: val => val >= 0 && val <= 100}#当前进度
圈型：
<re-circle :progress="progress"></re-progress-circle>
配置参数：
radius: {type: Number, default: 50},#进度条半径
strokeWidth: {type: Number, default: 8},#进度条宽度
color: {type: String, default: '#409eff'},#进度条颜色
progress: {type: Number, default: 50,validator: val => val >= 0 && val <= 100}#当前进度

//页面截图------------------------------------------------
<re-screenshot @onImageChange="onImageChange" targetId="saveImage"></re-screenshot>
支持插槽自定义按钮样式，但要绑定saveAsImage事件: saveAsImage()。如下：
<screenshot @onImageChange="onImageChange" targetId="saveImage">
    <template slot="custom">
        <button class='custom-btn-style' @click="saveAsImage">截图</button>
    </template>
</screenshot>
配置参数：
msg: { default: '截图', type: String }, #按钮名称
fileName: { default: '截图', type: String }, #下载下来图片名称
targetId: { required: true, type: String } #目标截图dom元素id *一定是id

//开关组件------------------------------------------------
<re-switch @change="switchChange"></re-switch>
配置参数：
_isDisabled: {type: Boolean,default: false },#是否禁用
activeColor: {type: String,default: 'rgb(19, 206, 102)'},#打开颜色
inactiveColor: {type: String,default: 'rgb(255, 73, 73)'},#关闭颜色
width: {type: Number,default: 40 }#按钮宽度

//上传组件------------------------------------------------
<re-upload :url="'https://jsonplaceholder.typicode.com/posts/'" @change="change"></re-upload>
支持配置参数：
tips: { type: String, default: '只能上传jpg/png文件，且不超过500kb' },#tips提示
fileType: {type: Array,default: ['image/jpeg', 'image/png', 'image/jpg']},#上传文件类型限制
fileSize: { type: Number, default: 2 },#上传文件大小限制
fileAmount: { type: Number, default: 9 },#上传文件数量限制
url: { type: String, required: true }#上传url

```
