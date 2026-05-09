from agents.recommendation_agent import generate_ai_recommendations
from services.elastic_service import save_recommendations
from producers.recommendation_producer import send_recommendations

def generate_recommendations(data):

    recommendations = generate_ai_recommendations(data)

    save_recommendations(recommendations)

    send_recommendations(recommendations)