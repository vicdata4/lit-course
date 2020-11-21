#!/bin/bash

echo "Waiting app to launch on 2900..."

while ! nc -z localhost 2900; do   
  sleep 0.1 # wait for 1/10 of the second before check again
done

echo "App launched"