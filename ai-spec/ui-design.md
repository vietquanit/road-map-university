# UI Design Specification

This document defines the UI design rules for the roadmap visualization application.

The UI should closely resemble roadmap.sh while maintaining clean and modern design principles.

---

# Design Goals

The interface should feel:

Minimal
Readable
Structured
Developer-friendly

Avoid visual clutter.

---

# Layout Overview

The layout contains three main areas:

Sidebar (left)
Graph Canvas (center)
Node Details Panel (right)

Structure:

| Sidebar | Graph Canvas | Details |

---

# Sidebar Design

Width: 260px

Background:

Light mode: white
Dark mode: dark gray

Content:

* roadmap title
* section list
* navigation links

Section items must have hover highlight.

Example style:

padding
rounded corners
subtle hover background

---

# Graph Canvas

The canvas displays the roadmap graph.

Features:

Zoom
Pan
Large workspace
Edge connections

Background:

Light grid pattern.

Similar to diagram tools.

Use subtle grid lines.

---

# Node Design

Nodes represent roadmap topics.

Node shape:

Rounded rectangle.

Example size:

min-width: 140px
padding: 12px 16px

Node style:

Background: white
Border: 2px solid gray
Border radius: 8px

Hover effect:

Border color becomes darker.

---

# Node Content

Each node includes:

Title
Optional icon

Example:

+----------------+
| JavaScript |
+----------------+

Text must be centered.

Font weight: medium.

---

# Node Status (Future Feature)

Nodes may support learning status.

States:

Not started
In progress
Completed

Visual indicator:

small colored dot.

Example:

gray = not started
yellow = in progress
green = completed

---

# Edges

Edges connect nodes in learning order.

Style:

Thin lines
Rounded corners

Color:

neutral gray

Arrow direction indicates learning path.

---

# Node Details Panel

Appears when clicking a node.

Panel width:

320px

Content:

Title
Description
Resource links

Example:

JavaScript

JavaScript is a programming language used to create interactive web applications.

Resources:

MDN
JavaScript.info

---

# Typography

Use clean sans-serif font.

Recommended:

Inter

Font sizes:

Title: large
Node labels: medium
Descriptions: small

---

# Colors

Light mode:

Background: white
Border: light gray
Text: dark gray

Dark mode:

Background: near black
Border: medium gray
Text: light gray

Accent color:

Blue for interactive elements.

---

# Spacing

Use consistent spacing scale:

4px
8px
16px
24px

Nodes must not overlap.

Maintain readable spacing between nodes.

---

# Graph Layout

Nodes must be automatically positioned using ELK.js.

Layout style:

Top-to-bottom hierarchy.

Example:

Internet
↓
HTML
↓
CSS
↓
JavaScript
↓
Frameworks

Branches allowed.

---

# Interaction Design

Hover node → highlight border

Click node → open details panel

Scroll → zoom graph

Drag → move canvas

---

# Mobile Design

On small screens:

Sidebar becomes collapsible.

Details panel becomes modal.

Graph remains the main view.

---

# Animation

Use subtle animations:

Node hover transition
Panel slide animation

Avoid heavy animations.

---

# UI Quality Checklist

Before finishing implementation verify:

Nodes are readable
Edges are clear
Layout is structured
Zoom works smoothly
Dark mode works correctly
