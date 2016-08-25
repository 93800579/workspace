package com.ancs.cms.services;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ancs.cms.models.CmsContent;

public interface CmsContentRepository extends JpaRepository<CmsContent,Integer>{

}
