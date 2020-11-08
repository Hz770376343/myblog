var deleteArticleId="";

//填充文章管理
function putInArticleManagement(data) {
    var articleManagementTable = $('.articleManagementTable');
    articleManagementTable.empty();
    var heigth = document.documentElement.clientHeight - 140;
    var table = $(`<table style="display: block;overflow-y: auto; height:${heigth}px" class="table am-table am-table-bd am-table-striped admin-content-table  am-animation-slide-right"></table>`);
    table.append($('<thead>' +
        '<tr>' +
        '<th>文章标题</th><th>发布时间</th><th>文章分类</th><th>浏览量</th><th>操作</th>' +
        '</tr>' +
        '</thead>'));
    var tables = $('<tbody class="tables"></tbody>');
    $.each(data['result'], function (index, obj) {
        tables.append($('<tr id="a' + obj['id'] + '"><td><a href="article/' + obj['articleId'] + '">' + obj['articleTitle'] + '</a></td><td>' + obj['publishDate'] + '</td><td>' + obj['articleCategories'] + '</td> <td><span class="am-badge am-badge-success">' + obj['visitorNum'] + '</span></td>' +
            '<td>' +
            '<div class="am-dropdown" data-am-dropdown>' +
            '<button class="articleManagementBtn articleEditor am-btn am-btn-secondary">编辑</button>' +
            '<button class="articleDeleteBtn articleDelete am-btn am-btn-danger">删除</button>' +
            '</div>' +
            '</td>' +
            '</tr>'));
    });
    table.append(tables);
    articleManagementTable.append(table);
    articleManagementTable.append($('<div class="my-row" id="page-father">' +
        '<div id="articleManagementPagination">' +
        '<ul class="am-pagination  am-pagination-centered">' +
        '</ul>' +
        '</div>' +
        '</div>'));

    $('.articleManagementBtn').click(function () {
        var $this = $(this);
        var id = $this.parent().parent().parent().attr("id").substring(1);
        top.location.href = "/editor?id=" + id;
    });
    $('.articleDeleteBtn').click(function () {
        var $this = $(this);
        deleteArticleId = $this.parent().parent().parent().attr("id").substring(1);
        $('#deleteAlter').modal('open');
    })
}

//获得文章管理文章
function getArticleManagement(currentPage) {
    $.ajax({
        type:'post',
        url:'/getArticleManagement',
        dataType:'json',
        data:{
            rows:10,
            pageNum:currentPage
        },
        success:function (data) {
            if(data['status'] == 103){
                dangerNotice(data['message'] + " 获取文章失败")
            } else {
                putInArticleManagement(data['data']);
                scrollTo(0,0);//回到顶部

                //分页
                $("#articleManagementPagination").paging({
                    rows:data['data']['pageInfo']['pageSize'],//每页显示条数
                    pageNum:data['data']['pageInfo']['pageNum'],//当前所在页码
                    pages:data['data']['pageInfo']['pages'],//总页数
                    total:data['data']['pageInfo']['total'],//总记录数
                    callback:function(currentPage){
                        getArticleManagement(currentPage);
                    }
                });
            }
        },
        error:function () {
            alert("获取文章信息失败");
        }
    });
}

//删除文章
$('.sureArticleDeleteBtn').click(function () {
    $.ajax({
        type:'get',
        url:'/deleteArticle',
        dataType:'json',
        data:{
            id:deleteArticleId
        },
        success:function (data) {
            if(data['status'] == 201){
                dangerNotice("删除文章失败")
            } else if(data['status'] == 103){
                dangerNotice(data['message'] + " 删除文章失败")
            } else {
                successNotice("删除文章成功");
                getArticleManagement(1);
            }
        },
        error:function () {
            alert("删除失败");
        }
    });
});

jQuery(function () {
    getArticleManagement(1);
});