#!/bin/bash

curl --location --request POST 'localhost:3002/movies' \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data-raw '{"title": "The Last Duel"}'