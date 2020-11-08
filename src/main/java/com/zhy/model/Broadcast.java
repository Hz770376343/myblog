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
public class Broadcast {

    private int id;

    private String value;

    private String active;

    private int seq;
}
