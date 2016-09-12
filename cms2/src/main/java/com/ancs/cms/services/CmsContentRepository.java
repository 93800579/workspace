package com.ancs.cms.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ancs.cms.models.CmsContent;

public interface CmsContentRepository extends JpaRepository<CmsContent,Integer>{
	
	public Page<CmsContent> findByCategoryId(Integer categoryId,Pageable pageable);
	
}
