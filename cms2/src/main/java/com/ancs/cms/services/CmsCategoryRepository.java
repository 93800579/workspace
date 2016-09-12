package com.ancs.cms.services;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.ancs.cms.models.CmsCategory;

public interface CmsCategoryRepository extends PagingAndSortingRepository<CmsCategory,Integer>{
	public CmsCategory getByCode(String code);
	
}
