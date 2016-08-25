package com.ancs.cms.services;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.ancs.cms.models.CmsTag;

public interface CmsTagRepository extends PagingAndSortingRepository<CmsTag,Integer>{

}
