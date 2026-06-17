package com.blogproject.blogproject.service;

import com.blogproject.blogproject.dtos.SkillKeywordsDTO;
import com.blogproject.blogproject.entities.Keyword;
import com.blogproject.blogproject.repository.KeywordRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class KeywordService {

    private final KeywordRepository repository;

    public void save(
            String keywordName,
            String skillName
    ) {

        boolean exists =
                repository
                        .findByNameIgnoreCaseAndSkillNameIgnoreCase(
                                keywordName,
                                skillName
                        )
                        .isPresent();

        if (!exists) {

            Keyword keyword =
                    new Keyword();

            keyword.setName(
                    keywordName
            );

            keyword.setSkillName(
                    skillName
            );

            repository.save(
                    keyword
            );
        }
    }

    public SkillKeywordsDTO exportSkillKeywords(
            String skillName
    ) {

        List<Keyword> keywords =
                repository.findBySkillNameIgnoreCase(
                        skillName
                );

        List<String> names =
                keywords.stream()
                        .map(Keyword::getName)
                        .toList();

        return new SkillKeywordsDTO(
                skillName,
                names
        );
    }


}