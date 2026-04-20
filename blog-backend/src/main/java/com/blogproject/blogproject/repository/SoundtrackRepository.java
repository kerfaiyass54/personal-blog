package com.blogproject.blogproject.repository;

import com.blogproject.blogproject.entities.Soundtrack;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface SoundtrackRepository  extends MongoRepository<Soundtrack,String> {


}
