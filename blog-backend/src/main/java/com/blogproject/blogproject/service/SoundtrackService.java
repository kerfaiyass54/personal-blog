package com.blogproject.blogproject.service;


import com.blogproject.blogproject.dtos.SoundtrackCreateDTO;
import com.blogproject.blogproject.entities.Soundtrack;
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

    public Integer getRatedSoundtracks() {
        return (int) soundtrackRepository.findAll()
                .stream()
                .filter(soundtrack -> soundtrack.getRate() != null && soundtrack.getRate() != 0)
                .count();
    }

    public Soundtrack addSoundtrack(SoundtrackCreateDTO soundtrackCreateDTO) {
        Soundtrack soundtrack = new Soundtrack();
        soundtrack.setTitle(soundtrackCreateDTO.getTitle());
        soundtrack.setType(soundtrackCreateDTO.getType());
        soundtrack.setLink(soundtrackCreateDTO.getLink());
        return soundtrackRepository.save(soundtrack);
    }

    public void removeSoundtrack(String id){
        soundtrackRepository.deleteById(id);
    }





}
