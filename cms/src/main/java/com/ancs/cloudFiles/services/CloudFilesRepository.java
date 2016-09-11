package com.ancs.cloudFiles.services;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.ancs.cloudFiles.models.CloudFiles;


public interface CloudFilesRepository extends PagingAndSortingRepository<CloudFiles,Integer>{
	public List<CloudFiles> getByUserIdAndParentId(int userId,int parentId);

}
