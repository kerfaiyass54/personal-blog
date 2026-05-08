import re
import random
import requests
import pandas as pd
import numpy as np
from yt_dlp import YoutubeDL


# ==========================================
# Detect Platform
# ==========================================
def is_youtube(url):
    return "youtube.com" in url or "youtu.be" in url


def is_spotify(url):
    return "spotify.com" in url


# ==========================================
# YouTube Metadata
# ==========================================
def fetch_youtube_metadata(url):

    ydl_opts = {
        "quiet": True,
        "skip_download": True
    }

    with YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=False)

    views = info.get("view_count", 0)

    return {
        "platform": "youtube",
        "title": info.get("title"),
        "artist": info.get("uploader"),
        "year": int(str(info.get("upload_date", "2020"))[:4]),
        "streams": float(views),
        "sales": float(views * 0.02),
        "downloads": float(views * 0.01),
        "radio_plays": float(random.randint(1000, 100000))
    }


# ==========================================
# Spotify Metadata
# ==========================================
def fetch_spotify_metadata(url):

    endpoint = f"https://open.spotify.com/oembed?url={url}"

    response = requests.get(endpoint)

    data = response.json()

    title = data.get("title", "Unknown")

    # try extracting artist from title
    artist = "Unknown"

    if " - " in title:
        artist = title.split(" - ")[0]

    return {
        "platform": "spotify",
        "title": title,
        "artist": artist,
        "year": random.randint(2010, 2024),
        "streams": float(random.randint(100000, 10000000)),
        "sales": float(random.randint(1000, 100000)),
        "downloads": float(random.randint(1000, 50000)),
        "radio_plays": float(random.randint(1000, 200000))
    }


# ==========================================
# Main Fetch Function
# ==========================================
def fetch_features(url):

    try:

        if is_youtube(url):
            return fetch_youtube_metadata(url)

        elif is_spotify(url):
            return fetch_spotify_metadata(url)

        else:
            raise Exception("Unsupported platform")

    except Exception as e:

        print("Metadata fetch failed:", e)

        return {
            "platform": "unknown",
            "artist": "unknown",
            "year": 2020,
            "streams": 100000,
            "sales": 10000,
            "downloads": 5000,
            "radio_plays": 1000
        }


# ==========================================
# Feature Engineering
# ==========================================
def prepare_features(data):

    sales = float(data["sales"])
    radio = float(data["radio_plays"])

    df = pd.DataFrame([{
        "Year": data["year"],
        "log_Sales": np.log1p(sales),
        "log_Radio Plays": np.log1p(radio),
        "radio_to_sales": radio / (sales + 1),
        "artist_rating_avg": random.uniform(1.5, 4.5)
    }])

    return df