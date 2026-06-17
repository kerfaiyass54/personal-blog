package com.blogproject.blogproject.repository;

import com.blogproject.blogproject.entities.Saved;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface SavedRepository extends MongoRepository<Saved, String> {

    List<Saved> findByUserEmail(String userEmail);

    Optional<Saved> findByUserEmailAndArticleId(
            String userEmail,
            String articleId
    );
}