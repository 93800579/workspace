package com.ancs.cloudFiles.models;
// Generated 2016-8-31 21:56:31 by Hibernate Tools 5.1.0.Beta1

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * SysSite generated by hbm2java
 */
@Entity
@Table(name = "sys_site", catalog = "cms")
public class SysSite implements java.io.Serializable {

	private Integer id;
	private String name;
	private boolean useStatic;
	private String sitePath;
	private boolean useSsi;
	private String dynamicPath;
	private String resourcePath;
	private boolean disabled;

	public SysSite() {
	}

	public SysSite(String name, boolean useStatic, String sitePath, boolean useSsi, String dynamicPath,
			String resourcePath, boolean disabled) {
		this.name = name;
		this.useStatic = useStatic;
		this.sitePath = sitePath;
		this.useSsi = useSsi;
		this.dynamicPath = dynamicPath;
		this.resourcePath = resourcePath;
		this.disabled = disabled;
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

	@Column(name = "name", nullable = false, length = 50)
	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "use_static", nullable = false)
	public boolean isUseStatic() {
		return this.useStatic;
	}

	public void setUseStatic(boolean useStatic) {
		this.useStatic = useStatic;
	}

	@Column(name = "site_path", nullable = false)
	public String getSitePath() {
		return this.sitePath;
	}

	public void setSitePath(String sitePath) {
		this.sitePath = sitePath;
	}

	@Column(name = "use_ssi", nullable = false)
	public boolean isUseSsi() {
		return this.useSsi;
	}

	public void setUseSsi(boolean useSsi) {
		this.useSsi = useSsi;
	}

	@Column(name = "dynamic_path", nullable = false)
	public String getDynamicPath() {
		return this.dynamicPath;
	}

	public void setDynamicPath(String dynamicPath) {
		this.dynamicPath = dynamicPath;
	}

	@Column(name = "resource_path", nullable = false)
	public String getResourcePath() {
		return this.resourcePath;
	}

	public void setResourcePath(String resourcePath) {
		this.resourcePath = resourcePath;
	}

	@Column(name = "disabled", nullable = false)
	public boolean isDisabled() {
		return this.disabled;
	}

	public void setDisabled(boolean disabled) {
		this.disabled = disabled;
	}

}
