package com.ancs.cms.common.base.staticTool;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;

import org.apache.shiro.crypto.hash.Md5Hash;
import org.apache.tomcat.util.security.MD5Encoder;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.thymeleaf.context.IContext;
import org.thymeleaf.templateresolver.FileTemplateResolver;

import com.ancs.alphablue.models.AlphablueOrder;
import com.ancs.alphablue.models.AlphablueProduct;
import com.ancs.cloudFiles.models.SysMoudle;
import com.ancs.cloudFiles.models.SysRole;
import com.ancs.cloudFiles.models.SysRoleAuthorized;
import com.ancs.cloudFiles.models.SysRoleMoudle;
import com.ancs.cloudFiles.models.SysRoleUser;
import com.ancs.cloudFiles.models.SysUser;
import com.ancs.cms.common.base.ClassClumn;
import com.ancs.cms.common.base.thymeleaf.MyDialect;

public class CreateByModel {

	private TemplateEngine engine;
	private FileTemplateResolver reslover;
	private String templateParent;
	private String destWeb;
	private String destSrc;

	public CreateByModel(String templateParent, String destWeb, String destSrc) {

		this.templateParent = templateParent;
		this.destSrc = destSrc;
		this.destWeb = destWeb;
	}

	private void bind(String mode) {
		this.engine = new TemplateEngine();
		this.reslover = new FileTemplateResolver();
		engine.setDialect(new MyDialect());
		this.reslover.setTemplateMode(mode);
		this.engine.setTemplateResolver(this.reslover);
	}

	private File resloveByFileToFile(IContext context, Boolean overRidden, String templateFile, String writeFile,
			String templateMode) {
		File file = new File(writeFile);
		if (!overRidden && file.exists())
			return null;
		this.bind(templateMode);
		FileWriter fWriter;
		try {
			fWriter = new FileWriter(file);
			this.engine.process(templateFile, context, fWriter);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return file;
	}

	public void create4Java(Map<String, Object> variables, Boolean overRidden, String[] templateNames,
			String[] packageNames, String className, boolean createPackage) {
		if (templateNames.length != packageNames.length)
			return;
		else {
			for (int i = 0; i < templateNames.length; i++) {
				String temp = this.templateParent + File.separator + templateNames[i];
				char a = '.';
				char b = File.separatorChar;
				String pp = packageNames[i].replace(a, b);
				String parent = destSrc + File.separator + pp;
				File parentPath = new File(parent);
				if (createPackage && !parentPath.exists())
					new File(parent).mkdirs();
				String toFile = parent + File.separator + className + templateNames[i];
				variables.put("packageName", packageNames[i]);
				Context context = new Context(Locale.CHINA, variables);
				resloveByFileToFile(context, overRidden, temp, toFile, "TEXT");
			}
		}

	}

	public void create4JavaByModel(Class<?> c, String[] templateNames, String[] packageNames) {
		Map<String, Object> variables = new HashMap<String, Object>();
		String modelPackage = c.getPackage().getName();
		String className = c.getSimpleName();
		variables.put("modelPackage", modelPackage);
		variables.put("className", className);
		this.create4Java(variables, true, templateNames, packageNames, className, true);
	}


	private String parentPackage;
	
	
	public String getParentPackage() {
		return parentPackage;
	}

	public void setParentPackage(String parentPackage) {
		this.parentPackage = parentPackage;
	}

	public void create4JavaByModel(Class<?> c) {
		Map<String, Object> variables = new HashMap<String, Object>();
		String modelPath = c.getName();
		String className = c.getSimpleName();
		if(null==this.parentPackage)
			throw new RuntimeException();
		variables.put("modelPath", modelPath);
		variables.put("className", className);
		variables.put("packageName", this.parentPackage);
		variables.put("base","sys");
		String parent = (this.destSrc + File.separator +this.parentPackage.replace(".", File.separator));
		File srcPath = new File(templateParent + File.separator + "java");
		File[] tempLateParent = srcPath.listFiles();
		for(File temp:tempLateParent){
			if(temp.isDirectory()){
				File[] files = temp.listFiles();
				for(File t:files){
					if(t.isFile()&&t.length()>0){
						variables.put("dest", temp.getName());
						String destParent = parent+File.separator+temp.getName();
						new File(destParent).mkdirs();
						String destFile = (destParent+File.separator+className+t.getName());
						Context context = new Context(Locale.CHINA, variables);
						resloveByFileToFile(context, true, t.getAbsolutePath(), destFile, "TEXT");
					}
				}
			}
		}
	}

	
	
	
	public void create4HtmlByModel(Class<?> c) {
		Map<String, Object> variables = new HashMap<String, Object>();
		String className = c.getSimpleName();
		File parent = new File(this.destWeb + File.separator + className.toLowerCase());
		parent.mkdirs();
		variables.put("className", className);
		variables.put("list", ClassClumn.getListByC(c));
		variables.put("base","sys");
		Context context = new Context(Locale.CHINA, variables);
		File src = new File(templateParent + File.separator + "html");
		File[] tempLateFile = src.listFiles();
		for (File tempLate : tempLateFile) {
			if (tempLate.isFile() && tempLate.length() > 0) {
				String toFile = parent.getAbsolutePath() + File.separator + tempLate.getName() + ".temp";
				System.out.println(toFile);
				File pFile = resloveByFileToFile(context, true, tempLate.getAbsolutePath(), toFile, "HTML");
				String toFile2 = parent.getAbsolutePath() + File.separator + tempLate.getName();
				resloveByFileToFile(context, true, toFile, toFile2, "TEXT");
				pFile.delete();
			}
		}
	}

	/**
	 * 生成
	 * @param classes 被生成的类
	 * @param createJava  是否生成java
	 * @param createHtml  是否生成html
	 */
	public void createByClassSet(Iterable<Class<?>> classes, boolean createJava, boolean createHtml) {
		for (Class<?> c : classes) {
			if (createJava) {
				create4JavaByModel(c);
			}
			if (createHtml) {
				create4HtmlByModel(c);
			}
		}
	}

	public void createByPackage(String[] packageName, boolean createJava, boolean createHtml) {

		try {
			Set<Class<?>> cls = MyClassUtils.getClasses(packageName);
			createByClassSet(cls, createJava, createHtml);
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	public static final String RPRE = "/Users/log/Documents/workspace/cms/src/main/resources/templates/srcTemplates/";
	final static String webdoDir = "/Users/log/Documents/workspace/cms/src/main/resources/templates/cms";
	final static String tDestsrc = "/Users/log/Documents/workspace/cms/src/main/java";
	final static String[] javaTemplate = { "Controller.java", "Respository.java" };

	/**
	 * 
	 * @param args
	 */
//	public static void main(String args[]) {
//		String adminWebDir = "/Users/log/Documents/workspace/cms/src/main/resources/templates/alphablue";
//		CreateByModel createByModel = new CreateByModel(RPRE, adminWebDir, tDestsrc);
//		createByModel.setParentPackage("com.ancs.alphablue");
//		Class<?>[] classes2 = {AlphablueOrder.class,AlphablueProduct.class};
//		createByModel.createByClassSet(Arrays.asList(classes2), true, true);
//		//createByModel.create4JavaByModel(SysUser.class);
////		createByModel.createByClassSet(s,false,true);
//		// String temp[] = {"Controller.java"};
//		// String packageName[] = {"com.ancs.cms.web"};
//		// createByModel.create4JavaByModel(CmsTagType.class, temp,
//		// packageName);
//		//String[] cl = { "com.ancs.cms.models" };
//
//		//createByModel.createByPackage(cl, false, true);
//		//createOther();
//	
//		String s1 = "test";
//		String so = MD5Encoder.encode(s1.getBytes());
//		System.out.println(so);
//	}

	/**
	 * 生成左侧菜单等
	 * @param c
	 */
	public static void createOther() {
		String s1 = RPRE +File.separator+"html/admin";
		String s2 = "/Users/log/Documents/workspace/cms/src/main/resources/templates/";
		CreateByModel createByModel = new CreateByModel(s1,s2,null);
		String[] cl = { "com.ancs.cms.models" };
		try {
			createByModel.createHtmlByModel(cl);
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public void createHtmlByModel(String[] packageName) throws ClassNotFoundException, IOException {
		Map<String, Object> variables = new HashMap<String, Object>();
		Set<Class<?>> cls = MyClassUtils.getClasses(packageName);
		variables.put("classes", cls);
		Context context = new Context(Locale.CHINA, variables);
		File src = new File(templateParent);
		File[] tempLateFile = src.listFiles();
		for (File tempLate : tempLateFile) {
			if (tempLate.isFile() && tempLate.length() > 0) {
				String toFile = src.getAbsolutePath() + File.separator + tempLate.getName() + ".temp";
				System.out.println(toFile);
				File pFile = resloveByFileToFile(context, true, tempLate.getAbsolutePath(), toFile, "HTML");
				String toFile2 = src.getAbsolutePath() + File.separator + tempLate.getName();
				resloveByFileToFile(context, true, toFile, toFile2, "TEXT");
				pFile.delete();
			}
		}
	}
}
