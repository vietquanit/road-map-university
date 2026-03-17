You are a data architect and career research assistant.

Your task is to generate a complete dataset for a career orientation graph used in a ReactFlow visualization.

The dataset represents **university majors in Vietnam** and **related career paths**.

The goal is to build a **career roadmap map similar to roadmap.sh but for academic majors and professions**.

OUTPUT FORMAT:
Generate a JSON file named:

/data/vietnam-career-map.json

Structure:

{
"title": "Vietnam Career Orientation Map",
"nodes": [],
"edges": []
}

NODE RULES:

Each node represents a university major in Vietnam.

Each node must contain:

{
"id": "unique-id",
"label": "Major name",
"description": "Short explanation of the major",
"careers": ["career1","career2","career3"]
}

Each major must contain **5–10 related careers**.

---

MAJOR REQUIREMENTS

Generate about **40 majors commonly taught in Vietnamese universities**.

Examples categories:

Technology
Business
Finance
Design
Engineering
Healthcare
Education
Social sciences
Languages
Tourism
Agriculture
Architecture

Examples majors:

Computer Science
Information Technology
Artificial Intelligence
Data Science
Cybersecurity
Software Engineering

Business Administration
Marketing
International Business
Human Resource Management

Finance
Banking
Accounting
Economics

Graphic Design
Multimedia Design

Mechanical Engineering
Electrical Engineering
Civil Engineering
Automation Engineering

Medicine
Pharmacy
Nursing

Law

Architecture

Tourism & Hospitality Management

English Language
Chinese Language
Japanese Language

Education / Pedagogy

Agriculture
Environmental Science

Ensure total majors ≈ **40 nodes**

---

CAREER RULES

Each major should include **5–10 realistic careers**.

Examples careers:

Software Engineer
Data Scientist
AI Engineer
Mobile Developer
DevOps Engineer

Digital Marketing Specialist
Brand Manager
Content Strategist

Financial Analyst
Investment Banker
Risk Analyst

Architect
Urban Planner

Doctor
Pharmacist
Medical Researcher

Teacher
Education Consultant

Tourism Manager
Hotel Manager

Agricultural Engineer
Environmental Consultant

The total number of careers across all majors should be around **300 unique careers**.

Avoid repeating careers excessively across majors unless it makes sense.

---

EDGES RULES

Edges represent relationships between majors.

Example relationships:

Computer Science → Artificial Intelligence
Computer Science → Data Science

Business Administration → Marketing
Business Administration → International Business

Mechanical Engineering → Automation Engineering

Economics → Finance
Finance → Banking

Create about **50–80 edges** to connect related majors.

Format:

{
"source": "major-id",
"target": "major-id"
}

---

QUALITY REQUIREMENTS

1. Use realistic Vietnamese university majors.
2. Ensure career lists are relevant to the major.
3. Avoid duplicate node IDs.
4. Keep descriptions concise.
5. Ensure the dataset can be directly used by a ReactFlow graph.

---

OUTPUT

Generate the complete JSON dataset ready to save as:

/data/vietnam-career-map.json

The dataset should include:

≈ 40 majors
≈ 300 careers
≈ 50–80 edges

Return only valid JSON.
