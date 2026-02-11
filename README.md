Markdown
2. # RESTful API Activity 
3. ## Best Practices Implementation
4. **1. Environment Variables:**
5. - Why did we put `BASE_URI` in `.env` instead of hardcoding it?
6. - Answer: We put base_url in .env to avoid configuration values in the source code.

7. **2. Resource Modeling:**
8. - Why did we use plural nouns (e.g., `/dishes`) for our routes?
9. - Answer: We use plural nouns for our routes to represent the collections of resources.

11. - When do we use `201 Created` vs `200 OK`?
12. - Answer: 201 Created is use when a new resource is successfully created while 200 OK is use when a request is successful but it does not create new resource.
13. - Why is it important to return `404` instead of just an empty array or a generic error?
14. - Answer: Returning 404 Not Found allows the client to know that the requested resource does not exist.
15.
16. **4. Testing:**
(Paste a screenshot of a successful GET request here) 

![alt text](image.png)


------------------------------------------------------------------


# Database Design Decisions

## 1. Why Embed the Review/Tag/Log?

I chose to embed the **Review/Tag/Log** because they are closely related to the parent document and are not intended to exist independently. These data entries are always accessed together with their parent record, so embedding keeps all related information in a single document.

This approach improves performance by allowing the system to retrieve all necessary data in one query without additional lookups. It also simplifies data management, since updates to the parent document can include its associated reviews, tags, or logs in the same operation. Because this data is typically small and context-specific, embedding is an efficient and practical design choice.


## 2. Why Reference the Chef/User/Guest?

I chose to reference the **Chef** because they are independent entities that can be associated with multiple documents within the system. Referencing avoids duplicating the same information across different records, which helps maintain database normalization.

By storing this data separately, updates (such as name or contact details) only need to be made in one place. This ensures data consistency, reduces redundancy, and makes the system more scalable as it grows.
