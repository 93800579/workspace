package com.ancs.cms.services;

import org.springframework.data.repository.CrudRepository;

import com.ancs.cms.models.CmsContentAttribute;

public interface CmsContentAttributeRepository extends CrudRepository<CmsContentAttribute, Integer> {
	public CmsContentAttribute findByContentId(Integer id); 

}
