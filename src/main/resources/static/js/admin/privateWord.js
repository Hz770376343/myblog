
//填充悄悄话
function putInAllPrivateWord(data) {
    var privateWord = $('.privateWord');
    privateWord.empty();
    var amPanelGroup = $('<div class="am-panel-group" id="accordion"></div>');
    $.each(data['result'], function (index,obj) {
        var amPanel = $('<div class="am-panel am-panel-default"></div>');
        amPanel.append('<div class="am-panel-hd">' +
            '<h3 style="font-weight: 500" class="am-panel-title" data-am-collapse="{parent: \'#accordion\', target: \'#do-not-say-' + index + '\'}">' +
            obj['publisher'] +
            '</h3>' +
            '</div>');
        var doNotSay = $('<div id="do-not-say-' + index + '" class="am-panel-collapse am-collapse"></div>');
        var userPrivateWord = $('<div class="userPrivateWord am-panel-bd"></div>');
        var userPrivateWordUl = $('<ul class="am-list am-list-border"></ul>');
        $.each(obj['content'], function (index1, obj1) {
            if(obj1['replyContent'] !== ""){
                userPrivateWordUl.append('<li>' +
                    '<div class="userPrivateWordTime">' +
                    obj1['publisherDate'] +
                    '</div><br>' +
                    '<a id="p' + obj1['id'] + '">' + obj1['privateWord']+
                    '<br>' +
                    '<div class="myReply">' +
                    '回复：<span class="myReplyContent">' + obj1['replyContent'] + '</span>' +
                    '</div></a>' +
                    '</li>');
            } else {
                userPrivateWordUl.append('<li>' +
                    '<div class="userPrivateWordTime">' +
                    obj1['publisherDate'] +
                    '</div><br>' +
                    '<a id="p' + obj1['id'] + '">' + obj1['privateWord']+
                    '<br>' +
                    '<div class="myNoReply">' +
                    '回复：<span class="myReplyContent">还没有回复人家哦</span>' +
                    '</div></a><div class="userPrivateWordReply am-animation-slide-top">' +
                    '<textarea class="replyTextarea" placeholder="填写悄悄话回复"></textarea>' +
                    '<button type="button" class="userPrivateWordReplyBtn am-btn am-btn-success am-round">回复</button>' +
                    '<button type="button" class="userPrivateWordReplyCloseBtn am-btn am-round">取消</button>' +
                    '</div>' +
                    '</li>');
            }
        });
        userPrivateWord.append(userPrivateWordUl);
        doNotSay.append(userPrivateWord);
        amPanel.append(doNotSay);
        amPanelGroup.append(amPanel);
    });
    privateWord.append(amPanelGroup);

    $('.userPrivateWord a').click(function () {
        var $this = $(this);
        var userPrivateWordReply = $this.next();
        userPrivateWordReply.toggle();
    });
    $('.userPrivateWordReplyCloseBtn').click(function () {
        $('.userPrivateWordReplyCloseBtn').parent().css("display","none");
    });

    $('.userPrivateWordReplyBtn').click(function () {
        var $this = $(this);
        var replyId = $this.parent().prev().attr("id").substring(1);
        var textarea = $this.prev().val();
        if(textarea.length == 0){
            dangerNotice("你还没有填写回复内容！")
        } else {
            $.ajax({
                type:'post',
                url:'/replyPrivateWord',
                dataType:'json',
                data:{
                    replyId:replyId,
                    replyContent:textarea
                },
                success:function (data) {
                    if(data['status'] == 101){
                        $.get("/toLogin",function(data,status,xhr){
                            window.location.replace("/login");
                        });
                    } else if(data['status'] == 103){
                        dangerNotice(data['message'] + " 回复悄悄话失败")
                    } else {
                        successNotice("回复成功！");
                        $this.prev().val("");
                        $('#p' + data['data']['replyId']).find('.myReplyContent').html(data['data']['replyContent']);
                        $this.parent().css("display","none");
                        $this.parent().prev().find('.myNoReply').css("color","#b5b5b5");
                        $this.parent().prev().attr('disabled', 'true');
                    }
                },
                error:function () {
                    alert("获取悄悄话失败");
                }
            });
        }
    });
}

//点击悄悄话
function privateWord() {
    $.ajax({
        type:'post',
        url:'/getAllPrivateWord',
        dataType:'json',
        data:{
        },
        success:function (data) {
            if(data['status'] == 103){
                dangerNotice(data['message'] + " 获得悄悄话失败")
                return;
            }
            if(data['data']['result'].length == 0){
                $('.privateWord').append($('<div>无悄悄话</div>'));
            } else {
                putInAllPrivateWord(data['data']);
            }
        },
        error:function () {
            alert("获取悄悄话失败");
        }
    });
}

jQuery(function () {
    privateWord();
});