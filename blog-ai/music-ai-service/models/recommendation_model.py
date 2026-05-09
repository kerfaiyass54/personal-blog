class Recommendation:

    def __init__(
        self,
        title,
        author,
        link,
        type,
        score,
        source_user
    ):

        self.title = title
        self.author = author
        self.link = link
        self.type = type
        self.score = score
        self.source_user = source_user

    def to_dict(self):

        return {

            "title": self.title,
            "author": self.author,
            "link": self.link,
            "type": self.type,
            "score": self.score,
            "source_user": self.source_user
        }