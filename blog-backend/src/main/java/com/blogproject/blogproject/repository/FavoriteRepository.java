package com.blogproject.blogproject.repository;

import com.blogproject.blogproject.entities.Favorite;
import com.blogproject.blogproject.entities.Skill;
import com.blogproject.blogproject.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends MongoRepository<Favorite, String> {

    List<Favorite> findByUser(User user);

    Optional<Favorite> findByUserAndSkill(User user, Skill skill);

    boolean existsByUserAndSkill(User user, Skill skill);

    @Query(value = "{ 'user.email' : ?0 }", count = true)
    long countFavoritesByUserEmail(String email);
}