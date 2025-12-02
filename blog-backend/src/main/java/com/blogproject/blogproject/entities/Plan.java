package com.blogproject.blogproject.entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "plans")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
public class Plan {

    @Id
    private String id;
    private String content;
    private Date date;
}
