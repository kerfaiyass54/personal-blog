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

    List<Soundtrack> findByUser(User user);

    Page<Soundtrack> findByUserAndType(User user, SoundtrackType type,  Pageable pageable);


}
