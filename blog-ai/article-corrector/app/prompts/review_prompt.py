PROMPT = """
You are an expert editor.

Analyze the following article.

Detect:
- Grammar mistakes
- Spelling mistakes
- Punctuation mistakes
- Style issues

Return ONLY valid JSON.

{{
  "mistakes": [
    {{
      "original": "wrong text",
      "correction": "correct text",
      "explanation": "reason"
    }}
  ]
}}

Article:

{article}
"""