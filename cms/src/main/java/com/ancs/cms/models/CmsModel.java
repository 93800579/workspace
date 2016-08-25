package com.ancs.cms.models;

import static javax.persistence.GenerationType.IDENTITY;

// Generated 2016-1-19 11:28:06 by Hibernate Tools 4.3.1

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import com.ancs.cms.source.entity.MyColumn;

/**
 * CmsModel generated by hbm2java
 */
@Entity
@Table(name = "cms_model")
public class CmsModel implements java.io.Serializable {

    /**
     * 
     */
    private static final long serialVersionUID = 1L;
    @MyColumn(title = "ID")
    private Integer id;
    @MyColumn(title = "站点", condition = true)
    private int siteId;
    @MyColumn(title = "父模型", condition = true)
    private Integer parentId;
    @MyColumn(title = "名称")
    private String name;
    @MyColumn(title = "模板路径")
    private String templatePath;
    @MyColumn(title = "有子模型", condition = true)
    private boolean hasChild;
    @MyColumn(title = "是链接", condition = true)
    private boolean onlyUrl;
    @MyColumn(title = "有图片列表", condition = true)
    private boolean hasImages;
    @MyColumn(title = "有附件列表", condition = true)
    private boolean hasFiles;
    @MyColumn(title = "已删除", condition = true)
    private boolean disabled;
    @MyColumn(title = "扩展ID")
    private Integer extendId;

    public CmsModel() {
    }

    public CmsModel(int siteId, String name, boolean hasChild, boolean onlyUrl, boolean hasImages, boolean hasFiles,
            boolean disabled) {
        this.siteId = siteId;
        this.name = name;
        this.hasChild = hasChild;
        this.onlyUrl = onlyUrl;
        this.hasImages = hasImages;
        this.hasFiles = hasFiles;
        this.disabled = disabled;
    }

    public CmsModel(int siteId, Integer parentId, String name, String templatePath, boolean hasChild, boolean onlyUrl,
            boolean hasImages, boolean hasFiles, boolean disabled, Integer extendId) {
        this.siteId = siteId;
        this.parentId = parentId;
        this.name = name;
        this.templatePath = templatePath;
        this.hasChild = hasChild;
        this.onlyUrl = onlyUrl;
        this.hasImages = hasImages;
        this.hasFiles = hasFiles;
        this.disabled = disabled;
        this.extendId = extendId;
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

    @Column(name = "parent_id")
    public Integer getParentId() {
        return this.parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

    @Column(name = "name", nullable = false, length = 50)
    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column(name = "template_path", length = 200)
    public String getTemplatePath() {
        return this.templatePath;
    }

    public void setTemplatePath(String templatePath) {
        this.templatePath = templatePath;
    }

    @Column(name = "has_child", nullable = false)
    public boolean isHasChild() {
        return this.hasChild;
    }

    public void setHasChild(boolean hasChild) {
        this.hasChild = hasChild;
    }

    @Column(name = "only_url", nullable = false)
    public boolean isOnlyUrl() {
        return this.onlyUrl;
    }

    public void setOnlyUrl(boolean onlyUrl) {
        this.onlyUrl = onlyUrl;
    }

    @Column(name = "has_images", nullable = false)
    public boolean isHasImages() {
        return this.hasImages;
    }

    public void setHasImages(boolean hasImages) {
        this.hasImages = hasImages;
    }

    @Column(name = "has_files", nullable = false)
    public boolean isHasFiles() {
        return this.hasFiles;
    }

    public void setHasFiles(boolean hasFiles) {
        this.hasFiles = hasFiles;
    }

    @Column(name = "disabled", nullable = false)
    public boolean isDisabled() {
        return this.disabled;
    }

    public void setDisabled(boolean disabled) {
        this.disabled = disabled;
    }

    @Column(name = "extend_id")
    public Integer getExtendId() {
        return this.extendId;
    }

    public void setExtendId(Integer extendId) {
        this.extendId = extendId;
    }

}
