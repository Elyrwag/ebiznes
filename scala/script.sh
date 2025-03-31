#!/bin/bash

sbt run &

sleep 5

ngrok http 9000
