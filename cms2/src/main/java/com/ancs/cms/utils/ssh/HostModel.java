package com.ancs.cms.utils.ssh;

public class HostModel {

	private String shortName;
	
	private String hostName;
	private String userName;
	private String password;
	private String initPath;
	public String getHostName() {
		return hostName;
	}
	public void setHostName(String hostName) {
		this.hostName = hostName;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getInitPath() {
		return initPath;
	}
	public void setInitPath(String initPath) {
		this.initPath = initPath;
	}
	
	public String getShortName() {
		return shortName;
	}
	public void setShortName(String shortName) {
		this.shortName = shortName;
	}
	public HostModel(String shrotName,String hostName, String userName, String password, String initPath) {
		super();
		this.shortName = shrotName;
		this.hostName = hostName;
		this.userName = userName;
		this.password = password;
		this.initPath = initPath;
	}
	
}
