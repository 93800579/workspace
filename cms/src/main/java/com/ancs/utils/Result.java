package com.ancs.utils;

public class Result {

	private Boolean isok;
	private String message;
	private Object object;
	public Boolean getIsok() {
		return isok;
	}
	public void setIsok(Boolean isok) {
		this.isok = isok;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public Object getObject() {
		return object;
	}
	public void setObject(Object object) {
		this.object = object;
	}
	public Result(Boolean isok, String message, Object object) {
		super();
		this.isok = isok;
		this.message = message;
		this.object = object;
	}
	public Result(boolean isok){
		this.isok = isok;
	}
	public Result(String error){
		this.isok = false;
		this.message = error;
	}
}
