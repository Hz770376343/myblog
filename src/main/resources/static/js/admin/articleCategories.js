
//获得文章分类信息
function getArticleCategories() {
    $.ajax({
        type:'get',
        url:'/getArticleCategories',
        dataType:'json',
        data:{
        },
        success:function (data) {
            if(data['status'] == 103){
                dangerNotice(data['message'] + " 获得分类失败")
            } else {
                var categoryContent = $('.categoryContent');
                categoryContent.empty();
                categoryContent.append($('<div class="contentTop">' +
                    '目前分类数：<span class="categoryNum">' + data['data']['result'].length + '</span>' +
                    '<div class="updateCategory">' +
                    '<a class="addCategory"><i class="am-icon-plus-square"></i> 添加分类</a> / ' +
                    '<a class="subCategory"><i class="am-icon-minus-square"></i> 删除分类</a>' +
                    '</div>'));
                var categories = $('<div class="categories"></div>');
                $.each(data['data']['result'], function (index, obj) {
                    categories.append($('<span id="p' + obj['id'] + '" class="category">' + obj['categoryName'] + '</span>'));
                })
                categoryContent.append(categories);

                // 添加分类
                $('.addCategory').click(function () {
                    $('#addCategory').modal({
                        relatedTarget: this,
                        onConfirm: function(e) {
                            var categoryName = e.data;
                            categoryName = $.trim(categoryName);
                            if(categoryName == ""){
                                dangerNotice("分类名不能为空！");
                            }else {
                                updateCategory(categoryName, 1);
                            }
                        },
                        onCancel: function(e) {
                        }
                    });
                })

                // 删除分类
                $('.subCategory').click(function () {
                    $('#subCategory').modal({
                        relatedTarget: this,
                        onConfirm: function(e) {
                            var categoryName = e.data;
                            categoryName = $.trim(categoryName);
                            if(categoryName == ""){
                                dangerNotice("分类名不能为空！");
                            }else {
                                updateCategory(categoryName, 2);
                            }
                        },
                        onCancel: function(e) {
                        }
                    });
                })
            }
        },
        error:function () {

        }
    });
}

// 添加或者删除分类
function updateCategory(categoryName, type) {
    $.ajax({
        type:'post',
        url:'/updateCategory',
        dataType:'json',
        data:{
            categoryName:categoryName,
            type:type
        },
        success:function (data) {
            var categoryNum = $('.categoryNum').html();
            if(data['status'] == 401){
                $('.categories').append($('<span id="p' + data['data'] + '" class="category">' + categoryName + '</span>'));
                $('.categoryNum').html(++categoryNum);
                successNotice(data['message']);
            } else if(data['status'] == 103){
                dangerNotice(data['message'] + " 更新分类失败")
            } else if (data['status'] == 402 || data['status'] == 404 || data['status'] == 405){
                dangerNotice(data['message']);
            } else if (data['status'] == 403){
                var allCategories = $('.category');
                $('.categoryNum').html(--categoryNum);
                for(var i=0;i<allCategories.length;i++){
                    if(allCategories[i].innerHTML == categoryName){
                        allCategories[i].remove();
                    }
                }
                successNotice(data['message']);
            }
        },
        error:function () {
            alert("操作失败");
        }
    });
}

//点击分类管理
$('.superAdminList .articleCategories').click(function () {
    getArticleCategories();
});

jQuery(function () {
    getArticleCategories();
});