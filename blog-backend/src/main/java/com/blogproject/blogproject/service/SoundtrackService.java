package com.blogproject.blogproject.service;

import com.blogproject.blogproject.dtos.SoundtrackCreateDTO;
import com.blogproject.blogproject.dtos.SoundtrackDTO;
import com.blogproject.blogproject.dtos.SoundtrackDetailsDTO;
import com.blogproject.blogproject.entities.Soundtrack;
import com.blogproject.blogproject.entities.User;
import com.blogproject.blogproject.enums.SoundtrackType;
import com.blogproject.blogproject.repository.SoundtrackRepository;
import com.blogproject.blogproject.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class SoundtrackService {

    private final SoundtrackRepository soundtrackRepository;
    private final UserRepository userRepository;
    private final KafkaProducerService kafkaProducerService;


    // =========================================================
    // MAPPERS
    // =========================================================

    private SoundtrackDetailsDTO mapToDetailsDTO(
            Soundtrack soundtrack
    ) {

        SoundtrackDetailsDTO dto =
                new SoundtrackDetailsDTO();

        dto.setId(soundtrack.getId());
        dto.setLink(soundtrack.getLink());
        dto.setTitle(soundtrack.getTitle());
        dto.setAuthor(soundtrack.getAuthor());
        dto.setType(soundtrack.getType());
        dto.setRate(soundtrack.getRate());

        return dto;
    }





    // =========================================================
    // USER
    // =========================================================

    private User getUserByEmail(String email) {

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        ));
    }


    // =========================================================
    // TOTAL SOUNDTRACKS
    // =========================================================

    @Transactional(readOnly = true)
    public long getTotalSoundtracks(
            String email
    ) {

        User user = getUserByEmail(email);

        return soundtrackRepository.countByUserId(
                user.getId()
        );
    }


    // =========================================================
    // RATED SOUNDTRACKS
    // =========================================================

    @Transactional(readOnly = true)
    public long getRatedSoundtracks(
            String email
    ) {

        User user = getUserByEmail(email);

        return soundtrackRepository
                .countByUserIdAndRateGreaterThan(
                        user.getId(),
                        0
                );
    }


    // =========================================================
    // GET USER SOUNDTRACKS
    // =========================================================

    @Transactional(readOnly = true)
    public List<SoundtrackDetailsDTO> getUserSoundtracks(
            String email
    ) {

        User user = getUserByEmail(email);

        return soundtrackRepository
                .findByUserId(user.getId())
                .stream()
                .map(this::mapToDetailsDTO)
                .toList();
    }


    // =========================================================
    // CREATE SOUNDTRACK
    // =========================================================

    public SoundtrackDetailsDTO addSoundtrack(
            String email,
            SoundtrackCreateDTO dto
    ) {

        User user = getUserByEmail(email);

        Soundtrack soundtrack =
                Soundtrack.builder()
                        .title(dto.getTitle())
                        .type(dto.getType())
                        .link(dto.getLink())
                        .userId(user.getId())
                        .rate(0)
                        .build();

        Soundtrack saved =
                soundtrackRepository.save(soundtrack);

        return mapToDetailsDTO(saved);
    }


    // =========================================================
    // DELETE SOUNDTRACK
    // =========================================================

    public void removeSoundtrack(
            String email,
            String soundtrackId
    ) {

        User user = getUserByEmail(email);

        Soundtrack soundtrack =
                soundtrackRepository.findById(soundtrackId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Soundtrack not found"
                                ));

        if (!user.getId().equals(soundtrack.getUserId())) {
            throw new RuntimeException(
                    "Unauthorized access"
            );
        }

        soundtrackRepository.delete(soundtrack);
    }


    // =========================================================
    // GET SOUNDTRACKS BY TYPE
    // =========================================================

    @Transactional(readOnly = true)
    public Page<SoundtrackDetailsDTO> getSoundtracksByType(
            String email,
            SoundtrackType type,
            int page,
            int size
    ) {

        User user = getUserByEmail(email);

        return soundtrackRepository
                .findByUserIdAndType(
                        user.getId(),
                        type,
                        PageRequest.of(page, size)
                )
                .map(this::mapToDetailsDTO);
    }


    // =========================================================
    // SEND RATING REQUEST
    // =========================================================

    public void rateSoundtrack(
            SoundtrackDTO soundtrack
    ) {

        kafkaProducerService.sendSoundtrack(
                soundtrack
        );
    }
}