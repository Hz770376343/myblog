
//获取统计信息
function getStatisticsInfo() {
    $.ajax({
        type:'get',
        url:'/getStatisticsInfo',
        dataType:'json',
        data:{
        },
        success:function (data) {
            if(data['status'] == 103){
                dangerNotice(data['message'] + " 获取统计信息失败")
            } else {
                $('.allVisitor').html(data['data']['allVisitor']);
                $('.yesterdayVisitor').html(data['data']['yesterdayVisitor']);
                $('.allUser').html(data['data']['allUser']);
                $('.articleNum').html(data['data']['articleNum']);
                if(data['data']['articleThumbsUpNum'] != 0){
                    $('.articleThumbsUp').find('a').append($('<span class="am-badge am-badge-warning am-margin-right am-fr articleThumbsUpNum">' + data['data']['articleThumbsUpNum'] + '</span>'));
                }
            }
        },
        error:function () {
            alert("获取统计信息失败");
        }
    });
}

jQuery(function () {
    getStatisticsInfo();
});