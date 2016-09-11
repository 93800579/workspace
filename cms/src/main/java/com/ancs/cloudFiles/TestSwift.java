package com.ancs.cloudFiles;

import java.util.Collection;

import org.javaswift.joss.client.factory.AccountConfig;
import org.javaswift.joss.client.factory.AccountFactory;
import org.javaswift.joss.client.factory.AuthenticationMethod;
import org.javaswift.joss.model.Account;
import org.javaswift.joss.model.Container;
import org.javaswift.joss.model.DirectoryOrObject;

public class TestSwift {

//	public static void main(String args[]) {
//		AccountConfig config = new AccountConfig();
//		config.setUsername("test:tester");
//		config.setPassword("testing");
//		config.setAuthUrl("http://192.168.1.134:8080/auth/v1.0");
//		config.setAuthenticationMethod(AuthenticationMethod.BASIC);
//		Account account = new AccountFactory(config).createAccount();
//		System.out.println(account.getHashPassword());
//		
//		Collection<Container> containers = account.list();
//		for (Container currentContainer : containers) {
//			System.out.println(currentContainer.getName());
//		}
//		Container container = account.getContainer("images");
//		
//		Collection<DirectoryOrObject> collection = container.listDirectory();
//		for (DirectoryOrObject d : collection) {
//			System.out.println(d.getName());
//		}
//	}
}
