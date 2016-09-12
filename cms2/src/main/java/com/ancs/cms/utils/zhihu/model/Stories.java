package com.ancs.cms.utils.zhihu.model;

import java.util.List;

public class Stories {
	private List<String> images;

	private int type;

	private int id;

	private String ga_prefix;

	private String title;

	public void setString(List<String> images) {
		this.images = images;
	}

	public List<String> getImages() {
		return this.images;
	}

	public void setType(int type) {
		this.type = type;
	}

	public int getType() {
		return this.type;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getId() {
		return this.id;
	}

	public void setGa_prefix(String ga_prefix) {
		this.ga_prefix = ga_prefix;
	}

	public String getGa_prefix() {
		return this.ga_prefix;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getTitle() {
		return this.title;
	}
}