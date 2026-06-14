from fastapi import FastAPI

from services.data_loader import DataLoader
from services.graph_builder import SkillGraphBuilder
from services.cooccurrence_service import CoOccurrenceService
from services.skill_repository import SkillRepository

from agents.keyword_agent import KeywordAgent
from agents.description_agent import DescriptionAgent

from kafka.producer import KafkaPublisher


app = FastAPI()


skills_df = DataLoader.load_skills()

relations_df = DataLoader.load_skill_relations()

graph_builder = SkillGraphBuilder()

graph_builder.build(relations_df)

repo = SkillRepository(
    skills_df
)

co = CoOccurrenceService()

job_posts = DataLoader.load_job_posts()

co.counter = co.build(job_posts)

keyword_agent = KeywordAgent(
    graph_builder,
    co
)

description_agent = DescriptionAgent()

publisher = KafkaPublisher()


@app.get("/skill/{skill_name}")
def enrich(skill_name: str):

    skill = repo.normalize(
        skill_name
    )

    keywords = (
        keyword_agent.generate(
            skill
        )
    )

    message = (
        description_agent.generate(
            skill,
            keywords
        )
    )

    result = {
        "skill": skill,
        "keywords": keywords,
        "message": message
    }

    publisher.publish(result)

    return result