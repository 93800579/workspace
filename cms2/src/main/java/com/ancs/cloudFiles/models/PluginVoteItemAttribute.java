package com.ancs.cloudFiles.models;
// Generated 2016-8-31 21:56:31 by Hibernate Tools 5.1.0.Beta1

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * PluginVoteItemAttribute generated by hbm2java
 */
@Entity
@Table(name = "plugin_vote_item_attribute", catalog = "cms")
public class PluginVoteItemAttribute implements java.io.Serializable {

	private int voteItemId;
	private String data;

	public PluginVoteItemAttribute() {
	}

	public PluginVoteItemAttribute(int voteItemId) {
		this.voteItemId = voteItemId;
	}

	public PluginVoteItemAttribute(int voteItemId, String data) {
		this.voteItemId = voteItemId;
		this.data = data;
	}

	@Id

	@Column(name = "vote_item_id", unique = true, nullable = false)
	public int getVoteItemId() {
		return this.voteItemId;
	}

	public void setVoteItemId(int voteItemId) {
		this.voteItemId = voteItemId;
	}

	@Column(name = "data")
	public String getData() {
		return this.data;
	}

	public void setData(String data) {
		this.data = data;
	}

}
