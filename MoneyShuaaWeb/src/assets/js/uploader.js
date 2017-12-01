/**
 * Created by tangkun on 2017/11/20.
 */

import {Indicator} from 'mint-ui';
import {Toast} from 'mint-ui';

(function (win, undefined) {

  require('qiniu-js/dist/qiniu.js')
  /*公钥加密*/
  var uploader = function (buttonName,callBack) { //encrypt
    var ld = Qiniu.uploader({
      runtimes: 'html5,flash,html4',      // 上传模式，依次退化
      browse_button: buttonName,         // 上传选择的点选按钮，必需
      uptoken_url: uploader_config.uptoken_url,
      get_new_uptoken: false,             // 设置上传文件的时候是否每次都重新获取新的uptoken
      unique_names: false,              // 默认false，key为文件名。若开启该选项，JS-SDK会为每个文件自动生成key（文件名）
      save_key: false,                  // 默认false。若在服务端生成uptoken的上传策略中指定了sava_key，则开启，SDK在前端将不对key进行任何处理
      bucket_name: uploader_config.bucket_name,
      domain: uploader_config.domain, // bucket domain eg:http://qiniu-plupload.qiniudn.com/
      container: 'uploader_container',             // 上传区域DOM ID，默认是browser_button的父元素
      max_file_size: '500mb',             // 最大文件体积限制
      dragdrop: true,                     // 开启可拖曳上传
      drop_element: 'uploader_container',          // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
      chunk_size: '4mb',                  // 分块上传时，每块的体积
      max_retries: 3,                     // 上传失败最大重试次数
      auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
      filters: {
        mime_types : [
          {title : "Image files", extensions: "jpg,jpeg,gif,png"}
        ]
      },
      multi_selection: false,
      init: {
        'FilesAdded': function (up, files) {
          plupload.each(files, function (file) {
            // 文件添加进队列后，处理相关的事情
            console.log('FilesAdded')
            console.log("===",file.getNative(),file.getSource())
          })
        },
        'BeforeUpload': function (up, file) {
          // 每个文件上传前，处理相关的事情
          console.log('BeforeUpload');
          Indicator.open();
        },
        'ChunkUploaded': function (up, file, info) {
          console.log('ChunkUploaded')
        },
        'UploadProgress': function (up, file) {
          console.log('UploadProgress')
        },
        'FileUploaded': function (up, file, info) {
          console.log('FileUploaded');

          var domain = up.getOption('domain');
          var res = JSON.parse(info.response);
          var sourceLink = domain+ res.key;

          var reader = new FileReader();
          reader.readAsDataURL(file.getNative());
          reader.onload = (function (e) {
            var image = new Image();
            image.src = e.target.result;
            image.onload = function () {
              var sizes = "?width=" + this.width + "&height=" + this.height;
              sourceLink = sourceLink + sizes;
              console.log(sourceLink);
              callBack(sourceLink);
            }
          })
        },
        'Error': function (up, err, errTip) {
          // 上传出错时，处理相关的事情
          console.log('Error =')
          console.log(err)
          console.log('errTip =')
          console.log(errTip)
          Toast({message: errTip, position: 'center', duration: 3000});
        },
        'UploadComplete': function () {
          // 队列文件处理完毕后，处理相关的事情
          console.log('UploadComplete')
          Indicator.close();
        }
      }
    })
      return ld;
  };

  win["uploader"] = uploader;

})(window);
