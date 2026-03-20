package com.blogproject.blogproject.repository;

import com.blogproject.blogproject.entities.SocialMedia;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface SocialMediaRepository extends MongoRepository<SocialMedia, String> {

    SocialMedia findSocialMediaByLink(String link);

}
