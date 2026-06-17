package com.blogproject.blogproject.service;

import com.blogproject.blogproject.dtos.ArticleCreateDTO;
import com.blogproject.blogproject.dtos.ArticleDisplayDTO;
import com.blogproject.blogproject.dtos.ArticleUpdateDTO;
import com.blogproject.blogproject.entities.Article;
import com.blogproject.blogproject.repository.ArticleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ArticleService {

    private final ArticleRepository articleRepository;

    /**
     * Create article
     */
    public ArticleDisplayDTO createArticle(ArticleCreateDTO dto) {

        Article article = new Article();

        article.setTitle(dto.getTitle());
        article.setContent(dto.getContent());
        article.setDateInsert(new Date());
        article.setDateUpdate(new Date());

        Article savedArticle = articleRepository.save(article);

        log.info("Article created with id {}", savedArticle.getId());

        return mapToDisplayDTO(savedArticle);
    }

    /**
     * Get article by id
     */
    public ArticleDisplayDTO getArticleById(String id) {

        Article article = articleRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Article not found with id: " + id));

        return mapToDisplayDTO(article);
    }

    /**
     * Get all articles
     */
    public List<ArticleDisplayDTO> getAllArticles() {

        return articleRepository.findAll()
                .stream()
                .map(this::mapToDisplayDTO)
                .collect(Collectors.toList());
    }

    /**
     * Update article
     */
    public ArticleDisplayDTO updateArticle(String id,
                                           ArticleUpdateDTO dto) {

        Article article = articleRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Article not found with id: " + id));

        article.setTitle(dto.getTitle());
        article.setContent(dto.getContent());
        article.setDateUpdate(new Date());

        Article updatedArticle = articleRepository.save(article);

        log.info("Article updated with id {}", id);

        return mapToDisplayDTO(updatedArticle);
    }

    /**
     * Delete article
     */
    public void deleteArticle(String id) {

        Article article = articleRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Article not found with id: " + id));

        articleRepository.delete(article);

        log.info("Article deleted with id {}", id);
    }

    /**
     * Mapper
     */
    private ArticleDisplayDTO mapToDisplayDTO(Article article) {

        return new ArticleDisplayDTO(
                article.getId(),
                article.getTitle(),
                article.getContent(),
                article.getDateInsert(),
                article.getDateUpdate()
        );
    }
}