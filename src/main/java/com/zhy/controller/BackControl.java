package com.zhy.controller;

import com.zhy.service.ArticleService;
import com.zhy.utils.StringUtil;
import com.zhy.utils.TransCodingUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Map;

/**
 * @author: zhangocean
 * @Date: 2018/5/17 19:24
 * Describe: 所有页面跳转
 */
@Controller
public class BackControl extends BaseControl {

    private static final String SLASH_SYMBOL = "/";

    @Autowired
    ArticleService articleService;

    /**
     * 跳转首页
     */
    @GetMapping("/")
    public String index(HttpServletRequest request, HttpServletResponse response, Model model){
        response.setHeader("Access-Control-Allow-Origin", "*");
        //判断是否有需要回跳的url，有则将需要回跳的url保存在响应头中
        response.setHeader("lastUrl", (String) request.getSession().getAttribute("lastUrl"));
        model.addAttribute("title", "首页");
        this.setSysConfigModel(model);
        model.addAttribute("broadcasts", this.getBroadcast());
        return "index";
    }

    /**
     * 跳转我的女孩页
     */
    @GetMapping("/mylove")
    public String myLove(Model model){
        model.addAttribute("title", "我的女孩");
        model.addAttribute("systemName", this.getSystemName());
        return "mylove";
    }

    /**
     * 跳转我的藏心阁页
     */
    @GetMapping("/myheart")
    public String myheart(Model model){
        model.addAttribute("title", "藏心阁");
        model.addAttribute("systemName", this.getSystemName());
        return "myheart";
    }

    /**
     * 跳转我的故事页
     */
    @GetMapping("/mystory")
    public String mystory(HttpServletRequest request, Model model){
        request.getSession().removeAttribute("lastUrl");
        model.addAttribute("title", "我的故事");
        model.addAttribute("systemName", this.getSystemName());
        return "mystory";
    }

    /**
     * 跳转登录页
     */
    @GetMapping("/login")
    public String login(Model model){
        model.addAttribute("title", "登录");
        model.addAttribute("systemName", this.getSystemName());
        return "login";
    }

    /**
     * 登录前尝试保存上一个页面的url
     */
    @GetMapping("/toLogin")
    @ResponseBody
    public void toLogin(HttpServletRequest request){
        //保存跳转页面的url
        String lastUrl = request.getHeader("Referer");
        if(lastUrl != null){
            try {
                URL url = new URL(lastUrl);
                if(!SLASH_SYMBOL.equals(url.getPath())){
                    request.getSession().setAttribute("lastUrl", lastUrl);
                }
            } catch (MalformedURLException e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * 跳转注册页
     */
    @GetMapping("/register")
    public String register(Model model){
        model.addAttribute("title", "注册");
        model.addAttribute("systemName", this.getSystemName());
        return "register";
    }

    /**
     * 跳转关于我页面
     */
    @GetMapping("/aboutme")
    public String aboutme(HttpServletRequest request, Model model){
        request.getSession().removeAttribute("lastUrl");
        model.addAttribute("title", "关于我");
        this.setSysConfigModel(model);
        return "aboutme";
    }

    /**
     * 跳转更新页
     */
    @GetMapping("/update")
    public String update(HttpServletRequest request, Model model){
        request.getSession().removeAttribute("lastUrl");
        model.addAttribute("title", "更新");
        this.setSysConfigModel(model);
        return "update";
    }

    /**
     * 跳转友链页
     */
    @GetMapping("/friendlylink")
    public String friendlylink(HttpServletRequest request, Model model){
        request.getSession().removeAttribute("lastUrl");
        model.addAttribute("title", "友链");
        this.setSysConfigModel(model);
        return "friendlylink";
    }

    /**
     * 跳转阿狸表白页
     */
    @GetMapping("/ali")
    public String ali(Model model){
        model.addAttribute("title", "我的世界只有你");
        this.setSysConfigModel(model);
        return "ali";
    }

    /**
     * 跳转到用户页
     */
    @GetMapping("/user")
    public String user(HttpServletRequest request, Model model){
        request.getSession().removeAttribute("lastUrl");
        model.addAttribute("title", "个人中心");
        model.addAttribute("systemName", this.getSystemName());
        model.addAttribute("notice", this.getConfig("notice"));
        model.addAttribute("author", this.getConfig("Author"));
        return "user";
    }

    /**
     * 跳转到文章编辑页
     */
    @GetMapping("/editor")
    public String editor(HttpServletRequest request, Model model){
        request.getSession().removeAttribute("lastUrl");
        String id = request.getParameter("id");
        if(!StringUtil.BLANK.equals(id)){
            request.getSession().setAttribute("id", id);
        }

        model.addAttribute("title", "文章编辑");
        model.addAttribute("systemName", this.getSystemName());
        model.addAttribute("author", this.getConfig("Author"));
        return "editor";
    }

    /**
     * 跳转到文章显示页
     */
    @GetMapping("/article/{articleId}")
    public String show(@PathVariable("articleId") long articleId,
                       HttpServletResponse response,
                       Model model,
                       HttpServletRequest request){
        response.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");
        request.getSession().removeAttribute("lastUrl");

        Map<String, String> articleMap = articleService.findArticleTitleByArticleId(articleId);
        if(articleMap.get("articleTitle") != null){
            model.addAttribute("articleTitle",articleMap.get("articleTitle"));
            String articleTabloid = articleMap.get("articleTabloid");
            if(articleTabloid.length() <= 110){
                model.addAttribute("articleTabloid",articleTabloid);
            } else {
                model.addAttribute("articleTabloid",articleTabloid.substring(0,110));
            }
        }
        //将文章id存入响应头
        response.setHeader("articleId",String.valueOf(articleId));
        model.addAttribute("title", "文章显示");
        model.addAttribute("systemName", this.getSystemName());
        model.addAttribute("weChat", this.getConfig("weChat"));
        model.addAttribute("QQ", this.getConfig("QQ"));
        model.addAttribute("author", this.getConfig("Author"));
        return "show";
    }

    /**
     * 跳转到归档页
     */
    @GetMapping("/archives")
    public String archives(HttpServletResponse response,
                           HttpServletRequest request,
                           Model model){
        response.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");
        request.getSession().removeAttribute("lastUrl");
        String archive = request.getParameter("archive");

        if(archive != null && !archive.equals(StringUtil.BLANK)){
            response.setHeader("archive",archive);
        }

        model.addAttribute("title", "归档");
        this.setSysConfigModel(model);
        return "archives";
    }

    /**
     * 跳转到分类页
     */
    @GetMapping("/categories")
    public String categories(HttpServletResponse response,
                             HttpServletRequest request,
                             Model model){
        response.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");
        request.getSession().removeAttribute("lastUrl");
        String category = request.getParameter("category");

        if(category != null && !category.equals(StringUtil.BLANK)){
            response.setHeader("category", TransCodingUtil.stringToUnicode(category));
        }

        model.addAttribute("title", "分类");
        this.setSysConfigModel(model);
        return "categories";
    }

    /**
     * 跳转到标签页
     */
    @GetMapping("/tags")
    public String tags(HttpServletResponse response,
                       HttpServletRequest request,
                       Model model){
        response.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");
        request.getSession().removeAttribute("lastUrl");
        String tag = request.getParameter("tag");

        if(tag != null && !tag.equals(StringUtil.BLANK)){
            response.setHeader("tag", TransCodingUtil.stringToUnicode(tag));
        }

        model.addAttribute("title", "标签");
        this.setSysConfigModel(model);
        return "tags";
    }


    /*
     * 跳转到今日页
     **
     *
     */
    @GetMapping("/yesterday")
    public String yesterday(Model model){
        model.addAttribute("title", "往昔");
        this.setSysConfigModel(model);
        return "yesterday";
     }


    @GetMapping("/today")
    public String today(Model model){
        model.addAttribute("title", "今日");
        this.setSysConfigModel(model);
        return "today";
    }

    @GetMapping("/reward")
    public String reward(HttpServletRequest request, Model model){
        request.getSession().removeAttribute("lastUrl");
        model.addAttribute("title", "募捐");
        this.setSysConfigModel(model);
        return "reward";
    }

    /**
     * 跳转到超级管理员页
     */
    @GetMapping("/superadmin")
    public String superadmin(HttpServletRequest request, Model model){
        request.getSession().removeAttribute("lastUrl");
        model.addAttribute("title", "后台管理");
        model.addAttribute("systemName", this.getSystemName());
        model.addAttribute("notice", this.getConfig("notice"));
        return "superadmin";
    }

    /**
     * 跳转到超级管理员页
     */
    @GetMapping("/admin")
    public String admin(HttpServletRequest request, Model model){
        request.getSession().removeAttribute("lastUrl");
        model.addAttribute("title", "后台管理");
        model.addAttribute("systemName", this.getSystemName());
        model.addAttribute("notice", this.getConfig("notice"));
        return "admin/admin";
    }

    @GetMapping("/forward")
    public String forward(HttpServletRequest request, Model model){
        model.addAttribute("systemName", this.getSystemName());
        return "admin/" + request.getParameter("menu");
    }

    private void setSysConfigModel(Model model) {
        model.addAttribute("systemName", this.getSystemName());
        model.addAttribute("weChat", this.getConfig("weChat"));
        model.addAttribute("QQ", this.getConfig("QQ"));
        model.addAttribute("introduction", this.getConfig("Introduction"));
        model.addAttribute("professionalSkills", this.getConfig("ProfessionalSkills"));
        model.addAttribute("websiteAdvise", this.getConfig("WebsiteAdvise"));
        model.addAttribute("author", this.getConfig("Author"));
    }
}
