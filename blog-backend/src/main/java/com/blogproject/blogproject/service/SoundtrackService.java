package com.blogproject.blogproject.service;


import com.blogproject.blogproject.repository.SoundtrackRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


@Service
@Slf4j
public class SoundtrackService {


    private final SoundtrackRepository soundtrackRepository;

    public SoundtrackService(SoundtrackRepository soundtrackRepository) {
        this.soundtrackRepository = soundtrackRepository;
    }


    public Integer getTotalSoundtracks() {
        return soundtrackRepository.findAll().size();
    }

    public Integer getRatedPlaylists() {
        return (int) soundtrackRepository.findAll()
                .stream()
                .filter(soundtrack -> soundtrack.getRate() != null && soundtrack.getRate() != 0)
                .count();
    }





}
