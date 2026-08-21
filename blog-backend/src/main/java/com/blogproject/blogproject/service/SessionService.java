package com.blogproject.blogproject.service;

import com.blogproject.blogproject.dtos.SessionDTO;
import com.blogproject.blogproject.entities.Session;
import com.blogproject.blogproject.enums.ActivityType;
import com.blogproject.blogproject.repository.SessionsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class SessionService {

    private static final long ACTIVE_SESSION_MINUTES = 5;

    private final SessionsRepository sessionsRepository;


    // =========================================================
    // MAPPING
    // =========================================================

    private SessionDTO mapToDTO(Session session) {

        SessionDTO dto = new SessionDTO();

        dto.setId(session.getId());
        dto.setEmail(session.getEmail());
        dto.setOs(session.getOs());
        dto.setBrowser(session.getBrowser());
        dto.setTime(session.getTime());
        dto.setMe(session.isMe());
        dto.setAlert(session.getActivityType());

        return dto;
    }


    // =========================================================
    // SAVE SESSION
    // =========================================================

    public Session saveSession(SessionDTO dto) {

        Session session = Session.builder()
                .email(dto.getEmail())
                .os(dto.getOs())
                .time(dto.getTime())
                .browser(dto.getBrowser())
                .me(dto.isMe())
                .activityType(dto.getAlert())
                .build();

        return sessionsRepository.save(session);
    }


    // =========================================================
    // GET SESSION
    // =========================================================

    @Transactional(readOnly = true)
    public SessionDTO getSession(Session session) {

        return mapToDTO(session);
    }


    // =========================================================
    // GET ALL SESSIONS BY EMAIL
    // =========================================================

    @Transactional(readOnly = true)
    public List<SessionDTO> getSessions(String email) {

        return sessionsRepository
                .findSessionsByEmail(email)
                .stream()
                .map(this::mapToDTO)
                .toList();
    }


    // =========================================================
    // SET CURRENT SESSION
    // =========================================================

    public void setIsItMe(
            String id,
            boolean isMe
    ) {

        Session session =
                sessionsRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Session not found"
                                ));

        session.setMe(isMe);

        sessionsRepository.save(session);
    }


    // =========================================================
    // GET ACTIVE SESSIONS
    // =========================================================

    @Transactional(readOnly = true)
    public List<SessionDTO> getActiveSessions(
            String email,
            Instant currentTime
    ) {

        return sessionsRepository
                .findSessionsByEmail(email)
                .stream()
                .filter(session -> isActive(
                        session.getTime(),
                        currentTime
                ))
                .map(this::mapToDTO)
                .toList();
    }


    private boolean isActive(
            Instant sessionTime,
            Instant currentTime
    ) {

        if (sessionTime == null || currentTime == null) {
            return false;
        }

        long minutes =
                Duration.between(
                        sessionTime,
                        currentTime
                ).toMinutes();

        return minutes >= 0
                && minutes <= ACTIVE_SESSION_MINUTES;
    }


    // =========================================================
    // SET LOGIN ALERT
    // =========================================================

    public void setAlert(
            String email,
            Instant time
    ) {

        List<Session> activeSessions =
                sessionsRepository
                        .findSessionsByEmail(email)
                        .stream()
                        .filter(session -> isActive(
                                session.getTime(),
                                time
                        ))
                        .toList();

        if (activeSessions.isEmpty()) {
            return;
        }

        /*
         * Mark all active sessions as login alerts.
         */
        activeSessions.forEach(session -> {
            session.setActivityType(
                    ActivityType.ALERT_LOGIN
            );
        });

        sessionsRepository.saveAll(activeSessions);
    }


    // =========================================================
    // GET SESSION BY ID
    // =========================================================

    @Transactional(readOnly = true)
    public SessionDTO getSessionById(
            String id
    ) {

        Session session =
                sessionsRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Session not found"
                                ));

        return mapToDTO(session);
    }


    // =========================================================
    // GET TOTAL LOGIN ALERTS
    // =========================================================

    @Transactional(readOnly = true)
    public int getTotalAlerts(
            String email
    ) {

        return sessionsRepository
                .findSessionsByEmailAndAlert(
                        email,
                        ActivityType.ALERT_LOGIN
                )
                .size();
    }


    // =========================================================
    // GET SESSION BY TIME
    // =========================================================

    @Transactional(readOnly = true)
    public SessionDTO getSessionByTime(
            Instant time
    ) {

        Session session =
                sessionsRepository.findSessionByTime(time);

        if (session == null) {
            throw new RuntimeException(
                    "Session not found"
            );
        }

        return mapToDTO(session);
    }
}