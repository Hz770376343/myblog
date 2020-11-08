
var bloggerReward = "码农物语";
//删除募捐记录
var thisRewardMoney = "";
var removeRewardMoneyId = "";


// 更新募捐删除按钮
function updateRewardDelBtn() {
    $('.deleteReward').click(function () {
        removeRewardMoneyId = $(this).parent().parent().attr("id").substring(1);
        thisRewardMoney = $(this).parent().prev().prev().prev().find('.am-icon-cny').html();
        $('#deleteReward').modal('open');
    })
}

//获得募捐管理信息
function getRewardInfo() {
    //点击募捐管理
    $.ajax({
        type:'post',
        url:'/getRewardInfo',
        dataType:'json',
        data:{
        },
        success:function (data) {
            if (data['status'] == 103){
                dangerNotice(data['message'] + " 获得募捐记录失败");
                return;
            }
            var rewardContent = $('.rewardContent');
            rewardContent.empty();
            rewardContent.append($('<div class="contentTop">募捐总金额：' +
                '<span class="rewardNum"> </span>元' +
                '<div class="updateReward">' +
                '<a class="addReward"><i class="am-icon-plus-square"></i> 添加募捐记录</a>' +
                '</div>' +
                '</div>'));
            var heigth = document.documentElement.clientHeight - 130;
            var table = $(`<table style="display: block;overflow-y: auto; height:${heigth}px" class="table am-table am-table-bd box-shadow am-table-hover"></table>`);
            var thead = $('<thead>' +
                '<tr>' +
                '<th>昵称</th><th>募捐来源</th><th>募捐去处</th><th style="width: 60px;">金额</th><th class="am-hide-sm-down">备注</th><th>时间</th><th>操作</th>' +
                '</tr>' +
                '</thead>');
            var rewardTable = $('<tbody id="rewardTable"></tbody>');
            var rewardMoney = 0;
            if (data['data'].length > 0 && data['status'] == 0){
                $.each(data['data'], function (index,obj) {
                    var fundRaiser = obj['fundRaiser'];
                    var tr = $('<tr id=p' + obj['id'] +  '></tr>');
                    if(fundRaiser == bloggerReward){
                        tr.append($('<th>'+ fundRaiser +'<span class="is-me am-badge am-badge-danger am-radius am-round">?</span></th>'));
                    } else {
                        tr.append($('<th>'+ fundRaiser +'</th>'));
                    }
                    rewardMoney += obj['rewardMoney'];
                    tr.append($('<th>' + obj['fundRaisingSources'] + '</th>' +
                        '<th>'+ obj['fundraisingPlace'] + '</th>' +
                        '<th><i class="am-icon-cny">'+ obj['rewardMoney'] + '</i></th>' +
                        '<th class="am-hide-sm-down">'+ obj['remarks'] + '</th>' +
                        '<th>'+ timestampToYMDTime(obj['rewardDate']) + '</th>' +
                        '<th>' +
                        '<button type="button" class="deleteReward am-btn am-btn-warning am-btn-xs">删除</button>' +
                        '</th>'));
                    rewardTable.append(tr);
                })
            }
            table.append(thead);
            table.append(rewardTable);
            rewardContent.append(table);
            $('.rewardNum').html(rewardMoney.toFixed(2));

            //删除募捐记录
            updateRewardDelBtn();
            // $('.deleteReward').click(function () {
            //     removeRewardMoneyId = $(this).parent().parent().attr("id").substring(1);
            //     thisRewardMoney = $(this).parent().prev().prev().prev().find('.am-icon-cny').html();
            //     $('#deleteReward').modal('open');
            // })

            //添加募捐记录
            $('.addReward').click(function () {
                $('#addReward').modal('open');
            })
        },
        error:function () {
        }
    });
}

//时间转换为2019年7月13日
function timestampToYMDTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + '年';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '月';
    D = date.getDate() + '日';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();
    return Y+M+D;
}

jQuery(function () {
    getRewardInfo();
    //增加募捐记录
    $('.sureAddRewardBtn').click(function () {
        var formData = new FormData();
        var fundRaiser = $("#fundRaiser").val();
        var rewardMoney = $("#rewardMoney").val();
        var reward_date = $("#reward-date").val();
        var fundRaisingSources = $("#fundRaisingSources").val();
        var fundraisingPlace = $("#fundraisingPlace").val();
        var remarks = $("#remarks").val();

        if(fundRaiser == ""){
            dangerNotice("昵称为空");
            return;
        }
        if(rewardMoney == ""){
            dangerNotice("募捐金额为空");
            return;
        }
        if(reward_date == ""){
            dangerNotice("募捐日期为空");
            return;
        }
        if(fundRaisingSources == ""){
            dangerNotice("募捐来源为空");
            return;
        }
        if(fundraisingPlace == ""){
            dangerNotice("募捐去处为空");
            return;
        }
        if($('#file')[0].files[0] == undefined){
            dangerNotice("未选择图片");
            return;
        }

        formData.append('fundRaiser',  fundRaiser);
        formData.append('rewardMoney',  rewardMoney);
        formData.append('reward-date',  reward_date);
        formData.append('fundRaisingSources',  fundRaisingSources);
        formData.append('fundraisingPlace',  fundraisingPlace);
        formData.append('remarks',  remarks);
        formData.append('file',  $('#file')[0].files[0]);
        $.ajax({
            type:'post',
            url:'/addReward',
            dataType:'json',
            cache: false,
            data: formData,
            async:false,
            processData: false,
            contentType: false,
            success:function (data) {
                var rewardNum = $('.rewardNum').html();
                if (data['status'] == 101){
                    $.get("/toLogin",function(data,status,xhr){
                        window.location.replace("/login");
                    });
                } else if(data['status'] == 103){
                    dangerNotice(data['message'] + " 增加募捐记录失败")
                } else if(data['status'] == 701){
                    successNotice(data['message'])

                    var rewardContent = $('.rewardContent .table tbody');
                    var tr = $('<tr id=p' + data['data'] + '></tr>');
                    if(fundRaiser == bloggerReward){
                        tr.append($('<th>'+ fundRaiser +'<span class="is-me am-badge am-badge-danger am-radius am-round">?</span></th>'));
                    } else {
                        tr.append($('<th>'+ fundRaiser +'</th>'));
                    }
                    tr.append($('<th>' + fundRaisingSources + '</th>' +
                        '<th>'+ fundraisingPlace + '</th>' +
                        '<th><i class="am-icon-cny">'+ rewardMoney + '</i></th>' +
                        '<th class="am-hide-sm-down">'+ remarks + '</th>' +
                        '<th>'+ timestampToYMDTime(reward_date) + '</th>' +
                        '<th>' +
                        '<button type="button" class="deleteReward am-btn am-btn-warning am-btn-xs">删除</button>' +
                        '</th>'));
                    rewardContent.append(tr);
                    var money = Number(rewardNum)+Number(rewardMoney);
                    $('.rewardNum').html(money);

                    updateRewardDelBtn();
                } else {
                    dangerNotice(data['message'])
                }
            },
            error:function () {
            }
        });
    });
    //删除募捐记录
    $('.sureRewardDeleteBtn').click(function () {
        $.ajax({
            type:'get',
            url:'/deleteReward',
            dataType:'json',
            data:{
                id:removeRewardMoneyId
            },
            success:function (data) {
                var rewardNum = $('.rewardNum').html();
                if(data['status'] == 101){
                    $.get("/toLogin",function(data,status,xhr){
                        window.location.replace("/login");
                    });
                } else if(data['status'] == 103){
                    dangerNotice(data['message'] + " 删除募捐记录失败")
                } else if (data['status'] == 702){
                    successNotice(data['message']);
                    $('#p'+removeRewardMoneyId).remove();
                    $('.rewardNum').html(rewardNum-thisRewardMoney);
                } else {
                    dangerNotice(data['message'])
                }
            },
            error:function () {
            }
        });
    });
});