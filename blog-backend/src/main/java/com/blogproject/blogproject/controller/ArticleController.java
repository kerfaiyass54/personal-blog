package com.blogproject.blogproject.controller;

import com.blogproject.blogproject.dtos.ArticleCreateDTO;
import com.blogproject.blogproject.dtos.ArticleDisplayDTO;
import com.blogproject.blogproject.dtos.ArticleUpdateDTO;
import com.blogproject.blogproject.service.ArticleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;

    /**
     * PB-64
     * Writer adds article
     */
    @PostMapping
    public ResponseEntity<ArticleDisplayDTO> createArticle(
            @RequestBody @Valid ArticleCreateDTO dto) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(articleService.createArticle(dto));
    }

    /**
     * PB-69
     * Reader reads article
     */
    @GetMapping("/{id}")
    public ResponseEntity<ArticleDisplayDTO> getArticle(
            @PathVariable String id) {

        return ResponseEntity.ok(
                articleService.getArticleById(id)
        );
    }

    /**
     * PB-66
     * Writer checks all articles
     */
    @GetMapping
    public ResponseEntity<List<ArticleDisplayDTO>> getAllArticles() {

        return ResponseEntity.ok(
                articleService.getAllArticles()
        );
    }

    /**
     * PB-67
     * Writer updates article
     */
    @PutMapping("/{id}")
    public ResponseEntity<ArticleDisplayDTO> updateArticle(
            @PathVariable String id,
            @RequestBody @Valid ArticleUpdateDTO dto) {

        return ResponseEntity.ok(
                articleService.updateArticle(id, dto)
        );
    }

    /**
     * PB-67
     * Writer deletes article
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArticle(
            @PathVariable String id) {

        articleService.deleteArticle(id);

        return ResponseEntity.noContent().build();
    }
}