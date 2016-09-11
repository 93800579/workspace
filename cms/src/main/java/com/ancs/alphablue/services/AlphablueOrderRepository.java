package com.ancs.alphablue.services;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ancs.alphablue.models.AlphablueOrder;
import com.ancs.cms.models.CmsContent;

public interface AlphablueOrderRepository extends JpaRepository<AlphablueOrder,Integer>{

	public Page<AlphablueOrder> findByUserId(Integer userId,Pageable pageable);
	public Iterable<AlphablueOrder> findByUserId(Integer userId,Sort sort);
}
