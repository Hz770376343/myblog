package com.zhy.service.impl;

import com.zhy.constant.CodeType;
import com.zhy.mapper.SysConfigMapper;
import com.zhy.model.Broadcast;
import com.zhy.model.SysConfig;
import com.zhy.service.SysConfigService;
import com.zhy.utils.DataMap;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author: LinAllen
 * @Date: 2020/11/04 19:50
 * Describe:
 */
@Service
public class SysConfigServiceImpl implements SysConfigService {

    @Autowired
    private SysConfigMapper sysConfigMapper;

    public DataMap saveSysConfig(SysConfig config) {
        if (config.getId() > 0) {
            sysConfigMapper.updateSysConfig(config);
            return DataMap.success(CodeType.SUCCESS_STATUS)
                    .setData(config.getId());
        } else {
            sysConfigMapper.addSysConfig(config);
            return DataMap.success(CodeType.SUCCESS_STATUS)
                    .setData(config.getId());
        }
    }

    public DataMap findSysConfig() {
        List<SysConfig> configs = sysConfigMapper.findSysConfig();
        return DataMap.success().setData(configs);
    }

    @Override
    public SysConfig findSysConfigByKey(String config_key) {
        return sysConfigMapper.findSysConfigByKey(config_key);
    }

    @Override
    public SysConfig findSysConfigByName(String config_name) {
        return sysConfigMapper.findSysConfigByName(config_name);
    }

    public DataMap deleteSysConfig(long configId) {
        sysConfigMapper.deleteSysConfig(configId);
        return DataMap.success(CodeType.SUCCESS_STATUS)
                .setData(configId);
    }

    /**
     * 保存广播信息
     * @param broadcast 参数配置
     */
    public DataMap saveBroadcast(Broadcast broadcast) {
        if (broadcast.getId() > 0) {
            sysConfigMapper.updateBroadcast(broadcast);
            return DataMap.success(CodeType.SUCCESS_STATUS)
                    .setData(broadcast.getId());
        } else {
            sysConfigMapper.addBroadcast(broadcast);
            return DataMap.success(CodeType.SUCCESS_STATUS)
                    .setData(broadcast.getId());
        }
    }

    /**
     * 获得广播信息
     * @return
     */
    public DataMap getBroadcastList() {
        List<Broadcast> configs = sysConfigMapper.getBroadcastList();
        return DataMap.success().setData(configs);
    }

    /**
     * 删除广播信息
     * @return
     */
    public DataMap deleteBroadcast(long id) {
        sysConfigMapper.deleteBroadcast(id);
        return DataMap.success(CodeType.SUCCESS_STATUS)
                .setData(id);
    }
}
