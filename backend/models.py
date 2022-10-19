from typing import Union

from fastapi import FastAPI
from pydantic import BaseModel

class Login(BaseModel):
    name: str
    password: str

class Register(BaseModel):
    name: str
    password: str
    account_type: str
    