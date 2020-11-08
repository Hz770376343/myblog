var configLinkId= 0;

// 更新系统参数的编辑和删除按钮
function updateConfigLinkEditAndDelBtn() {
    //编辑系统参数
    $('.configLinkManagementBtn').click(function () {
        $('#addConfigLink').modal('open');
        var $this = $(this).parent().parent().parent();
        var config_key = $this.find('.config_key').html();
        var config_name = $this.find('.config_name').html();
        var config_value = $this.find('.config_value').html();
        var config_type = $this.find('.config_type').html();
        configLinkId = $this.attr('id').substring(1);
        $('#config_key').val(config_key);
        $('#config_name').val(config_name);
        $('#config_value').val(config_value);
        $('#config_type').val(config_type);
    });

    //删除系统参数
    $('.configLinkDeleteBtn').click(function () {
        configLinkId = $(this).parent().parent().parent().attr('id').substring(1);
        $('#deleteConfigLink').modal('open');
    });
}

function clearSession() {
    $.ajax({
        type:'post',
        url:'/clearSession',
        dataType:'json',
        data:{
        },
        success:function (data) {
            if(data['status'] == 0){
                successNotice(data['message'] + "清楚缓存");
            } else {
                dangerNotice(data['message'] + " 清楚缓存失败")
            }
        },
        error:function () {
            alert("更新系统参数失败！")
        }
    });
}

//获取参数管理
function getConfigLinks() {
    $.ajax({
        type:'post',
        url:'/getConfigList',
        dataType:'json',
        data:{
        },
        success:function (data) {
            if(data['status'] != 0){
                dangerNotice(data['message'] + " 获得参数失败")
            } else {
                var configLinkContent = $('.configLinkContent');
                configLinkContent.empty();
                configLinkContent.append($('<div class="contentTop">' +
                    '目前系统参数：' +
                    '<span class="configLinkNum">' + data['data'].length + '</span>' +
                    '<div class="updateConfigLink">' +
                    '<a class="addConfigLink"><i class="am-icon-plus-square"></i> 添加参数</a>' +
                    '<a class="clearSession"><i class="am-icon-remove"></i> 清除缓存</a>' +
                    '</div>' +
                    '</div>'));
                var heigth = document.documentElement.clientHeight - 130;
                var table = $(`<table style="display: block;overflow-y: auto; height:${heigth}px"  class="am-table am-table-bd am-table-striped admin-content-table  am-animation-slide-right"></table>`);
                table.append($('<thead>' +
                    '<tr>' +
                    '<th style="width:5%">编号</th> <th style="width:15%">名称</th> <th style="width:50%">参数值</th> <th style="width:10%">类型</th> <th style="width:15%">操作</th>' +
                    '</tr>' +
                    '</thead>'));
                var configLinkManagementTable = $('<tbody class="configLinkManagementTable"></tbody>');
                for(var i in data['data']){
                    var configLink = $('<tr id="p' + data['data'][i]['id'] + '">' +
                        '<td class="config_key">' + data['data'][i]['config_key'] + '</td>' +
                        '<td class="config_name">' + data['data'][i]['config_name'] + '</td>' +
                        '<td class="config_value">' + data['data'][i]['config_value'] + '</td>' +
                        '<td class="config_type">' + data['data'][i]['config_type'] + '</td>' +
                        '<td>' +
                        '<div class="am-dropdown" data-am-dropdown="">' +
                        '<button class="configLinkManagementBtn articleEditor am-btn am-btn-secondary">编辑</button>' +
                        '<button class="configLinkDeleteBtn articleDelete am-btn am-btn-danger">删除</button>' +
                        '</div>' +
                        '</td>' +
                        '</tr>');
                    configLinkManagementTable.append(configLink);
                }
                table.append(configLinkManagementTable);
                configLinkContent.append(table);

                //添加参数
                $('.addConfigLink').click(function () {
                    configLinkId = 0;
                    $('#addConfigLink').modal('open');
                    $('#addConfigLink').modal('open');
                    $('#config_type').val("System");
                });

                //清楚缓存
                $('.clearSession').click(function () {
                    clearSession();
                });

                updateConfigLinkEditAndDelBtn();
            }
        },
        error:function () {
        }
    });
}

jQuery(function () {
    getConfigLinks();
    //编辑或增加系统参数
    $('.sureConfigLinkAddBtn').click(function () {
        var config_key = $.trim($('#config_key').val());
        var config_name = $.trim($('#config_name').val());
        var config_value = $.trim($('#config_value').val());
        var config_type = $.trim($('#config_type').val());
        if(config_key != "" && config_name != ""){
            $.ajax({
                type:'post',
                url:'/updateConfig',
                dataType:'json',
                data:{
                    id:configLinkId,
                    config_key:config_key,
                    config_name:config_name,
                    config_value:config_value,
                    config_type:config_type,
                },
                success:function (data) {
                    if(data['status'] == 0){
                        successNotice(data['message']+ "保存系统参数");
                        getConfigLinks();
                    } else {
                        dangerNotice(data['message'] + " 保存系统参数失败")
                    }
                },
                error:function () {
                    alert("更新系统参数失败！")
                }
            });
        } else {
            dangerNotice("编号或名称不能为空！");
        }
    });
    //删除系统参数
    $('.sureConfigLinkDeleteBtn').click(function () {
        $.ajax({
            type:'post',
            url:'/deleteConfig',
            dataType:'json',
            data:{
                id:configLinkId
            },
            success:function (data) {
                if(data['status'] == 0){
                    successNotice(data['message'] + "删除系统参数");
                    $('#p'+ configLinkId).remove();
                    var configLinkNum = $('.configLinkNum').html();
                    $('.configLinkNum').html(--configLinkNum);
                } else {
                    dangerNotice(data['message'] + " 删除系统参数失败")
                }
            },
            error:function () {
                alert("删除系统参数失败");
            }
        });
    });
});