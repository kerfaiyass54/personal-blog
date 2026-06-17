import json


class ConsumerAgent:

    def run(
            self,
            message
    ):

        if isinstance(
                message,
                str
        ):

            message = json.loads(
                message
            )

        return message