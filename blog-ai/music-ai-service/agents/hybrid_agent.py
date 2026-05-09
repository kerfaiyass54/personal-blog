def merge_recommendations(

    spotify,
    youtube

):

    merged = spotify + youtube

    merged.sort(

        key=lambda x: x.score,

        reverse=True
    )

    return merged[:20]