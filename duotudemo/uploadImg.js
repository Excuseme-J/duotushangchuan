// var imgSrc = []; //图片路径
// var imgFile = []; //文件流
// var imgName = []; //图片名字
var imgSrcArr = []; //图片路径
var imgFileArr = []; //文件流
var imgNameArr = []; //图片名字
//选择图片
function imgUpload(obj) {
	var oInput = '.' + obj.inputClass;
	var imgBox = '.' + obj.imgBox;
	var btn = '#' + obj.buttonId;
	var imgFiles = document.getElementsByClassName("files");
	var index = '';

	for (var j = 0; j < imgFiles.length; j++) {
		imgSrcArr[j] = new Array();
		imgFileArr[j] = new Array();
		imgNameArr[j] = new Array();
		imgFiles[j].index = j;
		imgFiles[j].onchange = function(){
			index = this.index;
			var fileImg = $(this)[0];
			var fileList = fileImg.files;
			for(var i = 0; i < fileList.length; i++) {
				var imgSrcI = getObjectURL(fileList[i]);
				imgSrcArr[index].push(imgSrcI);
				imgFileArr[index].push(fileList[i]);
				imgNameArr[index].push(fileList[i].name);
			}
			addNewContent(imgBox,index);
		}

	};
	$(btn).on('click', function() {
		if(!limitNum(obj.num)){
		  	alert("超过限制");
		  	return false;
		}
		//用formDate对象上传
		var fd = new FormData($('#upBox')[0]);
		for(var i=0;i<imgFile.length;i++){
			fd.append(obj.data+"[]",imgFile[i]);
		}
		submitPicture(obj.upUrl, fd);
	})
}
//图片展示
function addNewContent(obj,index) {
	console.log(imgNameArr[index].length);
	$(obj).eq(index).html("");
	for(var a = 0; a < imgNameArr[index].length; a++) {

		var oldBox = $(obj).eq(index).html();
		$(obj).eq(index).html(oldBox + '<div class="imgContainer"><img title=' + imgNameArr[index][a] + ' alt=' + imgNameArr[index][a] + ' src=' + imgSrcArr[index][a] + ' onclick="imgDisplay(this)"><p onclick="removeImg(this,'+index+',' + a + ')" class="imgDelete">删除</p></div>');
	}
	
	
}
//删除
function removeImg(obj,ArrNum,index) {
	
		imgSrcArr[ArrNum].splice(index, 1);
		imgFileArr[ArrNum].splice(index, 1);
		imgNameArr[ArrNum].splice(index, 1);
	
	var boxClass = "." + $(obj).parent('.imgContainer').parent().attr("class");
	console.log(boxClass)
	addNewContent(boxClass,ArrNum);
}
//限制图片个数
function limitNum(num){
	if(!num){
		return true;
	}else if(imgFile.length>num){
		return false;
	}else{
		return true;
	}
}

//上传(将文件流数组传到后台)
function submitPicture(url,data) {
    for (var p of data) {
	  	console.log(p);
	}
	if(url&&data){
		$.ajax({
			type: "post",
			url: url,
			async: true,
			data: data,
			processData: false,
			contentType: false,
			success: function(dat) {
				console.log(dat);
			}
		});
	}else{
	  alert('请打开控制台查看传递参数！');
	}
}
//图片灯箱
function imgDisplay(obj) {
	var src = $(obj).attr("src");
	var imgHtml = '<div style="width: 100%;height: 100vh;overflow: auto;background: rgba(0,0,0,0.5);text-align: center;position: fixed;top: 0;left: 0;z-index: 1000;"><img src=' + src + ' style="margin-top: 100px;width: 70%;margin-bottom: 100px;"/><p style="font-size: 50px;position: fixed;top: 30px;right: 30px;color: white;cursor: pointer;" onclick="closePicture(this)">×</p></div>'
	$('body').append(imgHtml);
}
//关闭
function closePicture(obj) {
	$(obj).parent("div").remove();
}

//图片预览路径
function getObjectURL(file) {
	var url = null;
	if(window.createObjectURL != undefined) { // basic
		url = window.createObjectURL(file);
	} else if(window.URL != undefined) { // mozilla(firefox)
		url = window.URL.createObjectURL(file);
	} else if(window.webkitURL != undefined) { // webkit or chrome
		url = window.webkitURL.createObjectURL(file);
	}
	return url;
}