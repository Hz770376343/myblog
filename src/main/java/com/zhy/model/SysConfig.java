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
public class SysConfig {

    private int id;

    private String config_name;

    private String config_key;

    private String config_value;

    private String config_type;

    private String active;

    private int seq;
}
