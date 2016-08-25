package com.ancs.cms.common.base;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.persistence.Column;

import org.springframework.util.StringUtils;

import com.ancs.cms.models.CmsCategory;
import com.ancs.cms.source.entity.MyColumn;


public class ClassClumn extends Base {

	private String clumnName;
	private String cnName;
	private String needVal;
	private String valString;
	
	public String getNeedVal() {
		return needVal;
	}

	public void setNeedVal(String needVal) {
		this.needVal = needVal;
	}

	public String getValString() {
		return valString;
	}

	public void setValString(String valString) {
		this.valString = valString;
	}

	public String getCnName() {
		return cnName;
	}

	public void setCnName(String cnName) {
		this.cnName = cnName;
	}

	private String clumnType;

	public String getClumnName() {
		return clumnName;
	}

	public void setClumnName(String clumnName) {
		this.clumnName = clumnName;
	}

	public String getClumnType() {
		return clumnType;
	}

	public void setClumnType(String clumnType) {
		this.clumnType = clumnType;
	}

	public ClassClumn(Field f) {
		MyColumn c[] = f.getDeclaredAnnotationsByType(MyColumn.class);
		if (null != c && c.length > 0) {
			this.setCnName(c[0].title());
			for (MyColumn cc : c) {
				System.out.println(cc.title());
			}
		}
		String lowCase = f.getType().getSimpleName().toLowerCase();
		if(lowCase.indexOf("int")>-1||lowCase.indexOf("log")>-1){
			this.setClumnType("num");
		}
		else{
			this.setClumnType(lowCase);
		}
		this.setClumnName(f.getName());
	}
	
	public ClassClumn(Field f,Class<?> cl) {
		MyColumn c[] = f.getDeclaredAnnotationsByType(MyColumn.class);
		
		if (null != c && c.length > 0) {
			this.setCnName(c[0].title());
		}
		String lowCase = f.getType().getSimpleName().toLowerCase();
		if(lowCase.indexOf("int")>-1||lowCase.indexOf("log")>-1){
			this.setClumnType("num");
		}
		else{
			this.setClumnType(lowCase);
		}
		
		try {
			Method method = null;
			if(lowCase.indexOf("boo")>-1){
				  method = cl.getMethod("is"+StringUtils.capitalize(f.getName()));
			}
			else{
			  method = cl.getMethod("get"+StringUtils.capitalize(f.getName()));
			}
			Column column = method.getAnnotation(Column.class);
			if(!column.nullable()){
				setNeedVal("true");
				setValString("required");
			}
			else{
				setNeedVal("false");
				setValString("required");
			}
		} catch (NoSuchMethodException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SecurityException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		this.setClumnName(f.getName());
	}

	public static List<ClassClumn> getListByC(Class<?> c) {
		Field[] fields = c.getDeclaredFields();
		List<ClassClumn> tools = new ArrayList<ClassClumn>();
		for (Field f : fields) {
			ClassClumn classClumn = new ClassClumn(f,c);
			if (null != classClumn.cnName) {
				tools.add(classClumn);
			}
		}
		return tools;

	}

	private final static String dateString = "<td th:text='${#dates.format(model.cccc, 'yyyy-MM-dd')}'>2014-12-01</td>";
	private final static String textString = "<td th:text='${model.cccc}'>&nbsp;</td>";
	private final static String checkString = "<td th:text='${model.cccc?'是':'否'}'>&nbsp;</td>";
	private final static String[] ignore = { "id" };

	public static String createTemplate(Class<?> c) {
		StringBuilder sb = new StringBuilder();
		List<ClassClumn> list = getListByC(c);
		for (ClassClumn cname : list) {
			if (Arrays.binarySearch(ignore, cname.getClumnName()) > -1)
				continue;
			if (cname.getClumnType().indexOf("date") > -1) {
				sb.append(dateString.replaceAll("cccc", cname.getClumnName()));
			} else if (cname.getClumnName().indexOf("bool") > -1) {
				sb.append(checkString.replaceAll("cccc", cname.getClumnName()));
			} else {
				sb.append(textString.replaceAll("cccc", cname.getClumnName()));
			}
		}
		return sb.toString();
	}

	@Override
	public String toString(){
		return this.clumnName+":"+this.clumnType+":"+this.needVal+":"+this.valString;
	}
	
	public static void main(String arg[]) {
		System.out.println(getListByC(CmsCategory.class));
	}
}
