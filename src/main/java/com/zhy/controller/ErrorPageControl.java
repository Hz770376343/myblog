package com.zhy.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * @author: zhangocean
 * @Date: 2018/6/7 17:09
 * Describe: 错误页面跳转
 */
@Controller
public class ErrorPageControl extends BaseControl{

    @GetMapping("/404")
    public String error404(Model model){
        model.addAttribute("title", "404");
        model.addAttribute("systemName", this.getSystemName());
        return "404";
    }

    @GetMapping("/403")
    public String error403(Model model){
        model.addAttribute("title", "403");
        model.addAttribute("systemName", this.getSystemName());
        return "403";
    }

}
