from pathlib import Path
import pandas as pd


BASE_DIR = Path(__file__).parent.parent

DATASET_DIR = BASE_DIR / "datasets"


class DataLoader:

    @staticmethod
    def load_skills():

        return pd.read_csv(
            DATASET_DIR / "skills_en.csv"
        )

    @staticmethod
    def load_skill_relations():

        return pd.read_csv(
            DATASET_DIR / "skillSkillRelations_en.csv"
        )

    @staticmethod
    def load_occupation_relations():

        return pd.read_csv(
            DATASET_DIR / "occupationSkillRelations_en.csv"
        )

    @staticmethod
    def load_job_posts():

        return pd.read_csv(
            DATASET_DIR / "all_job_post.csv"
        )

    @staticmethod
    def load_resumes():

        return pd.read_csv(
            DATASET_DIR / "Resume.csv"
        )