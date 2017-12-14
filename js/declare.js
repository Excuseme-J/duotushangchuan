;$(function () {
    var data1 = JSON.parse(sessionStorage.getItem("data1") );
    var card = JSON.parse(sessionStorage.getItem("card") );
    var token = JSON.parse( localStorage.getItem("token"));
    var data = JSON.parse(localStorage.getItem("dataInfo"));
    //添加必填项
    //$("#materials").html("");
    var inputHtml = '';
    function add(inputData,addInput) {
        switch (inputData.type){
            case "radio":
                var radioArr = inputData.value.split(",");
                addInput += "<div style='width:100%;overflow: hidden;'>"
                for(var j = 0; j < radioArr.length;j++){
                    addInput += "<div style='height:100%;float: left;margin-left:.2rem;' class='labBox'><input type='radio' checked class='radioStyle' required='required' value='"+ radioArr[j] +"' name='"+ inputData.eletable_id +"' id='radio_"+ inputData.eletable_id + j +"'/><label class='radioLableStyle' for='radio_"+ inputData.eletable_id + j +"'>"+ radioArr[j] +"</label></div>";
                }
                addInput += "</div>";
                return addInput;
                break;
            case "text":
                addInput += "<div><input type='text' required='required' class='textStyle'  value='"+ inputData.default_value +"' name='"+ inputData.eletable_id +"'/></div>";
                return addInput;
                break;
            case "textarea":
                addInput += "<div><textarea name='' id=''  required='required' class='textareaStyle' name='"+ inputData.eletable_id +"'></textarea></div>";
                return addInput;
                break;
            case "checkbox":
                addInput += "<div><input type='checkbox' required='required'class='checkboxStyle' name='"+ inputData.eletable_id +"'/></div>";
                return addInput;
                break;
            case "fieldset":
                addInput += "<div><input type='fieldset' required='required'class='fieldseStyle' value='"+ inputData.default_value +"' name='"+ inputData.eletable_id +"'/></div>";
                return addInput;
                break;
            default:
                break;
        }
    }

    for(var i = 0 ;i < data1.material.length; i++){
        if(data1.material[i].ismust == '1'){
            inputHtml += "<p class='nameStyle'><i class='star'>*</i>"+ data1.material[i].name +"</p>";
            inputHtml = add(data1.material[i],inputHtml);
        }

    }
    $("#materials").append(inputHtml);
    //添加表格
    function addTab(inputData,addInput){
        switch (inputData.type){
            case "embedtable":
                var tabName = inputData.value.split(",");
                addInput = "<div class='tabBox'>";
                addInput +="<p><span>"+ inputData.name +"</span></p>";

                for(var i = 0; i < inputData.default_value; i++){
                    addInput += "<form id=''><table><tbody>"
                    addInput += "<tr>";
                    addInput += "<td class='firstTab' rowspan='"+ tabName.length +"'><i class='num'>"+ (i+1) +"</i></td>";
                    addInput += "<td><span>"+ tabName[0] +"</span><input type='text' value=''/></td>"
                    addInput += "</tr>";
                    for(var j = 0 ; j < tabName.length-1; j++){
                        addInput += "<tr>";
                        addInput += "<td><span>"+ tabName[j+1] +"</span><input type='text' value=''/>"
                        addInput += "</tr>";
                    }

                    addInput += "</tboday></table></form>";
                }
                addInput += "</div>";
                return addInput;
                break;
            default:
                break;
        }

    }
    var tabData = data1.material;
    var tabHtml = " ";
    for (var i = 0; i < tabData.length; i++){
        tabHtml = addTab(tabData[i],tabHtml);
    }
    $(".formTbale").append(tabHtml);
    //添加照片
    function addphotohtml(data,bhzp) {
        if(data.hasOwnProperty("material_val")){
            if(data.material_val.indexOf(",") > -1){
                var materalVal = data.material_val.split(",");
                for(var j = 0; j < materalVal.length; j++){
                    bhzp += "<div  class='imgBox'>"
                    bhzp += "<input type='file' id='' class='files' name=''/>";
                    bhzp += "<img src='"+ ip + materalVal[j] +"' class='imgs'/>";
                }
                if(materalVal.length < num){
                    bhzp += "<div  class='imgBox'>"
                    bhzp += "<input type='file' id='' class='files' name=''/>";
                    if(data.egpath == '' || data.egpath == undefined || data.egpath == "undefined" || data.egpath == null || data.egpath == "null"){
                        bhzp += "<img src='../image/add_media.png' class='imgs'/>";
                    }else{
                        bhzp += "<img src='"+ ip + data.egpath +"' class='imgs'/>";
                    }
                    
                }
            }else{
                bhzp += "<div  class='imgBox'>"
                bhzp += "<input type='file' id='' class='files' name=''/>";
                if(data.egpath == '' || data.egpath == undefined || data.egpath == "undefined" || data.egpath == null || data.egpath == "null"){
                    bhzp += "<img src='../image/add_media.png' class='imgs'/>";
                }else{
                    bhzp += "<img src='"+ ip + data.egpath +"' class='imgs'/>";
                }
            }
        }else{
            bhzp += "<div  class='imgBox'>"
            bhzp += "<input type='file' id='' class='files' name=''/>";
             if(data.egpath == '' || data.egpath == undefined || data.egpath == "undefined" || data.egpath == null || data.egpath == "null"){
                bhzp += "<img src='../image/add_media.png' class='imgs'/>";
            }else{
                bhzp += "<img src='"+ ip + data.egpath +"' class='imgs'/>";
            }
        }
        
        return bhzp;
    }
    var photoHmtl = ''
    for(var i = 0 ;i < data1.material.length; i++){
        if(data1.material[i].hasOwnProperty("code")){
            if(data1.material[i].code.indexOf("CL") > -1){
                photoHmtl += "<div class='bigBox' data-mId='"+ data1.material[i].material_id +"'><p style='line-height: .8rem;font-size:.28rem;'><i class='star'>*</i>"+ data1.material[i].name +"</p>";
                photoHmtl = addphotohtml(data1.material[i],photoHmtl);
                photoHmtl += "</div></div>"
            }
        }
    }
    $("#photoForm").append(photoHmtl);
    var imgs= document.getElementsByClassName("imgs");
    var imgFiles = document.getElementsByClassName("files");
    var posBB = '',index = '',num = 5;

    for (var i = 0; i < imgs.length; i++) {
        imgs[i].index = i;
        imgs[i].onclick = function (){
            inputClick(this);
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
    for (var j = 0; j < imgFiles.length; j++) {
        imgFiles[j].index = j;
        imgFiles[j].onchange = function(){
            yulan(this);
        }

    };
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
    //添加非必填项
    var noDataHtml = '';
    for(var i = 0 ;i < data1.material.length; i++){
        if(data1.material[i].ismust == '0'){
            noDataHtml += "<p class='nameStyle'>"+ data1.material[i].name +"</p>";
            noDataHtml = add(data1.material[i],noDataHtml);
        }
    }
    $("#materials").append(noDataHtml);
    //添加收货方式
    var rettype = data1.rettype;
    if(rettype == 1 || rettype == 2){
        var phone  = '';
        var dz = '';
        var name = '';
        $.ajax({
            url:ip + "/Interfaces/User/getPostalList",
            type:"POST",
            data:{
              "TOKEN":token
            },
            async:false,
            success:function (ret) {
                var ret1 = JSON.parse(ret).data;
                if(JSON.parse(ret).code == 0){
                    for(var i = 0; i < ret1.length; i++){
                        if(ret1[i].isdefault == "1"){
                            phone = ret1[i].tel;
                            dz = ret1[i].province + ret1[i].city + ret1[i].county + ret1[i].town;
                            name = ret1[i].name;
                        }
                    }
                }
                
            }
        });
        var deliveryHtml = '';
        deliveryHtml += "<div id='deliveryBox'>";
        deliveryHtml += "<div id='way'>";
        deliveryHtml += "<i>获取方式</i><div style='display: inline-block;'><input type='radio' checked   name='ispostal' value='1' id='express'/><label for='express'  class=''>快递</label></div><div style='display: inline-block;'><input type='radio' checked  name='ispostal' value='2' id='selfLift'/><label for='selfLift' class=''>自提</label></div>";
        deliveryHtml += "</div>";
        deliveryHtml += "<p style='line-height: .8rem; font-weight: 600;' id='dz'>收货地址<i class='star'>(默认地址,点击可修改)</i></p>";
        deliveryHtml += "<div id='edit'>";
        deliveryHtml += "<p><span id='name'>"+ name +"</span>电话<span id='phone'>"+ phone +"</span></p>";
        deliveryHtml += "<p><span id='site'>"+ dz +"</span></p>";
        deliveryHtml += "</div>";
        deliveryHtml += "</div>";
        $("#radioForm").append(deliveryHtml);
    }else {
        var deliveryHtml = '';
        deliveryHtml += "<input type='hidden' name='ispostal' value='0'/>";
        $("#radioForm").append(deliveryHtml);
    }

    $(".labBox label").click(function () {
        if($(this).siblings("input").attr("checked") == "checked"){
            $(this).parent().siblings().find("label").removeClass("labelTrue");
            $(this).addClass("labelTrue");
        }
    })
    $("#way label").click(function () {
        if($(this).siblings("input").attr("checked") == "checked"){
            $(this).parent().siblings().find("label").removeClass("labelTrue");
            $(this).addClass("labelTrue");
        }
    })

    //表单序列化功能
    function serializeForm(form) {
        var obj = {};
        $.each(form.serializeArray(), function(index) {
            if(obj[this['name']]) {
                obj[this['name']] = obj[this['name']] + ',' + this['value'];
            } else {
                obj[this['name']] = this['value'] + "_" + this['name'];
                //obj[this['name']] = this['value'];
            }
        });
        return obj;
    }
    //var num = '';
    // $("img").click(function () {
    //     num = $(this).attr("id");
    //     num = num.split("_")[1];
    //     $("#previewImg_"+num).click();
    //     $("#previewImg_"+num).change(function() {
    //         previewImage(this,num)
    //     })
    // })
    //图片展示功能
    function previewImage(file,num) {
        var MAXWIDTH = 90;
        var MAXHEIGHT = 90;
        var div = document.getElementById('preview_'+num);
        if(file.files && file.files[0]) {
            div.innerHTML = '<img id="imghead_'+ num +'" onclick=$("#previewImg_'+num+'").click()>';
            var img = document.getElementById('imghead_'+num);
            img.onload = function() {
                var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
                img.width = rect.width;
                img.height = rect.height;
                //img.style.marginLeft = rect.left+'px';
            }
            var reader = new FileReader();
            reader.onload = function(evt) {
                img.src = evt.target.result;
            }
            reader.readAsDataURL(file.files[0]);

            var file = document.getElementById("previewImg_"+num).files[0];
            //console.log(file)

        } else //兼容IE
        {
            var sFilter = 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
            file.select();
            var src = document.selection.createRange().text;
            div.innerHTML = '<img id="imghead_'+ num +'">';
            var img = document.getElementById('imghead_'+num);
            img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
            var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
            status = ('rect:' + rect.top + ',' + rect.left + ',' + rect.width + ',' + rect.height);
            div.innerHTML = "<div id='divhead_"+ num +"' style='width:2rem;height:2rem;" + sFilter + src + "\"'></div>";

            var file = document.getElementById("previewImg_"+num).files[0];
            console.log(file)
        }
    }

    function clacImgZoomParam(maxWidth, maxHeight, width, height) {
        var param = {
            top: 0,
            left: 0,
            width: width,
            height: height
        };
        if(width > maxWidth || height > maxHeight) {
            rateWidth = width / maxWidth;
            rateHeight = height / maxHeight;

            if(rateWidth > rateHeight) {
                param.width = maxWidth;
                param.height = Math.round(height / rateWidth);
            } else {
                param.width = Math.round(width / rateHeight);
                param.height = maxHeight;
            }
        }
        param.left = Math.round((maxWidth - param.width) / 2);
        param.top = Math.round((maxHeight - param.height) / 2);
        return param;
    }
    //获取驳回事件数据
    var bhId = location.href.split("?")[1];
    if(bhId != '' && bhId != "null" && bhId != null && bhId != undefined && bhId != "undefined"){
        $("#materials").html("");
        $("#photoForm").html("");
        $("#radioForm").html("");
        $.ajax({
            type:"POST",
            url: ip + "/Interfaces/Event/getRejectEvent",
            async:false,
            data:{
                "TOKEN":token,
                "eid":bhId
            },
            success:function (ret) {
                var bhData = JSON.parse(ret).data.material;
                if(JSON.parse(ret).code == 0){
                    var bhbtHtml = "";
                    for(var i = 0; i < bhData.length; i++){
                        if(bhData[i].ismust == "1"){
                            bhbtHtml += "<p class='nameStyle'><i class='star'>*</i>"+ bhData[i].name +"</p>";
                            bhbtHtml = add(bhData[i],bhbtHtml);
                        }
                    }
                    $("#materials").append(bhbtHtml);
                    var bhfbHtml = "";
                    for(var i = 0 ;i < bhData.length; i++){
                        if(bhData[i].ismust == '0'){
                            bhfbHtml += "<p class='nameStyle'>"+ bhData[i].name +"</p>";
                            bhfbHtml = add(bhData[i],bhfbHtml);
                        }
                    }
                    $("#materials").append(bhfbHtml);
                    //图片
                    var bhzpHtml = "";
                    for(var i = 0 ;i < bhData.length; i++){
                        if(bhData[i].picsmust == "1"){
                            bhzpHtml += "<div class='bigBox' data-mId='"+ bhData[i].material_id +"'><p style='line-height: .8rem;font-size:.28rem;'><i class='star'>*</i>"+ bhData[i].name +"</p>";
                            bhzpHtml = addphotohtml(bhData[i],bhzpHtml);
                            bhzpHtml += "</div></div>"
                        }
                        if(bhData[i].picsmust == "0"){
                            bhzpHtml += "<div class='bigBox' data-mId='"+ bhData[i].material_id +"'><p style='line-height: .8rem;font-size:.28rem;'>"+ bhData[i].name +"</p>";
                            bhzpHtml = addphotohtml(bhData[i],bhzpHtml);
                            bhzpHtml += "</div></div>"
                        }
                    }
                    $("#photoForm").append(bhzpHtml);
                    var imgs= document.getElementsByClassName("imgs");
                    var imgFiles = document.getElementsByClassName("files");
                    var posBB = '';
                    for (var i = 0; i < imgs.length; i++) {
                        imgs[i].index = i;
                        imgs[i].onclick = function (){
                            $(this).siblings("input").click();
                        }
                    };
                    function inputClick(aa){
                        $(aa).siblings("input").click();
                    }
                    for (var j = 0; j < imgFiles.length; j++) {
                        imgFiles[j].index = j;
                        imgFiles[j].onchange = function(){
                            yulan(this);
                        }

                    };


                    // var num1 = '';
                    // $("img").click(function () {
                    //     num1 = $(this).attr("id");
                    //     num1 = num1.split("_")[1];
                    //     $("#previewImg_"+num1).click();
                    //     $("#previewImg_"+num1).change(function() {
                    //         previewImage(this,num1)
                    //     })
                    // });
                    //快递
                    //var rettype = data1.rettype;
                    var bhrettype = JSON.parse(ret).data.rettype;
                    var phone  = '';
                    var dz = '';
                    var name = '';
                    $.ajax({
                        url:ip + "/Interfaces/User/getPostalList",
                        type:"POST",
                        data:{
                            "TOKEN":token
                        },
                        async:false,
                        success:function (ret) {
                            var ret1 = JSON.parse(ret).data;
                            if(JSON.parse(ret).code == 0){
                                for(var i = 0; i < ret1.length; i++){
                                    if(ret1[i].isdefault == "1"){
                                        phone = ret1[i].tel;
                                        dz = ret1[i].province + ret1[i].city + ret1[i].county + ret1[i].town;
                                        name = ret1[i].name;
                                    }
                                }
                            }
                            
                        }
                    });
                    if(bhrettype == 1 || bhrettype == 2){
                        var bhkdHtml = '';
                        bhkdHtml += "<div id='deliveryBox'>";
                        bhkdHtml += "<div id='way'>";
                        bhkdHtml += "<i>获取方式</i><div style='display: inline-block;'><input type='radio' checked   name='ispostal' value='1' id='express'/><label for='express'  class=''>快递</label></div><div style='display: inline-block;'><input type='radio' checked  name='ispostal' value='2' id='selfLift'/><label for='selfLift' class=''>自提</label></div>";
                        bhkdHtml += "</div>";
                        bhkdHtml += "<p style='line-height: .8rem;font-weight: 600' id='dz'>收货地址<i class='star''>(默认地址,点击可修改)</i></p>";
                        bhkdHtml += "<div id='edit'>";
                        bhkdHtml += "<p><span id='name'>"+ name +"</span><电话<span id='phone'>"+ phone +"</span></p>";
                        bhkdHtml += "<p><span id='site'>"+ dz +"</span>";
                        bhkdHtml += "</div>";
                        bhkdHtml += "</div>";
                        $("#radioForm").append(bhkdHtml);
                    }else {
                        var bhkdHtml = '';
                        bhkdHtml += "<input type='hidden' name='ispostal' value='0'/>";
                        $("#radioForm").append(bhkdHtml);
                    }

                }
                }
                
        })
    }
    //设置默认页面
    $("#dz").click(function () {
        location.href = "managePlace.html";
    });
    //提交
    $("#submit").click(function () {

        var formData2 = serializeForm($("#materials"));
        var formData3 = serializeForm($("#radioForm"))
        var aa = [];
        /*for(var i = 0 ; i < $(":file").length; i++){
            //formData1.append($(":file").eq(i).attr("name"),$(":file").eq(i).val());
            console.log($(":file").eq(i).val())
        }*/

        for(var p in formData2){
            var bb = {};
            var a1 = formData2[p].split("_")[0];
            var a2 = formData2[p].split("_")[1];
            bb.value = a1;
            bb.eletable_id = a2;
            aa.push(bb);
        }
        var value = '';
        for(var i = 0; i < $(".tabBox").length; i++){
            var ee = {}
            for(var j = 0; j < $(".tabBox").eq(i).find("form").length; j++){

                for(var k = 0; k < $(".tabBox").eq(i).find("form").eq(j).find("input").length; k++){
                    if(k == ($(".tabBox").eq(i).find("form").eq(j).find("input").length-1)){

                        value += $(".tabBox").eq(i).find("form").eq(j).find("input").eq(k).val()
                    }else{

                        value += $(".tabBox").eq(i).find("form").eq(j).find("input").eq(k).val() + ",";
                    }

                }
                if(j == ($(".tabBox").eq(i).find("form").length-1)){
                    value = value;
                }else{
                    value += "#";
                }

            }
            ee.value = value;
            ee.eletable_id = '1';
            aa.push(ee);
        }
        var cc = [];
        for(var i = 0; i < $(":file").length; i++ ){
            var dd = {};
            var a3 = $(":file").eq(i).attr("name");
            dd.value = card;
            dd.material_id = a3;
            cc.push(dd);
        }
        var ajData = {
            "data": {
                "region_id":data.region_code,
                "user_id":data.id,
                "item_id":data1.id,
                "material_value":aa,
                "material":cc,
            }
        }
        //$("#nameArray").val(JSON.stringify(ajData));
        //var formData1 = new FormData();
        var formData2 = new FormData($("#photoForm")[0])
        formData2.append("TOKEN",JSON.stringify(token));
        formData2.append("data",JSON.stringify(ajData))
        formData2.append("ispostal",JSON.stringify(formData3.ispostal.split("_")[0]));

        $.ajax({
            type:"POST",
            url: ip + "/Interfaces/Event/applyEvent",
            async:false,
            data:formData2,
            cache: false,
            contentType: false,
            processData: false,
            success:function(ret) {
                console.log(JSON.parse( ret ));
            }
        });
    })
});