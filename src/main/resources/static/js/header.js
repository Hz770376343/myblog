/** Add Common js file  */
var strFullPath=window.document.location.href;
var strPath=window.document.location.pathname;
var pos=strFullPath.indexOf(strPath);
var prePath=strFullPath.substring(0,pos);
var postPath=strPath.substring(0,strPath.substr(1).indexOf('/')+1);
var appRootPath = prePath+postPath;
var jsHeader = "<script type='text/javascript' src='" + appRootPath + "/";
var jsFooter = "'></script>";
document.write(jsHeader + "js/jquery/jquery.min.js" + jsFooter);
document.write(jsHeader + "js/amazeui.min.js" + jsFooter);

/** Add Common css file  */
var cssHeader = "<link rel='stylesheet' type='text/css' href='" + appRootPath + "/";
var cssFooter = "'></link>";
document.write(cssHeader + "css/amazeui.min.css" + cssFooter);
document.write(cssHeader + "css/fontawesome.min.css" + cssFooter);
document.write(cssHeader + "css/lightgallery.min.css" + cssFooter);

/** Add Title  */
document.write(`<link rel='icon' type='image/x-icon' href='img/favicon.ico'>`);
document.write(`<meta name="keywords" content="博客,个人,学习,IT,生活,程序猿,springboot,java,后端，登录">`);
document.write(`<meta name="description" content="IT农民工，专注Java编程；喜欢旅行、摄影、爱生活；专注于Spring,SpringBoot等后端技术探索，以及MySql,Oracle数据库开发和SSM,SSH等后端流行框架学习。">`);

window.onload=function(){
    //菜单信息
    $.ajax({
        type: 'GET',
        url: '/getMenus',
        dataType: 'json',
        data: {
        },
        success: function (data) {
            var menuItems = $('#menu-items');
            if(data['status'] == 1001 && data['data']['result'].length > 0){
                menuItems.empty();
                $.each(data['data']['result'], function (index, obj) {
                    menuItems.append(`
                    <li><a class="top_bar" href="${obj.menu_link}" style="cursor: pointer;"><span class="${obj.style}"></span>&nbsp;${obj.menu_title}</a></li>
                `);
                });
            } else {
                menuItems.empty();
                menuItems.append(`
                    <li><a class="top_bar" href="/" style="cursor: pointer;"><span class="am-icon-home"></span>&nbsp;首页</a></li>
                    <li><a class="top_bar" href="/categories" style="cursor: pointer;"><span class="am-icon-th"></span>&nbsp;分类</a></li>
                    <li><a class="top_bar" href="/archives" style="cursor: pointer;"><span class="am-icon-archive"></span>&nbsp;归档</a></li>
                    <li><a class="top_bar" href="/tags" style="cursor: pointer;"><span class="am-icon-tags"></span>&nbsp;标签</a></li>
                    <li><a class="top_bar" href="/update" style="cursor: pointer;"><span class="am-icon-calendar-plus-o"></span>&nbsp;更新</a></li>
                    <li><a class="top_bar" href="/friendlylink" style="cursor: pointer;"><span class="am-icon-street-view"></span>&nbsp;友链</a></li>
                    <li><a class="top_bar" href="/aboutme" style="cursor: pointer;"><span class="am-icon-user"></span>&nbsp;关于我</a> </li>
                `);
            }
        },
        error: function () {
        }
    });
}
