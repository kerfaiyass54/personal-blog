package com.blogproject.blogproject.service;


import com.blogproject.blogproject.dtos.SessionDTO;
import com.blogproject.blogproject.entities.Session;
import com.blogproject.blogproject.repository.SessionsRepository;
import org.springframework.stereotype.Service;

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
        return sessionDTO;
    }

    public Session saveSession(SessionDTO sessionDTO) {
        Session session = new Session();
        session.setEmail(sessionDTO.getEmail());
        session.setOs(sessionDTO.getOs());
        session.setTime(Instant.now());
        session.setBrowser(sessionDTO.getBrowser());
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


}
