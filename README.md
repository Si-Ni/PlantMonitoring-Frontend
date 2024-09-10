![image-removebg-preview](https://github.com/user-attachments/assets/fdf868ef-461b-4a0b-a949-6ad0e611114f)

This repository is part of the **PlantMonitoring** project, a distributed system designed to monitor and analyze environmental data for plants. The frontend is a web-based interface that fetches real-time plant data from a MongoDB database via an Azure Function API and presents it in an interactive and user-friendly manner.

The frontend is built using Vite, React and NextUI for fast development and responsive design.

# Project Overview
The **PlantMonitoring** project is a distributed system designed to collect, store and analyze environmental data for monitoring plant health. The frontend allows users to visualize this data and interact with it.

The main components of the project include:

- Data Source: Environmental data collected by a [RaspberryPi](https://github.com/Si-Ni/PlantMonitoring-RaspberryPI) is sent to MongoDB via Azure Queue.
- Data Access: The frontend retrieves the data through an Azure Function API, which queries the MongoDB database.
- Data Visualization: This data is then displayed on the frontend using interactive charts and graphs for better analysis.

# Features

**1. User Login:** 

A secure login screen for user authentication. The app allows users to log in and view personalized data.

<img src="https://github.com/user-attachments/assets/38e07a51-2208-4a56-8707-f193a059b6dc" width="400"/>

**2. Data Filters:** 

Users can filter data by plant names and optionally by date range ```(From / To)```.

![Screenshot 2024-08-15 180712](https://github.com/user-attachments/assets/9fceb96c-6f80-4d65-8b13-1ab0f52389d6)

**3. Interactive Diagrams:** 

Each environmental sensor has its own interactive chart. Users can zoom in, zoom out and pan through the data for better insights.

![Screenshot 2024-08-15 180820](https://github.com/user-attachments/assets/976a6705-4c80-4da5-a684-c1c85605ccbc)
![Screenshot 2024-08-15 181305](https://github.com/user-attachments/assets/15c6bb12-1e01-4ca2-9b53-454b592bc735)
