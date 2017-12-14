$(function(){
	var imgs= document.getElementsByClassName("imgs");
    var imgFiles = document.getElementsByClassName("files");
    var posBB = '',index = '',num = 5;

    for (var i = 0; i < imgs.length; i++) {
        imgs[i].index = i;
        imgs[i].onclick = function (){
            inputClick(this);
        }
    };
    for (var j = 0; j < imgFiles.length; j++) {
        imgFiles[j].index = j;
        imgFiles[j].onchange = function(){
            yulan(this);
        }

    };
    function inputClick(_this){
        var clickNum = $(_this).parent().siblings().length;
        if(clickNum > num){
            alert("够多了")
        }else{
            $(_this).siblings("input").click();
        }
    }
    function remove(_this){
        var parLen =  $(_this).parent().siblings('.imgBox');
        var mid = $(_this).parent().parent().data("mid");
        $(_this).parent().remove();
        if(parLen.length-1 < num){
            parLen.eq(parLen.length-1).attr("style","display:block");
        }
        for (var i = 0; i < parLen.length-1; i++) {
            parLen.eq(i).find("input").attr("name","pic_" + mid + "_" + i );
        };
    }
    function yulan(_this) {
        index = _this.index;
        var boxLen = $(_this).parent().siblings().length;
        var index2 = $(_this).parent().index();
        var index1 = index2-1;
        var fileImg = $(_this)[0];
        var fileList = fileImg.files;
        for(var i = 0; i < fileList.length; i++) {
            var imgSrcI = getObjectURL(fileList[i]);
            // imgSrcArr[index].push(imgSrcI);
            // imgFileArr[index].push(fileList[i]);
            // imgNameArr[index].push(fileList[i].name);
            if(posBB == _this || index2 != boxLen){
                $(_this).siblings("img").attr("src",imgSrcI);
            }else{
                $(_this).siblings("img").attr("src",imgSrcI);
                $(_this).after('<span class="del" onclick=remove(this)><img src="../image/delete_red.png" style="width:100%;height: 100%;"></span>');
                var mid = $(_this).parent().parent().data("mid");
                $(_this).attr("name","pic_" + mid + "_" + index1);
                if(boxLen < num){
                    $(_this).parent().after('<div class="imgBox"><input type="file" name="" onchange=yulan(this) class="files"><img src="../image/add_media.png" alt="" id="img1"class="imgs" onclick=inputClick(this)></div>');
                }else if(boxLen == num){
                    $(_this).parent().after('<div class="imgBox" style="display:none;"><input type="file" name="" onchange=yulan(this) class="files"><img src="../image/add_media.png" alt="" id="img1"class="imgs" onclick=inputClick(this)></div>');
                }

            }

        }
        posBB = _this;
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
})