from repositories.elastic_repository import (
    save_recommendation
)

from datetime import datetime


def save_all_to_elastic(

    user_id,
    recommendations

):

    for recommendation in recommendations:
