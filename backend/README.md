GET http://localhost:4000/api/v1/admin/menus?search=Pasta&menuType=vegetarian&sort=price-desc&page=2&limit=5&projection=name,price&minPrice=50&maxPrice=100

GET http://localhost:4000/api/v1/admin/menus?days=monday&startTime=12:00&endTime=18:00

GET http://localhost:4000/api/v1/admin/menus?sort=a-z,price-asc

--- ERROR 1 ---

401 Unauthorized:
If a user who is not authenticated tries to access the endpoint, the function will return:

plaintext
Copy code
GET http://localhost:4000/api/v1/admin/menus
Response:

json
Copy code
{
  "success": false,
  "message": "Authentication required. Please log in."
}

--- ERROR 2 ---

403 Forbidden:
If a user who is authenticated but not an admin tries to access the endpoint, the function will return:

plaintext
Copy code
GET http://localhost:4000/api/v1/admin/menus
Response:

json
Copy code
{
  "success": false,
  "message": "Access denied. Admins only."
}

--- ERROR 3 ---

400 Bad Request:
If a user provides an invalid price range, the function will return:

plaintext
Copy code
GET http://localhost:4000/api/v1/admin/menus?minPrice=100&maxPrice=50
Response:

json
Copy code
{
  "success": false,
  "message": "Invalid price range: minPrice cannot be greater than maxPrice."
}