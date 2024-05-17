import hashlib
import random
import string


def sha256_hash(input_str):
    hash_object = hashlib.sha256(input_str.encode())
    hex_dig = hash_object.hexdigest()
    ascii_result = hex_dig.encode("ascii")
    return ascii_result.decode("utf-8")


# Example usage
input_data = "qmGVSigT71yS4IH"
input_data += "new_user_password"
hashed_result = sha256_hash(input_data)
print(hashed_result)
