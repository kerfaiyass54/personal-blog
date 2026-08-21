package com.blogproject.blogproject.repository;

import com.blogproject.blogproject.entities.Soundtrack;
import com.blogproject.blogproject.entities.User;
import com.blogproject.blogproject.enums.SoundtrackType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface SoundtrackRepository  extends MongoRepository<Soundtrack,String> {

    long countByUserId(String userId);

    long countByUserIdAndRateGreaterThan(
            String userId,
            int rate
    );

    java.util.List<Soundtrack> findByUserId(
            String userId
    );

    Page<Soundtrack> findByUserIdAndType(
            String userId,
            SoundtrackType type,
            Pageable pageable
    );

    Soundtrack findSoundtrackById(String id);


}
