package com.zhy.controller;

import com.zhy.model.Broadcast;
import com.zhy.model.SysConfig;
import com.zhy.service.SysConfigService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class BaseControl {

    private String systemName = "";

    static HashMap<String, Object> configMap = new HashMap<>();

    @Autowired
    SysConfigService sysConfigService;

    public BaseControl() {

    }

    public String getSystemName() {
        if (configMap.get("SystemName") != null) {
            this.systemName = configMap.get("SystemName").toString();
        } else {
            SysConfig config = sysConfigService.findSysConfigByKey("001");
            if (config != null) {
                configMap.put(config.getConfig_name(), config.getConfig_value());
                this.systemName = configMap.get("SystemName").toString();
            } else {
                this.systemName = "码农物语";
            }
        }

        return this.systemName;
    }

    public String getConfig(String config_name) {
        String config_value= "";
        if (configMap.get(config_name) != null) {
            config_value = configMap.get(config_name).toString();
        } else {
            SysConfig config = sysConfigService.findSysConfigByName(config_name);
            if (config != null) {
                configMap.put(config_name, config.getConfig_value());
                config_value = configMap.get(config_name).toString();
            }
        }

        return config_value;
    }

    public List<Broadcast> getBroadcast() {
        List<Broadcast> broadcasts = new ArrayList<Broadcast>();
        if (configMap.get("broadcasts") != null) {
            broadcasts = (List<Broadcast>) configMap.get("broadcasts");
        } else {
            broadcasts =  (List<Broadcast>) sysConfigService.getBroadcastList().getData();
            if (broadcasts != null) {
                configMap.put("broadcasts", broadcasts);
            }
        }

        return broadcasts;
    }
}
