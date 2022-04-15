// 导入express框架
const express = require('express')

const multer=require('multer');

const path=require('path');
const fs=require('fs');
// 创建路由
const expressRouterInstance = express.Router()
var app = express();

var Multer=multer({dest: './public/uploads'}); //设置上传的的图片保存目录
// 表示接收任何上传的数据 对应的有个 expressRouterInstance.single('user') 表示只接收name为user的上传数据
expressRouterInstance.use(Multer.any());

expressRouterInstance.post('/images',(req,res)=> {
  console.log('req,res: ', req,res);
  // 带后缀的路径
  const newpath = req.files[0].path + path.parse(req.files[0].originalname).ext
  // 带后缀的文件名
  const newname = req.files[0].filename +  path.parse(req.files[0].originalname).ext
  // 重命名文件名
  fs.rename(req.files[0].path,newpath,err=>{
    if(err) return res.send({
      "data": null,
      "meta": {
          "msg": "文件上传失败！",
          "status": 400
      }
    })
  })
  res.send({
    "data": newname,
    "meta": {
        "msg": "文件上传成功！",
        "status": 200
    }
  })
})

// 将路由对象作为模块成员进行导出
// module.exports = expressRouterInstance
app.listen(3000);