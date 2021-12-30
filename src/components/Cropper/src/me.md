1. input file中change事件的e的ts类型 Event?
```js
const handleChange = (e: Event) => {} 
```
2. input file中只支持image图片文件
```js
<input type="file" accept="image/*">
```
3. input file中change获取上传的文件内容
`e.target.files`