# Implementation Tasks

The AI agent must implement the project step by step.

Do not skip tasks.

---

## Step 1 — Initialize Project

Create a Next.js 14 project.

Install dependencies:

* reactflow
* elkjs
* tailwindcss
* typescript

---

## Step 2 — Setup Tailwind

Configure Tailwind CSS.

Add base styles.

Enable dark mode.

---

## Step 3 — Create Type Definitions

Create:

/types/roadmap.ts

Types:

Node
Edge
Section
Roadmap

---

## Step 4 — Implement Graph Layout

Create:

/lib/layout.ts

Responsibilities:

* Convert roadmap JSON into graph layout
* Use ELK.js
* Return positioned nodes

---

## Step 5 — Implement RoadmapGraph Component

Create:

/components/RoadmapGraph.tsx

Responsibilities:

* Load roadmap data
* Convert to ReactFlow nodes
* Render graph

Features:

* zoom
* pan
* fit view

---

## Step 6 — Implement Custom Node

Create:

/components/CustomNode.tsx

Responsibilities:

* Render node UI
* Handle click event

Style:

* Square card
* Tailwind styling
* Clear label

---

## Step 7 — Node Details Panel

Create:

/components/NodeDetailsPanel.tsx

Features:

* Title
* Description
* Resource links

---

## Step 8 — Sidebar

Create:

/components/Sidebar.tsx

Features:

* List roadmap sections
* Navigate to nodes

---

## Step 9 — Load Roadmap

Create:

/data/frontend.json

Load data dynamically.

---

## Step 10 — Page Integration

In:

/app/page.tsx

Render:

Sidebar
RoadmapGraph
NodeDetailsPanel

---

## Step 11 — Improve UX

Add:

* smooth zoom
* hover effect
* transitions

---

## Step 12 — Testing

Verify:

* graph renders correctly
* nodes clickable
* layout works
* no console errors
