package com.blogproject.blogproject.controller;


import com.blogproject.blogproject.dtos.SessionDTO;
import com.blogproject.blogproject.entities.Session;
import com.blogproject.blogproject.service.SessionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PatchMapping;



import java.time.Instant;
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
        return new ResponseEntity<>(session, HttpStatus.CREATED);
    }

    @GetMapping("/list/{email}")
    public ResponseEntity<List<SessionDTO>> getAllSessions(@PathVariable String email) {
        List<SessionDTO> sessionDTOS = sessionService.getSessions(email);
        return new ResponseEntity<>(sessionDTOS, HttpStatus.FOUND);
    }

    @PatchMapping("/")
    public ResponseEntity<Void> setIsItMe(@RequestParam String id,@RequestParam boolean isMe){
        sessionService.setIsItMe(id, isMe);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @PatchMapping("/")
    public ResponseEntity<Void> setAlert(@RequestParam String email,@RequestParam Instant time){
        sessionService.setAlert(email, time);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SessionDTO> getSession(@PathVariable String id){
        SessionDTO sessionDTO = sessionService.getSessionById(id);
        return new ResponseEntity<>(sessionDTO, HttpStatus.FOUND);
    }


    @GetMapping("/alerts/{email}")
    public ResponseEntity<Integer> getAlerts(@PathVariable String email){
        int totalAlerts = sessionService.getTotalAlerts(email);
        return new ResponseEntity<>(totalAlerts, HttpStatus.FOUND);
    }

    @GetMapping("/")
    public ResponseEntity<SessionDTO> getSessionsByTime(@RequestParam Instant time){
        SessionDTO sessionDTO = sessionService.getSessionByTime(time);
    return new ResponseEntity<>(sessionDTO, HttpStatus.FOUND);
    }


}
