package com.blogproject.blogproject.controller;


import com.blogproject.blogproject.dtos.SessionDTO;
import com.blogproject.blogproject.entities.Session;
import com.blogproject.blogproject.service.SessionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sessions")
@CrossOrigin("*")
public class SessionController {

    private final SessionService sessionService;

    public SessionController(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    @PostMapping("/")
    public ResponseEntity<Session> addSession(@RequestBody SessionDTO sessionDTO) {
        Session session = sessionService.saveSession(sessionDTO);
        return new ResponseEntity<>(session, HttpStatus.OK);
    }

    @GetMapping("/list/{email}")
    public ResponseEntity<List<SessionDTO>> getAllSessions(@PathVariable String email) {
        List<SessionDTO> sessionDTOS = sessionService.getSessions(email);
        return new ResponseEntity<>(sessionDTOS, HttpStatus.OK);
    }

    @PutMapping("/{id}/{isMe}")
    public ResponseEntity<Void> setIsItMe(@PathVariable String id,@PathVariable boolean isMe){
        sessionService.setIsItMe(id, isMe);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
