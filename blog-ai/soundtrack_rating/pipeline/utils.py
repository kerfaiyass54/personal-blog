import re
import numpy as np
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from googleapiclient.discovery import build
from config import *

# ===============================
# 🎵 INIT CLIENTS
# ===============================
sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(
    client_id=SPOTIFY_CLIENT_ID,
    client_secret=SPOTIFY_CLIENT_SECRET
))

youtube = build("youtube", "v3", developerKey=YOUTUBE_API_KEY)

# ===============================
# 🔍 DETECT PLATFORM
# ===============================
def detect_platform(link):
    if "spotify.com" in link:
        return "spotify"
    if "youtube.com" in link or "youtu.be" in link:
        return "youtube"
    return "unknown"

# ===============================
# 🎵 SPOTIFY FEATURES
# ===============================
def get_spotify_features(link):
    track_id = link.split("/")[-1].split("?")[0]

    track = sp.track(track_id)
    features = sp.audio_features(track_id)[0]

    return {
        "streams": track["popularity"] * 10000,
        "sales": track["popularity"] * 1000,
        "radio": int(features["energy"] * 10000)
    }

# ===============================
# ▶️ YOUTUBE FEATURES
# ===============================
def extract_video_id(link):
    match = re.search(r"(?:v=|youtu\.be/)([^&]+)", link)
    return match.group(1)

def get_youtube_features(link):
    video_id = extract_video_id(link)

    response = youtube.videos().list(
        part="statistics",
        id=video_id
    ).execute()

    stats = response["items"][0]["statistics"]

    return {
        "streams": int(stats.get("viewCount", 0)),
        "sales": int(stats.get("likeCount", 0)),
        "radio": int(stats.get("commentCount", 0))
    }

# ===============================
# 🧠 UNIFIED FETCH
# ===============================
def fetch_features(link):
    try:
        platform = detect_platform(link)

        if platform == "spotify":
            return get_spotify_features(link)
        if platform == "youtube":
            return get_youtube_features(link)

    except Exception as e:
        print("⚠️ Feature fetch failed:", e)

    return {"streams": 0, "sales": 0, "radio": 0}

# ===============================
# 🤖 PREPARE MODEL INPUT
# ===============================
def prepare_features(data):
    return np.array([[data["streams"], data["sales"], data["radio"]]])