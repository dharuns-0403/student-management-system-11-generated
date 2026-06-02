```python
from fastapi import FastAPI, Response
from typing import Dict

app = FastAPI()

@app.get("/api/want_to_add_text_heloo_in_the_header")
async def get_want_to_add_text_heloo_in_the_header():
    """Get want to add text "Heloo" in the header"""
    headers = {"X-Custom-Header": "Hello"}
    return {"status": "success", "header_key": "X-Custom-Header", "header_value": headers["X-Custom-Header"]}

@app.post("/api/want_to_add_text_heloo_in_the_header")
async def create_want_to_add_text_heloo_in_the_header(data: Dict):
    """Create want to add text "Heloo" in the header"""
    headers = {"X-Custom-Header": "Hello"}
    response = Response(content="Hello", media_type="text/plain")
    response.headers["X-Custom-Header"] = headers["X-Custom-Header"]
    return response
```

In this code, for the GET endpoint, we're directly returning a dictionary with the header key and value. For the POST endpoint, we're creating a Response object directly and setting the header value.