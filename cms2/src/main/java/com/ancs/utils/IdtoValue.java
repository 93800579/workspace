package com.ancs.utils;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ancs.alphablue.models.AlphablueProduct;
import com.ancs.alphablue.services.AlphablueProductRepository;
import com.ancs.cloudFiles.models.SysUser;
import com.ancs.cloudFiles.services.SysUserRepository;
import com.ancs.cms.models.CmsCategory;
import com.ancs.cms.services.CmsCategoryRepository;

@Component
public class IdtoValue {

	@Autowired 
	CmsCategoryRepository repository;
	@Autowired 
	AlphablueProductRepository ps;
	@Autowired
	SysUserRepository us;
	
	static Map<Integer,CmsCategory> hs;
	static Map<String,String> idToValues;
	static Map<Integer, AlphablueProduct> idToPorduct;
	
	public String getUserNameById(Integer id,String type){
		if(null==idToValues)
			idToValues = new HashMap<String, String>();
		String key = type+"_"+id;
		if(null!=idToValues.get(key))
			return idToValues.get(key);
		else{
			if("user".equals(type)){
				SysUser user = us.findOne(id);
				idToValues.put(key, user.getNickName());
				return user.getNickName();
			}
			else if("product".equals(type)){
				AlphablueProduct product = ps.findOne(id);
				idToValues.put(key,product.getPname());
				return product.getPname();
			}
			else{
				return null;
			}
			
		}
	}
	
	public AlphablueProduct getProductById(Integer id){
		if(null==idToPorduct)
			idToPorduct = new HashMap<Integer, AlphablueProduct>();
		if(null!=idToPorduct.get(id))
			return idToPorduct.get(id);
		else{
			AlphablueProduct product =  null;
			product = ps.findOne(id);
			idToPorduct.put(id, product);
			return product;
		}
	}
	
	public  CmsCategory getById(Integer id){
		if(null==hs)
			hs = new HashMap<Integer, CmsCategory>();
		if(null!=hs.get(id))
			return hs.get(id);
		else{
			CmsCategory category = repository.findOne(id);
			if(null!=category){
				hs.put(id, category);
				return category;
			}
			
			
		}
		return null;
	}
	public String getOrderType(String type){
		if ("0".equals(type)) {
			return "等待支付";
		}
		else if("1".equals(type)){
			return "等待发货";
		}
		else if("2".equals(type)){
			return "等待收货";
		}
		else if("3".equals(type)){
			return "已经收货";
		}
		else if("4".equals(type)){
			return "订单完成";
		}
		else if("5".equals(type)){
			return "订单取消";
		}
		else {
			return "";
		}
	}
	public String hello(){
		return "hello world";
	}
}
