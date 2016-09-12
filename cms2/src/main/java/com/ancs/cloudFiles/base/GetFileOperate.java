package com.ancs.cloudFiles.base;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import com.ancs.cloudFiles.base.impl.PhysicalFileOperation;
import com.ancs.cloudFiles.base.impl.SwiftFileOperate;

@Component
public class GetFileOperate {

	@Value("${fileOperate.type}")
	private String type;

	@Bean
	public FileOperate FileOperate() {
		System.out.println(type);
		if ("swift".equals(type)) {
			return new SwiftFileOperate("test:tester", "testing", "http://192.168.1.134:8080/auth/v1.0");
		} else if ("physical".equals(type)) {
			return new PhysicalFileOperation();
		}
		else {
			return null;
		}
	}

}
