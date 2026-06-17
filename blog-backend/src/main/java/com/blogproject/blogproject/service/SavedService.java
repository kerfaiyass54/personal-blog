package com.blogproject.blogproject.service;

import com.blogproject.blogproject.dtos.SavedDTO;
import com.blogproject.blogproject.entities.Saved;
import com.blogproject.blogproject.repository.SavedRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SavedService {

    private final SavedRepository savedRepository;

    /**
     * Save an article
     */
    public SavedDTO saveArticle(String userEmail, String articleId) {

        savedRepository
                .findByUserEmailAndArticleId(userEmail, articleId)
                .ifPresent(saved -> {
                    throw new RuntimeException("Article already saved");
                });

        Saved saved = new Saved();
        saved.setUserEmail(userEmail);
        saved.setArticleId(articleId);

        Saved result = savedRepository.save(saved);

        return mapToDTO(result);
    }

    /**
     * Get all saved articles of a user
     */
    public List<SavedDTO> getSavedArticles(String userEmail) {

        return savedRepository.findByUserEmail(userEmail)
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    /**
     * Remove a saved article
     */
    public void removeSavedArticle(String userEmail,
                                   String articleId) {

        Saved saved = savedRepository
                .findByUserEmailAndArticleId(userEmail, articleId)
                .orElseThrow(() ->
                        new RuntimeException("Saved article not found"));

        savedRepository.delete(saved);
    }

    private SavedDTO mapToDTO(Saved saved) {
        return new SavedDTO(
                saved.getId(),
                saved.getUserEmail(),
                saved.getArticleId()
        );
    }
}