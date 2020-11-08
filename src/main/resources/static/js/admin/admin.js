$('.superAdminList .superAdminClick').click(function () {
    const flag = $(this).attr('class').substring(16);
    $('.superAdminInfo').empty();
    $('.superAdminInfo').append(`<iframe frameborder="0" scrolling="auto" width="100%" height="500" id="menuFrame" src="forward?menu=${flag}" onload="setIframeHeight()"></iframe>`);

});

function setIframeHeight() {
    var iframe = document.getElementById("menuFrame");
    try{
        const dHeight = document.documentElement.clientHeight;
        iframe.height = dHeight - 100;
    }catch (ex){}
};

window.onresize = function () {
    setIframeHeight();
}

jQuery(function () {
    $('.superAdminInfo').empty();
    $('.superAdminInfo').append(`<iframe frameborder="0" scrolling="auto" width="100%" height="500" id="menuFrame" src="forward?menu=statistics" onload="setIframeHeight()"></iframe>`);
});