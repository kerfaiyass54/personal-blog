FLASHCARD_PROMPT = """
Analyze the lesson and extract flashcards.

Lesson Title:
{title}

Lesson Content:
{content}

Rules:
- Extract important concepts.
- Extract important keywords.
- Extract important definitions.
- Generate between 5 and 15 flashcards.

Return ONLY lines in this format:

TYPE|TERM|VALUE

Examples:

KEYWORD|HashMap|Stores key-value pairs
DEFINITION|Set|Collection that does not allow duplicates
CONCEPT|Collections Framework|Provides data structures and algorithms

Do not return JSON.
Do not return markdown.
Do not explain anything.
"""