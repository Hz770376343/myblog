package com.zhy.service.impl;

import com.zhy.constant.CodeType;
import com.zhy.mapper.MenuMapper;
import com.zhy.model.Menu;
import com.zhy.service.MenuService;
import com.zhy.utils.DataMap;
import net.sf.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author: LinAllen
 * @Date: 2020/11/3 19:50
 * Describe:
 */
@Service
public class MenuServiceImpl implements MenuService {

    @Autowired
    MenuMapper menuMapper;

    @Override
    public DataMap getMenus() {
        List<Menu> tags = menuMapper.getMenus();
        Map<String, Object> dataMap = new HashMap<>(2);
        dataMap.put("result",JSONArray.fromObject(tags));
        dataMap.put("tagsNum",tags.size());
        return DataMap.success(CodeType.GET_MENUS_LIST).setData(dataMap);
    }
}
