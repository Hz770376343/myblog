package com.zhy.mapper;

import com.zhy.model.Broadcast;
import com.zhy.model.SysConfig;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author: LinAllen
 * @Date: 2020/11/04 19:50
 * Describe:参数配置业务操作
 */
@Mapper
@Repository
public interface SysConfigMapper {

    @Insert("insert into sys_config(config_name,config_key, config_value, config_type) " +
            " values (#{sysConfig.config_name},#{sysConfig.config_key},#{sysConfig.config_value},#{sysConfig.config_type})")
    void addSysConfig(@Param("sysConfig")SysConfig sysConfig);

    @Insert("update sys_config set config_name=#{sysConfig.config_name}, config_key=#{sysConfig.config_key},config_value=#{sysConfig.config_value}, config_type=#{sysConfig.config_type} where id = ${sysConfig.id}")
    void updateSysConfig(@Param("sysConfig") SysConfig sysConfig);

    @Select("select id, config_name, config_key, config_value, config_type, seq, active from sys_config order by config_key")
    List<SysConfig> findSysConfig();

    @Select("select id, config_name, config_key, config_value, config_type, seq, active from sys_config where config_key = #{config_key}")
    SysConfig findSysConfigByKey(@Param("config_key") String config_key);

    @Select("select id, config_name, config_key, config_value, config_type, seq, active from sys_config where lower(config_name) = lower(#{config_name} )")
    SysConfig findSysConfigByName(@Param("config_name") String config_name);

    @Delete("delete from sys_config where id = ${id} ")
    void deleteSysConfig(@Param("id")long id);

    @Insert("insert into broadcast(value, seq, active) " +
            " values (#{broadcast.value},#{broadcast.seq},#{broadcast.active})")
    void addBroadcast(@Param("broadcast") Broadcast broadcast);

    @Insert("update broadcast set value=#{broadcast.value}, seq=#{broadcast.seq},active=#{broadcast.active} where id = ${broadcast.id}")
    void updateBroadcast(@Param("broadcast") Broadcast broadcast);

    @Select("select id, seq, value, active from broadcast order by seq")
    List<Broadcast> getBroadcastList();

    @Delete("delete from broadcast where id = ${id} ")
    void deleteBroadcast(@Param("id")long id);
}
