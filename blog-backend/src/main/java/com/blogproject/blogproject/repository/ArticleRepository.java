package com.blogproject.blogproject.repository;

import com.blogproject.blogproject.entities.Article;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ArticleRepository extends MongoRepository<Article,String> {


}
