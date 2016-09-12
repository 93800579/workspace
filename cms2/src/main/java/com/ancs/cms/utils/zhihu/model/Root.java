
package com.ancs.cms.utils.zhihu.model;

import java.util.List;



public class Root {
	private String date;

	private List<Stories> stories;

	public void setDate(String date) {
		this.date = date;
	}

	public String getDate() {
		return this.date;
	}

	public void setStories(List<Stories> stories) {
		this.stories = stories;
	}

	public List<Stories> getStories() {
		return this.stories;
	}
}
