package com.blogproject.blogproject.entities;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OutlineSection {

    @NotBlank(message = "Heading is required")
    @Size(max = 200, message = "Heading cannot exceed 200 characters")
    private String heading;

    @NotBlank(message = "Purpose is required")
    @Size(max = 500, message = "Purpose cannot exceed 500 characters")
    private String purpose;

    @NotEmpty(message = "Ideas cannot be empty")
    private List<
            @NotBlank(message = "Idea cannot be blank")
                    String
            > ideas;
}