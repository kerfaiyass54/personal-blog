package com.blogproject.blogproject.service;

import com.blogproject.blogproject.dtos.PlaylistCreateDTO;
import com.blogproject.blogproject.dtos.PlaylistDetailsDTO;
import com.blogproject.blogproject.dtos.SoundtrackDetailsDTO;
import com.blogproject.blogproject.entities.Playlist;
import com.blogproject.blogproject.entities.Soundtrack;
import com.blogproject.blogproject.entities.SoundtrackPlaylist;
import com.blogproject.blogproject.entities.User;
import com.blogproject.blogproject.repository.PlaylistRepository;
import com.blogproject.blogproject.repository.SoundtrackPlaylistRepository;
import com.blogproject.blogproject.repository.SoundtrackRepository;
import com.blogproject.blogproject.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class PlaylistService {

    private final PlaylistRepository playlistRepository;
    private final SoundtrackPlaylistRepository soundtrackPlaylistRepository;
    private final SoundtrackRepository soundtrackRepository;
    private final UserRepository userRepository;


    // =========================================================
    // MAPPING
    // =========================================================

    public PlaylistDetailsDTO mapPlaylist(Playlist playlist) {

        PlaylistDetailsDTO dto = new PlaylistDetailsDTO();

        dto.setId(playlist.getId());
        dto.setTitle(playlist.getTitle());
        dto.setDescription(playlist.getDescription());
        dto.setRate(playlist.getRate());

        return dto;
    }


    private SoundtrackDetailsDTO mapSoundtrack(Soundtrack soundtrack) {

        SoundtrackDetailsDTO dto = new SoundtrackDetailsDTO();

        dto.setId(soundtrack.getId());
        dto.setLink(soundtrack.getLink());
        dto.setTitle(soundtrack.getTitle());
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
                        new RuntimeException("User not found"));
    }


    // =========================================================
    // PLAYLIST AUTHORIZATION
    // =========================================================

    private Playlist getAuthorizedPlaylist(
            String email,
            String playlistId
    ) {

        User user = getUserByEmail(email);

        Playlist playlist = playlistRepository.findById(playlistId)
                .orElseThrow(() ->
                        new RuntimeException("Playlist not found"));

        if (!playlist.getUserId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access");
        }

        return playlist;
    }


    // =========================================================
    // PLAYLIST COUNT
    // =========================================================

    @Transactional(readOnly = true)
    public Integer getPlaylistsCount(String email) {

        User user = getUserByEmail(email);

        return Math.toIntExact(
                playlistRepository.countByUserId(user.getId())
        );
    }


    // =========================================================
    // NUMBER OF TRACKS
    // =========================================================

    @Transactional(readOnly = true)
    public Integer getInsertedTracksNumber(String email) {

        User user = getUserByEmail(email);

        List<String> playlistIds =
                playlistRepository.findIdsByUserId(user.getId());

        if (playlistIds.isEmpty()) {
            return 0;
        }

        return Math.toIntExact(
                soundtrackPlaylistRepository.countByPlaylistIdIn(
                        playlistIds
                )
        );
    }


    // =========================================================
    // GET PLAYLISTS
    // =========================================================

    @Transactional(readOnly = true)
    public List<PlaylistDetailsDTO> getPlaylists(String email) {

        User user = getUserByEmail(email);

        return playlistRepository
                .findByUserId(user.getId())
                .stream()
                .map(this::mapPlaylist)
                .toList();
    }


    // =========================================================
    // GET SOUNDTRACKS FOR PLAYLIST
    // =========================================================

    @Transactional(readOnly = true)
    public Page<SoundtrackDetailsDTO> getSoundTracksForPlaylist(
            String email,
            String playlistId,
            int page,
            int size
    ) {

        getAuthorizedPlaylist(email, playlistId);

        PageRequest pageRequest =
                PageRequest.of(page, size);

        Page<SoundtrackPlaylist> relationships =
                soundtrackPlaylistRepository
                        .findByPlaylistId(
                                playlistId,
                                pageRequest
                        );

        if (relationships.isEmpty()) {
            return Page.empty(pageRequest);
        }

        List<String> soundtrackIds =
                relationships
                        .getContent()
                        .stream()
                        .map(SoundtrackPlaylist::getSoundtrackId)
                        .toList();

        List<Soundtrack> soundtracks =
                soundtrackRepository.findAllById(soundtrackIds);

        /*
         * findAllById() does not guarantee the same order as
         * soundtrackIds, so create a map and rebuild the original order.
         */
        Map<String, Soundtrack> soundtrackMap =
                soundtracks.stream()
                        .collect(Collectors.toMap(
                                Soundtrack::getId,
                                Function.identity()
                        ));

        List<SoundtrackDetailsDTO> content =
                soundtrackIds.stream()
                        .map(soundtrackMap::get)
                        .filter(java.util.Objects::nonNull)
                        .map(this::mapSoundtrack)
                        .toList();

        return new PageImpl<>(
                content,
                pageRequest,
                relationships.getTotalElements()
        );
    }


    // =========================================================
    // ADD SOUNDTRACK
    // =========================================================

    public SoundtrackPlaylist addSoundtrackToPlaylist(
            String email,
            String soundtrackId,
            String playlistId
    ) {

        getAuthorizedPlaylist(email, playlistId);

        Soundtrack soundtrack =
                soundtrackRepository.findById(soundtrackId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Soundtrack not found"
                                ));

        if (soundtrackPlaylistRepository
                .existsByPlaylistIdAndSoundtrackId(
                        playlistId,
                        soundtrackId
                )) {

            throw new RuntimeException(
                    "Soundtrack is already in this playlist"
            );
        }

        SoundtrackPlaylist relationship =
                SoundtrackPlaylist.builder()
                        .playlistId(playlistId)
                        .soundtrackId(soundtrack.getId())
                        .build();

        return soundtrackPlaylistRepository.save(relationship);
    }


    // =========================================================
    // REMOVE SOUNDTRACK
    // =========================================================

    public void removeSoundtrack(
            String email,
            String soundtrackId,
            String playlistId
    ) {

        getAuthorizedPlaylist(email, playlistId);

        soundtrackRepository.findById(soundtrackId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Soundtrack not found"
                        ));

        SoundtrackPlaylist relationship =
                soundtrackPlaylistRepository
                        .findByPlaylistIdAndSoundtrackId(
                                playlistId,
                                soundtrackId
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Soundtrack is not in this playlist"
                                ));

        soundtrackPlaylistRepository.delete(relationship);
    }


    // =========================================================
    // CREATE PLAYLIST
    // =========================================================

    public Playlist createPlaylist(
            String email,
            PlaylistCreateDTO dto
    ) {

        User user = getUserByEmail(email);

        Playlist playlist =
                Playlist.builder()
                        .title(dto.getTitle())
                        .description(dto.getDescription())
                        .userId(user.getId())
                        .build();

        Playlist saved =
                playlistRepository.save(playlist);

        if (dto.getSoundtrackIds() != null) {

            for (String soundtrackId : dto.getSoundtrackIds()) {

                addSoundtrackToPlaylist(
                        email,
                        soundtrackId,
                        saved.getId()
                );
            }
        }

        return saved;
    }


    // =========================================================
    // DELETE PLAYLIST
    // =========================================================

    public void deletePlaylist(
            String email,
            String playlistId
    ) {

        getAuthorizedPlaylist(email, playlistId);

        /*
         * Delete the relationship documents first.
         */
        soundtrackPlaylistRepository
                .deleteByPlaylistId(playlistId);

        playlistRepository.deleteById(playlistId);
    }
}