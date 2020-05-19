package com.jaites.cybermart.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jaites.cybermart.entity.Book;


public interface BookRepository extends JpaRepository<Book, Long>{

}
