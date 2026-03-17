# Architecture Specification

## Overview

This project builds a roadmap visualization web application similar to roadmap.sh.

The system displays developer learning paths as an interactive node graph. Users can zoom, pan, and click nodes to explore topics.

## Tech Stack

Frontend:

* Next.js 14 (App Router)
* React
* TypeScript
* TailwindCSS

Graph Visualization:

* React Flow

Graph Layout Engine:

* ELK.js (automatic node layout)

State Management:

* React hooks
* Context API

Data Source:

* Static JSON files stored in `/data`

## High-Level Architecture

User Browser
|
Next.js App
|
Graph Renderer (React Flow)
|
Roadmap JSON Data
|
Auto Layout Engine (ELK.js)

## Directory Structure

/app
page.tsx

/components
RoadmapGraph.tsx
CustomNode.tsx
NodeDetailsPanel.tsx
Sidebar.tsx

/lib
layout.ts
graphUtils.ts

/data
frontend.json
backend.json

/types
roadmap.ts

/styles
globals.css

/ai-spec
architecture.md
requirements.md
roadmap-data.md
tasks.md

## Component Responsibilities

### RoadmapGraph

Responsible for:

* Rendering the graph
* Handling zoom and pan
* Rendering nodes and edges

### CustomNode

Responsible for:

* Node UI
* Node label
* Click events

### NodeDetailsPanel

Responsible for:

* Showing topic description
* Links and resources

### Sidebar

Responsible for:

* Roadmap navigation
* Section filtering

## Data Flow

1. Load roadmap JSON
2. Transform data into React Flow nodes
3. Apply ELK auto layout
4. Render graph
5. Handle user interaction

## Performance Considerations

* Lazy load roadmap data
* Memoize node components
* Avoid unnecessary re-renders
* Virtualize large graphs if needed

## Future Extensions

* Progress tracking
* User accounts
* Roadmap editor
* Community roadmap sharing
