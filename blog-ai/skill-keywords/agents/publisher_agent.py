from kafkaFiles.producer import publish

class PublisherAgent:

    def run(self, payload):

        publish(payload)