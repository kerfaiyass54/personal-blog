package com.blogproject.blogproject.entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "skills")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
public class Skill {

    @Id
    private String id;
    private String name;
    private String field;
}
