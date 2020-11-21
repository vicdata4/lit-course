#!/bin/bash

while ! nc -z localhost 2900; do   
  echo "Waiting app to launch on 2900..."
  sleep 0.1 # wait for 1/10 of the second before check again
done
echo "App launched"


while [ ! -f ./build/main.js ]
do
  sleep 0.1 # or less like 0.2
done
echo "main.js is available"