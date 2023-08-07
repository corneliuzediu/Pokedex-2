import requests

POKEAPI_BASE_URL = "https://pokeapi.co/api/v2/pokemon/"


def get_pokemon_info(pokemon_id):
    """Fetch information about a Pokemon from the PokeAPI.

    Args:
        pokemon_id (int): The ID or name of the Pokemon to look up.

    Returns:
        dict: Information about the Pokemon, or None if the API request fails.
    """
    url = f"{POKEAPI_BASE_URL}{pokemon_id}"
    print(url)

    try:
        response = requests.get(
            url, headers={"User-Agent": "python-requests", "Accept": "*/*"}
        )
        response.raise_for_status()
        pokemon_info = response.json()
        return pokemon_info
    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")
    except requests.exceptions.RequestException as req_err:
        print(f"Request error occurred: {req_err}")
    except ValueError as value_err:
        print(f"Value error occurred: {value_err}")
    except KeyError as key_err:
        print(f"Key error occurred: {key_err}")
    except IndexError as index_err:
        print(f"Index error occurred: {index_err}")

    return None
