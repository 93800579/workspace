package com.ancs.cms.common.base.staticTool;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class StaticTool {
	public boolean staticFor(String url, String path, String fileName) {
		RestTemplate restTemplate = new RestTemplate();
		System.out.println(url);
		System.out.println(path);
		String so = restTemplate.getForObject(url, String.class);
		if (null != so && so.length() > 0) {
			FileWriter fw = null;
			try {
				fw = new FileWriter(new File(path + File.separator + fileName));
				fw.write(so);
				fw.flush();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return false;
			} finally {
				if (null != fw) {
					try {
						fw.close();
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}

				}
			}
			return true;
		}

		return false;
	}
}
