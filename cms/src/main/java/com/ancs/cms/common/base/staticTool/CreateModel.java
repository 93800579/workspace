package com.ancs.cms.common.base.staticTool;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.Set;

import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.thymeleaf.context.IContext;
import org.thymeleaf.templateresolver.FileTemplateResolver;

import com.ancs.cms.common.base.ClassClumn;
import com.ancs.cms.common.base.thymeleaf.MyDialect;
import com.ancs.cms.models.CmsCategory;
@Deprecated
public class CreateModel {

	public static final String RPRE = "/Users/log/Documents/workspace/cms/src/main/resources/templates/srcTemplates/";

	public static void createService(String preFix, Map<String, Object> variables, String writeFile) {
		TemplateEngine templateEngine = new TemplateEngine();

		FileTemplateResolver resolver = new FileTemplateResolver();
		templateEngine.setDialect(new MyDialect());
		resolver.setPrefix(preFix);
		resolver.setTemplateMode("TEXT");
		templateEngine.setTemplateResolver(resolver);
		Context context = new Context(Locale.CHINA, variables);
		FileWriter fWriter;
		try {
			fWriter = new FileWriter(new File(writeFile));
			templateEngine.process("respository", context, fWriter);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	public static File resloveTemplate(String templateName, String writeFile, String templateModel, Boolean overRidden,
			IContext context, String pref) {
		String packageName = context.getVariable("packageName").toString();
		File file = new File(packageName + File.separator + writeFile);
		if (!overRidden && file.exists())
			return null;
		if (overRidden && !file.exists())
			new File(packageName).mkdirs();
		TemplateEngine templateEngine = new TemplateEngine();
		FileTemplateResolver resolver = new FileTemplateResolver();
		templateEngine.setDialect(new MyDialect());
		if (null == pref)
			resolver.setPrefix(RPRE);
		else
			resolver.setPrefix(pref);
		resolver.setTemplateMode(templateModel);
		templateEngine.setTemplateResolver(resolver);
		FileWriter fWriter;

		try {
			fWriter = new FileWriter(file);
			templateEngine.process(templateName, context, fWriter);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return file;

	}

	public static File resloveTemplateByFile(String templateFile, String writeFile, String templateModel,
			Boolean overRidden, IContext context) {
		File file = new File(writeFile);
		if (!overRidden && file.exists())
			return null;

		TemplateEngine templateEngine = new TemplateEngine();
		FileTemplateResolver resolver = new FileTemplateResolver();
		templateEngine.setDialect(new MyDialect());
		resolver.setTemplateMode(templateModel);
		templateEngine.setTemplateResolver(resolver);
		FileWriter fWriter;
		try {
			fWriter = new FileWriter(file);
			templateEngine.process(templateFile, context, fWriter);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return file;

	}

	/**
	 * 通过class生成Controller
	 * 
	 * @param c
	 * @param writeFile
	 */
	public static void createControllerByModelClass(String packageName, Class<?> c) {
		Map<String, Object> variables = new HashMap<String, Object>();
		String modelPackage = c.getPackage().getName();
		String className = c.getSimpleName();
		variables.put("modelPackage", modelPackage);
		variables.put("className", className);
		variables.put("packageName", packageName);
		Context context = new Context(Locale.CHINA, variables);
		resloveTemplate("Controller.java", className + "Controller.java", "TEXT", true, context, null);

	}

	/**
	 * 通过class生成
	 * 
	 * @param c
	 * @param writeFile
	 */

	final static String doDir = "/Users/log/Documents/workspace/cms/src/main/resources/templates/cms";

	public static void createHtmlByModelClass(Class<?> c) {
		Map<String, Object> variables = new HashMap<String, Object>();
		String modelPackage = c.getPackage().getName();
		String className = c.getSimpleName();
		variables.put("modelPackage", modelPackage);
		File parent = new File(doDir + File.separator + className.toLowerCase());
		parent.mkdirs();
		variables.put("className", className);
		variables.put("packageName", className.toLowerCase());
		String list = ClassClumn.createTemplate(c);
		variables.put("cls", list);
		variables.put("list", ClassClumn.getListByC(c));
		System.out.println(list);
		Context context = new Context(Locale.CHINA, variables);
		String toFile = parent.getAbsolutePath() + File.separator + "list.html.temp";
		File pFile = resloveTemplateByFile(RPRE + File.separator + "list.html", toFile, "HTML", true, context);
		String toFile2 = parent.getAbsolutePath() + File.separator + "list.html";
		System.out.println(resloveTemplateByFile(toFile, toFile2, "TEXT", true, context).getAbsolutePath());
		pFile.delete();
	}

	public static void createHtmlsByModelClass(Class<?> c, String[] tempLates) {
		Map<String, Object> variables = new HashMap<String, Object>();
		String modelPackage = c.getPackage().getName();
		String className = c.getSimpleName();
		variables.put("modelPackage", modelPackage);
		File parent = new File(doDir + File.separator + className.toLowerCase());
		parent.mkdirs();
		variables.put("className", className);
		variables.put("packageName", className.toLowerCase());
		String list = ClassClumn.createTemplate(c);
		variables.put("cls", list);
		variables.put("list", ClassClumn.getListByC(c));

		Context context = new Context(Locale.CHINA, variables);
		for (String tempLate : tempLates) {
			String toFile = parent.getAbsolutePath() + File.separator +tempLate +".temp";
			File pFile = resloveTemplateByFile(RPRE + File.separator + tempLate, toFile, "HTML", true, context);
			String toFile2 = parent.getAbsolutePath() + File.separator + tempLate;
			System.out.println(resloveTemplateByFile(toFile, toFile2, "TEXT", true, context).getAbsolutePath());
			pFile.delete();
		}
	}

	/**
	 * 根据包下的所有类生成相应的类
	 */
	public static void createByPackage() {
		String[] Package = { "com.ancs.cms.models" };
		try {
			Set<Class<?>> cls = MyClassUtils.getClasses(Package);
			for (Class<?> cl : cls) {
				System.out.println(cl.getName());
				createControllerByModelClass("com.ancs.cms.web", cl);

			}
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public static void main(String args[]) {
		// createByPackage();
		String[] files = {"list.html","form.html"};
		createHtmlsByModelClass(CmsCategory.class,files);
	}

}
