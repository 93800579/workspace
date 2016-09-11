package com.ancs.cloudFiles.models;
// Generated 2016-8-31 21:56:31 by Hibernate Tools 5.1.0.Beta1

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * PluginVote generated by hbm2java
 */
@Entity
@Table(name = "plugin_vote", catalog = "cms")
public class PluginVote implements java.io.Serializable {

	private Integer id;
	private int siteId;
	private Date startDate;
	private Date endDate;
	private int intervalHour;
	private int maxVote;
	private boolean anonymous;
	private int userCounts;
	private String url;
	private String title;
	private String description;
	private boolean disabled;
	private int itemExtendId;

	public PluginVote() {
	}

	public PluginVote(int siteId, Date startDate, Date endDate, int intervalHour, int maxVote, boolean anonymous,
			int userCounts, String url, String title, boolean disabled, int itemExtendId) {
		this.siteId = siteId;
		this.startDate = startDate;
		this.endDate = endDate;
		this.intervalHour = intervalHour;
		this.maxVote = maxVote;
		this.anonymous = anonymous;
		this.userCounts = userCounts;
		this.url = url;
		this.title = title;
		this.disabled = disabled;
		this.itemExtendId = itemExtendId;
	}

	public PluginVote(int siteId, Date startDate, Date endDate, int intervalHour, int maxVote, boolean anonymous,
			int userCounts, String url, String title, String description, boolean disabled, int itemExtendId) {
		this.siteId = siteId;
		this.startDate = startDate;
		this.endDate = endDate;
		this.intervalHour = intervalHour;
		this.maxVote = maxVote;
		this.anonymous = anonymous;
		this.userCounts = userCounts;
		this.url = url;
		this.title = title;
		this.description = description;
		this.disabled = disabled;
		this.itemExtendId = itemExtendId;
	}

	@Id
	@GeneratedValue(strategy = IDENTITY)

	@Column(name = "id", unique = true, nullable = false)
	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@Column(name = "site_id", nullable = false)
	public int getSiteId() {
		return this.siteId;
	}

	public void setSiteId(int siteId) {
		this.siteId = siteId;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "start_date", nullable = false, length = 19)
	public Date getStartDate() {
		return this.startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "end_date", nullable = false, length = 19)
	public Date getEndDate() {
		return this.endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	@Column(name = "interval_hour", nullable = false)
	public int getIntervalHour() {
		return this.intervalHour;
	}

	public void setIntervalHour(int intervalHour) {
		this.intervalHour = intervalHour;
	}

	@Column(name = "max_vote", nullable = false)
	public int getMaxVote() {
		return this.maxVote;
	}

	public void setMaxVote(int maxVote) {
		this.maxVote = maxVote;
	}

	@Column(name = "anonymous", nullable = false)
	public boolean isAnonymous() {
		return this.anonymous;
	}

	public void setAnonymous(boolean anonymous) {
		this.anonymous = anonymous;
	}

	@Column(name = "user_counts", nullable = false)
	public int getUserCounts() {
		return this.userCounts;
	}

	public void setUserCounts(int userCounts) {
		this.userCounts = userCounts;
	}

	@Column(name = "url", nullable = false, length = 2048)
	public String getUrl() {
		return this.url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	@Column(name = "title", nullable = false, length = 100)
	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	@Column(name = "description", length = 300)
	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Column(name = "disabled", nullable = false)
	public boolean isDisabled() {
		return this.disabled;
	}

	public void setDisabled(boolean disabled) {
		this.disabled = disabled;
	}

	@Column(name = "item_extend_id", nullable = false)
	public int getItemExtendId() {
		return this.itemExtendId;
	}

	public void setItemExtendId(int itemExtendId) {
		this.itemExtendId = itemExtendId;
	}

}
