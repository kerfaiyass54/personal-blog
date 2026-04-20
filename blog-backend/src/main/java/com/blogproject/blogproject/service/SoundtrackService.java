package com.blogproject.blogproject.service;

import com.blogproject.blogproject.dtos.SoundtrackCreateDTO;
import com.blogproject.blogproject.entities.Soundtrack;
import com.blogproject.blogproject.entities.User;
import com.blogproject.blogproject.repository.SoundtrackRepository;
import com.blogproject.blogproject.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class SoundtrackService {

    private final SoundtrackRepository soundtrackRepository;

    private final UserRepository userRepository;


    public SoundtrackService(
            SoundtrackRepository soundtrackRepository,
            UserRepository userRepository
    ) {

        this.soundtrackRepository = soundtrackRepository;
        this.userRepository = userRepository;
    }


    public Integer getTotalSoundtracks(String email) {

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException("User not found"));

        return soundtrackRepository
                .findByUser(user)
                .size();
    }


    public Integer getRatedSoundtracks(String email) {

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException("User not found"));

        return (int)
                soundtrackRepository
                        .findByUser(user)
                        .stream()
                        .filter(track ->
                                track.getRate() != null
                                        && track.getRate() != 0
                        )
                        .count();
    }


    public List<Soundtrack> getUserSoundtracks(String email) {

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException("User not found"));

        return soundtrackRepository.findByUser(user);
    }


    public Soundtrack addSoundtrack(
            String email,
            SoundtrackCreateDTO dto
    ) {

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException("User not found"));

        Soundtrack soundtrack =
                new Soundtrack();

        soundtrack.setTitle(dto.getTitle());

        soundtrack.setType(dto.getType());

        soundtrack.setLink(dto.getLink());

        soundtrack.setUser(user);

        return soundtrackRepository.save(soundtrack);
    }


    public void removeSoundtrack(
            String email,
            String soundtrackId
    ) {

        Soundtrack soundtrack =
                soundtrackRepository.findById(soundtrackId)
                        .orElseThrow(() ->
                                new RuntimeException("Soundtrack not found"));

        if (!soundtrack.getUser().getEmail().equals(email)) {

            throw new RuntimeException("Unauthorized access");
        }

        soundtrackRepository.delete(soundtrack);
    }

}