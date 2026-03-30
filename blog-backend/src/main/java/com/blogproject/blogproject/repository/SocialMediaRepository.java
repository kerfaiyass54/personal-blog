package com.blogproject.blogproject.repository;

import com.blogproject.blogproject.entities.SocialMedia;
import com.blogproject.blogproject.enums.SocialMediaType;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


public interface SocialMediaRepository extends MongoRepository<SocialMedia, String> {

    SocialMedia findSocialMediaByLink(String link);

    List<SocialMedia> findSocialMediaByType(SocialMediaType type);

}
