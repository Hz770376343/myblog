package com.zhy.model;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author: LinAllen
 * @Date: 2020/11/3 15:36
 * Describe: 标签
 */
@Data
@NoArgsConstructor
public class Menu {

    private int id;

    private String menu_name;

    private String menu_link;

    private String menu_title;

    private String style;

    private String active;

    private int seq;
}
