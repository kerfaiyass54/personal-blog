def build_quiz_prompt(
    title: str,
    content: str,
    count: int
) -> str:

    return f"""
Create exactly {count} multiple choice questions.

Lesson:
{title}

Content:
{content}

Rules:

- Return JSON only.
- Each question must have:
  - content
  - possibilities (4 options)
  - answer
  - hint

Format:

[
  {{
    "content":"...",
    "possibilities":[
      "...",
      "...",
      "...",
      "..."
    ],
    "answer":"...",
    "hint":"..."
  }}
]

No markdown.
No explanations.
"""