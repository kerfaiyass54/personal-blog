package com.blogproject.blogproject.repository;

import com.blogproject.blogproject.entities.Favorite;
import com.blogproject.blogproject.entities.Skill;
import com.blogproject.blogproject.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends MongoRepository<Favorite, String> {

    List<Favorite> findByUserId(String userId);

    boolean existsByUserIdAndSkillId(
            String userId,
            String skillId
    );

    Optional<Favorite> findByUserIdAndSkillId(
            String userId,
            String skillId
    );

    @Query(value = "{ 'user.email' : ?0 }", count = true)
    long countFavoritesByUserEmail(String email);
}