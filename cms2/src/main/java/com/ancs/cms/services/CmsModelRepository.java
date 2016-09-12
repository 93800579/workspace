package com.ancs.cms.services;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.ancs.cms.models.CmsModel;

public interface CmsModelRepository extends PagingAndSortingRepository<CmsModel,Integer>{

}
