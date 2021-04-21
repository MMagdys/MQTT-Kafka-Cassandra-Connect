import time


def insert_to_devices(session, traffic1, num1, traffic2, num2):

    timestamp = int(time.time())
    session.execute(
    """
    INSERT INTO devices (id, traffic1, num1, traffic2, num2)
    VALUES (%s, %s, %s, %s, %s)
    """,
    (timestamp, traffic1, num1, traffic2, num2)
    )
    print("record added succefully to Cassandra")