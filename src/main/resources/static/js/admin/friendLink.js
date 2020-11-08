var friendLinkId="";

// 更新友链的编辑和删除按钮
function updateFriendLinkEditAndDelBtn() {
    //编辑友链
    $('.friendLinkManagementBtn').click(function () {
        $('#addFriendLink').modal('open');
        var $this = $(this).parent().parent().parent();
        var blogger = $this.find('.blogger').html();
        var url = $this.find('.url').html();
        friendLinkId = $this.attr('id').substring(1);
        $('#blogger').val(blogger);
        $('#url').val(url);
    });

    //删除友链
    $('.friendLinkDeleteBtn').click(function () {
        friendLinkId = $(this).parent().parent().parent().attr('id').substring(1);
        $('#deleteFriendLink').modal('open');
    });
}

//获取友链管理
function getFriendLinks() {
    $.ajax({
        type:'post',
        url:'/getFriendLink',
        dataType:'json',
        data:{
        },
        success:function (data) {
            if(data['status'] == 103){
                dangerNotice(data['message'] + " 获得友链失败")
            } else {
                var friendLinkContent = $('.friendLinkContent');
                friendLinkContent.empty();
                friendLinkContent.append($('<div class="contentTop">' +
                    '目前友链数：' +
                    '<span class="friendLinkNum">' + data['data'].length + '</span>' +
                    '<div class="updateFriendLink">' +
                    '<a class="addFriendLink"><i class="am-icon-plus-square"></i> 添加友链</a>' +
                    '</div>' +
                    '</div>'));
                var heigth = document.documentElement.clientHeight - 130;
                var table = $(`<table style="display: block;overflow-y: auto; height:${heigth}px"  class="am-table am-table-bd am-table-striped admin-content-table  am-animation-slide-right"></table>`);
                table.append($('<thead>' +
                    '<tr>' +
                    '<th>博主</th><th>博客地址</th><th>操作</th>' +
                    '</tr>' +
                    '</thead>'));
                var friendLinkManagementTable = $('<tbody class="friendLinkManagementTable"></tbody>');
                for(var i in data['data']){
                    var friendLink = $('<tr id="p' + data['data'][i]['id'] + '">' +
                        '<td class="blogger">' + data['data'][i]['blogger'] + '</td>' +
                        '<td class="url">' + data['data'][i]['url'] + '</td>' +
                        '<td>' +
                        '<div class="am-dropdown" data-am-dropdown="">' +
                        '<button class="friendLinkManagementBtn articleEditor am-btn am-btn-secondary">编辑</button>' +
                        '<button class="friendLinkDeleteBtn articleDelete am-btn am-btn-danger">删除</button>' +
                        '</div>' +
                        '</td>' +
                        '</tr>');
                    friendLinkManagementTable.append(friendLink);
                }
                table.append(friendLinkManagementTable);
                friendLinkContent.append(table);

                //添加友链
                $('.addFriendLink').click(function () {
                    friendLinkId = "";
                    $('#addFriendLink').modal('open');
                    $('#blogger').val("");
                    $('#url').val("");
                });

                updateFriendLinkEditAndDelBtn();
            }
        },
        error:function () {
        }
    });
}

jQuery(function () {
    getFriendLinks();
    //编辑或增加友链
    $('.sureFriendLinkAddBtn').click(function () {
        var blogger = $.trim($('#blogger').val());
        var url = $.trim($('#url').val());
        if(blogger != "" && url != ""){
            $.ajax({
                type:'post',
                url:'/updateFriendLink',
                dataType:'json',
                data:{
                    id:friendLinkId,
                    blogger:blogger,
                    url:url
                },
                success:function (data) {
                    if(data['status'] == 601){
                        successNotice(data['message']);
                        var tr = $('<tr id="p' + data['data'] + '"><td class="blogger">' + blogger + '</td><td class="url">' + url + '</td>' +
                            '<td>' +
                            '<div class="am-dropdown" data-am-dropdown="">' +
                            '<button class="friendLinkManagementBtn articleEditor am-btn am-btn-secondary">编辑</button>' +
                            '<button class="friendLinkDeleteBtn articleDelete am-btn am-btn-danger">删除</button>' +
                            '</div>' +
                            '</td>' +
                            '</tr>');
                        $('.friendLinkManagementTable').append(tr);
                        var friendLinkNum = $('.friendLinkNum').html();
                        $('.friendLinkNum').html(++friendLinkNum);

                        //刷新刚填充上的友链的两个按钮，使编辑和删除两个按钮的js生效
                        updateFriendLinkEditAndDelBtn();
                    } else if(data['status'] == 103){
                        dangerNotice(data['message'] + " 更新友链失败")
                    } else if (data['status'] == 602){
                        dangerNotice(data['message']);
                    } else if(data['status'] == 603){
                        successNotice(data['message']);
                        $('#p' + friendLinkId).find($('.blogger')).html(blogger);
                        $('#p' + friendLinkId).find($('.url')).html(url);
                    } else {
                        dangerNotice(data['message']);
                    }
                },
                error:function () {
                    alert("更新友链失败！")
                }
            });
        } else {
            dangerNotice("博主或博客地址不能为空！");
        }
    });
    //删除友链
    $('.sureFriendLinkDeleteBtn').click(function () {
        $.ajax({
            type:'post',
            url:'/deleteFriendLink',
            dataType:'json',
            data:{
                id:friendLinkId
            },
            success:function (data) {
                if(data['status'] == 604){
                    successNotice(data['message']);
                    $('#p'+ friendLinkId).remove();
                    var friendLinkNum = $('.friendLinkNum').html();
                    $('.friendLinkNum').html(--friendLinkNum);
                } else if(data['status'] == 103){
                    dangerNotice(data['message'] + " 删除友链失败")
                } else {
                    dangerNotice(data['message']);
                }
            },
            error:function () {
                alert("删除友链失败");
            }
        });
    });
});