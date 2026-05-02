package com.blogproject.blogproject.service;

import com.blogproject.blogproject.dtos.SoundtrackCreateDTO;
import com.blogproject.blogproject.dtos.SoundtrackDetailsDTO;
import com.blogproject.blogproject.entities.Soundtrack;
import com.blogproject.blogproject.entities.User;
import com.blogproject.blogproject.enums.SoundtrackType;
import com.blogproject.blogproject.repository.SoundtrackRepository;
import com.blogproject.blogproject.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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

    /* ✅ DTO MAPPER */
    public SoundtrackDetailsDTO mapToDTO(Soundtrack s) {
        SoundtrackDetailsDTO dto = new SoundtrackDetailsDTO();
        dto.setId(s.getId());
        dto.setLink(s.getLink());
        dto.setTitle(s.getTitle());
        dto.setType(s.getType());
        dto.setRate(s.getRate());
        return dto;
    }

    public Integer getTotalSoundtracks(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return soundtrackRepository.findByUser(user).size();
    }

    public Integer getRatedSoundtracks(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return (int) soundtrackRepository
                .findByUser(user)
                .stream()
                .filter(track -> track.getRate() != null && track.getRate() != 0)
                .count();
    }

    /* ✅ RETURN DTO LIST */
    public List<SoundtrackDetailsDTO> getUserSoundtracks(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return soundtrackRepository.findByUser(user)
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    public Soundtrack addSoundtrack(String email, SoundtrackCreateDTO dto) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Soundtrack soundtrack = new Soundtrack();
        soundtrack.setTitle(dto.getTitle());
        soundtrack.setType(dto.getType());
        soundtrack.setLink(dto.getLink());
        soundtrack.setUser(user);

        return soundtrackRepository.save(soundtrack);
    }

    public void removeSoundtrack(String email, String soundtrackId) {
        Soundtrack soundtrack = soundtrackRepository.findById(soundtrackId)
                .orElseThrow(() -> new RuntimeException("Soundtrack not found"));

        if (!soundtrack.getUser().getEmail().equals(email)) {
            throw new RuntimeException("Unauthorized access");
        }

        soundtrackRepository.delete(soundtrack);
    }

    /* ✅ PAGINATED + FILTER BY TYPE */
    public Page<SoundtrackDetailsDTO> getSoundtracksByType(
            String email,
            SoundtrackType type,
            int page,
            int size
    ) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Page<Soundtrack> soundtracks =
                soundtrackRepository.findByUserAndType(
                        user,
                        type,
                        PageRequest.of(page, size)
                );

        return soundtracks.map(this::mapToDTO);
    }


}