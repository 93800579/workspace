package com.ancs.cloudFiles.services;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ancs.cloudFiles.models.SysRoleAuthorized;

public interface SysRoleAuthorizedRepository extends JpaRepository<SysRoleAuthorized,Integer>{

}
