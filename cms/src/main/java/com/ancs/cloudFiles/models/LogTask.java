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
 * LogTask generated by hbm2java
 */
@Entity
@Table(name = "log_task", catalog = "cms")
public class LogTask implements java.io.Serializable {

	private Integer id;
	private int siteId;
	private int taskId;
	private Date begintime;
	private Date endtime;
	private boolean success;
	private String result;

	public LogTask() {
	}

	public LogTask(int siteId, int taskId, Date begintime, boolean success) {
		this.siteId = siteId;
		this.taskId = taskId;
		this.begintime = begintime;
		this.success = success;
	}

	public LogTask(int siteId, int taskId, Date begintime, Date endtime, boolean success, String result) {
		this.siteId = siteId;
		this.taskId = taskId;
		this.begintime = begintime;
		this.endtime = endtime;
		this.success = success;
		this.result = result;
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

	@Column(name = "task_id", nullable = false)
	public int getTaskId() {
		return this.taskId;
	}

	public void setTaskId(int taskId) {
		this.taskId = taskId;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "begintime", nullable = false, length = 19)
	public Date getBegintime() {
		return this.begintime;
	}

	public void setBegintime(Date begintime) {
		this.begintime = begintime;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "endtime", length = 19)
	public Date getEndtime() {
		return this.endtime;
	}

	public void setEndtime(Date endtime) {
		this.endtime = endtime;
	}

	@Column(name = "success", nullable = false)
	public boolean isSuccess() {
		return this.success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	@Column(name = "result")
	public String getResult() {
		return this.result;
	}

	public void setResult(String result) {
		this.result = result;
	}

}