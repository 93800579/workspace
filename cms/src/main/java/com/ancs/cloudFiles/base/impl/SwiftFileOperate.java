package com.ancs.cloudFiles.base.impl;

import java.io.File;

import org.javaswift.joss.client.factory.AccountConfig;
import org.javaswift.joss.client.factory.AccountFactory;
import org.javaswift.joss.client.factory.AuthenticationMethod;
import org.javaswift.joss.model.Account;
import org.javaswift.joss.model.StoredObject;
import org.springframework.web.multipart.MultipartFile;

import com.ancs.cloudFiles.base.FileOperate;

public class SwiftFileOperate implements FileOperate {

	private Account account;

	public SwiftFileOperate(String userName, String password, String url) {
		System.out.println("iam runngin............");
		AccountConfig config = new AccountConfig();
		config.setUsername(userName);
		config.setPassword(password);
		config.setAuthUrl(url);
		config.setAuthenticationMethod(AuthenticationMethod.BASIC);
		account = new AccountFactory(config).createAccount();
	}

	@Override
	public File getFile(String fileName) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String saveFile(String fileName, File file) {
		// TODO Auto-generated method stub
		StoredObject object = account.getContainer("image").getObject(fileName);
		object.uploadObject(file);
		return object.getPrivateURL();
	}

	@Override
	public String delFile(String fileName) {
		// TODO Auto-generated method stub
		StoredObject object = account.getContainer("image").getObject(fileName);
		object.delete();
		return "success";
	}

	@Override
	public String getToken() {
		// TODO Auto-generated method stub
		return account.authenticate().getToken();
	}

	@Override
	public String saveFile(String fileName, MultipartFile file) {
		// TODO Auto-generated method stub
		return null;
	}
}
