# Roadmap Data Specification

Roadmap data is stored in JSON files inside `/data`.

Example file:

/data/frontend.json

## JSON Structure

{
"title": "Frontend Developer",
"description": "Learn how to become a frontend developer.",
"sections": [],
"nodes": [],
"edges": []
}

## Sections

Sections group related nodes.

Example:

{
"id": "internet",
"title": "Internet Basics"
}

## Nodes

Each node represents a topic.

Example:

{
"id": "html",
"label": "HTML",
"description": "Structure web pages using HTML.",
"section": "frontend",
"resources": [
{
"title": "MDN HTML Guide",
"url": "https://developer.mozilla.org"
}
]
}

Fields:

id: unique identifier

label: display name

description: explanation

section: group name

resources: learning links

## Edges

Edges represent learning order.

Example:

{
"source": "html",
"target": "css"
}

Meaning:

Learn HTML before CSS.

## Example Roadmap

Nodes:

HTML
CSS
JavaScript
Git
Package Managers
Frameworks

Edges:

HTML → CSS
CSS → JavaScript
JavaScript → Frameworks

## Rules

* Node IDs must be unique
* Edges must reference valid nodes
* Avoid circular dependencies

## Future Extensions

Possible additional fields:

difficulty
estimated_time
tags
video_links
