package com.ancs.alphablue.services;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ancs.alphablue.models.AlphablueProduct;

public interface AlphablueProductRepository extends JpaRepository<AlphablueProduct,Integer>{

}
