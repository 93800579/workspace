package com.ancs.cms.services;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.ancs.cms.models.CmsContentFile;

public interface CmsContentFileRepository extends PagingAndSortingRepository<CmsContentFile,Integer>{

}
