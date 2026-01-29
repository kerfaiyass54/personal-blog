package com.blogproject.blogproject.service;


import com.blogproject.blogproject.dtos.SessionDTO;
import com.blogproject.blogproject.entities.Session;
import com.blogproject.blogproject.enums.ActivityType;
import com.blogproject.blogproject.repository.SessionsRepository;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class SessionService {

    private final SessionsRepository sessionsRepository;

    public SessionService(SessionsRepository sessionsRepository) {
        this.sessionsRepository = sessionsRepository;
    }

    public SessionDTO getSession(Session  session) {
        SessionDTO sessionDTO = new SessionDTO();
        sessionDTO.setBrowser(session.getBrowser());
        sessionDTO.setOs(session.getOs());
        sessionDTO.setEmail(session.getEmail());
        sessionDTO.setTime(session.getTime());
        sessionDTO.setMe(session.isMe());
        sessionDTO.setAlert(session.getAlert());
        sessionDTO.setId(session.getId());
        return sessionDTO;
    }

    public Session saveSession(SessionDTO sessionDTO) {
        Session session = new Session();
        session.setEmail(sessionDTO.getEmail());
        session.setOs(sessionDTO.getOs());
        session.setTime(sessionDTO.getTime());
        session.setBrowser(sessionDTO.getBrowser());
        session.setAlert(sessionDTO.getAlert());
        session.setMe(sessionDTO.isMe());
        return sessionsRepository.save(session);
    }

    public List<SessionDTO> getSessions(String email) {
        return sessionsRepository.findSessionsByEmail(email).stream().map(this::getSession).toList();
    }

    public void setIsItMe(String id, boolean isMe) {
        Optional<Session> session = sessionsRepository.findById(id);
        if (session.isPresent()) {
            session.get().setMe(isMe);
            sessionsRepository.save(session.get());
        }
    }

    public List<SessionDTO> getActiveSessions(String email, Instant time) {
        List<SessionDTO> sessionDTOS = sessionsRepository.findSessionsByEmail(email).stream().map(this::getSession).toList();
        return sessionDTOS.stream()
                .filter(e -> {
                    long minutes = Duration.between(e.getTime(), time).toMinutes();
                    return minutes <= 5;
                })
                .toList();
    }

    public void setAlert(String email, Instant time) {
        List<SessionDTO> sessionDTOS = getActiveSessions(email, time);
        SessionDTO sessionDTO = getSession(sessionsRepository.findSessionByTime(time));
        if (!sessionDTOS.isEmpty()) {
            sessionDTO.setAlert(ActivityType.ALERT_LOGIN);
            saveSession(sessionDTO);
            sessionDTOS.forEach(e -> {
                e.setAlert(ActivityType.ALERT_LOGIN);
                saveSession(e);
            });

        }
    }


    public SessionDTO getSessionById(String id) {
        Optional<Session> session = sessionsRepository.findById(id);
        return session.map(this::getSession).orElse(null);
    }


    public int getTotalAlerts(String email) {
        return sessionsRepository.findSessionsByEmailAndAlert(email, ActivityType.ALERT_LOGIN).size();
    }

    public SessionDTO getSessionByTime(Instant time) {
        return getSession(sessionsRepository.findSessionByTime(time));
    }

}
