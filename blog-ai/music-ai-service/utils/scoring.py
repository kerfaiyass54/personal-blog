def calculate_score(track):

    rate = track.get("rate", 0)

    if rate is None:
        rate = 0

    return float(rate) / 5.0