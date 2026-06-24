PROMPT = """
You are an expert SEO strategist.

Generate a blog article plan.

TITLE:
{title}

Return ONLY valid JSON.

Schema:

{{
  "article_type": "",
  "target_audience": "",
  "search_intent": "",
  "estimated_word_count": 0,
  "seo_keywords": [],
  "outline": [
    {{
      "heading": "",
      "purpose": "",
      "ideas": []
    }}
  ]
}}

Rules:
- Return JSON only.
- No markdown.
- No explanations.
- No code blocks.
"""