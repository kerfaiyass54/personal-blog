from elasticsearch import Elasticsearch
from config.settings import ELASTIC_URL

es = Elasticsearch(ELASTIC_URL)