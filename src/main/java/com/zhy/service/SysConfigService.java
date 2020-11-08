package com.zhy.service;

import com.zhy.model.Broadcast;
import com.zhy.model.SysConfig;
import com.zhy.utils.DataMap;

/**
 * @author: LinAllen
 * @Date: 2020/11/04 19:50
 * Describe:参数配置业务操作
 */
public interface SysConfigService {

    /**
     * 加入参数配置
     * @param sysConfig 参数配置
     */
    DataMap saveSysConfig(SysConfig sysConfig);

    /**
     * 获得参数配置
     * @return
     */
    DataMap findSysConfig();

    /**
     * 获得参数配置
     * @param config_key
     * @return
     */
    SysConfig findSysConfigByKey(String config_key);

    /**
     * 获得参数配置
     * @param config_name
     * @return
     */
    SysConfig findSysConfigByName(String config_name);

    /**
     * 删除参数配置
     * @return
     */
    DataMap deleteSysConfig(long sysConfigId);

    /**
     * 保存广播信息
     * @param broadcast 参数配置
     */
    DataMap saveBroadcast(Broadcast broadcast);

    /**
     * 获得广播信息
     * @return
     */
    DataMap getBroadcastList();

    /**
     * 删除广播信息
     * @return
     */
    DataMap deleteBroadcast(long id);

}
