package com.zhy.mapper;

import com.zhy.model.Menu;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author: LinAllen
 * @Date: 2018/7/16 19:51
 * Describe: 菜单sql
 */
@Mapper
@Repository
public interface MenuMapper {

    @Select("select * from menu order by seq")
    List<Menu> getMenus();

}
