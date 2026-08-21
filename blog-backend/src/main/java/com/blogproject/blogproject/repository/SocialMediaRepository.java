package com.blogproject.blogproject.repository;

import com.blogproject.blogproject.entities.SocialMedia;
import com.blogproject.blogproject.enums.SocialMediaType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


public interface SocialMediaRepository extends MongoRepository<SocialMedia, String> {

    Page<SocialMedia> findByUserId(
            String userId,
            Pageable pageable
    );

    Page<SocialMedia> findByUserIdAndType(
            String userId,
            SocialMediaType type,
            Pageable pageable
    );

    boolean existsByLink(String link);

}
