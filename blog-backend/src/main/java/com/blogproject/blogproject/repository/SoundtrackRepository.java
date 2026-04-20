package com.blogproject.blogproject.repository;

import com.blogproject.blogproject.entities.Soundtrack;
import com.blogproject.blogproject.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface SoundtrackRepository  extends MongoRepository<Soundtrack,String> {

    List<Soundtrack> findByUser(User user);


}
