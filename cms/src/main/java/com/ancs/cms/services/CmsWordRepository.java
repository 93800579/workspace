package com.ancs.cms.services;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.ancs.cms.models.CmsWord;

public interface CmsWordRepository extends PagingAndSortingRepository<CmsWord,Integer>{

}
