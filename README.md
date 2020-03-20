# Welcome to OwnStock!

This is my first own project for learning purposes. The OwnStock is a API REST developed for small inventory applications. **It is currently in development** and constantly updated, so I will be improving the information about the API.

>To start it, just execute the command "yarn" in the ./backend folder and after the dependencies synchronization, "yarn dev" to start the service, developed for postgres database.

## Database structure

Table list

- Products: 
		- Register a product and defining a description. A classification id is needed to classificate each one.
	- name | string
	- description | string
	- quantity | integer
	- classification_id | integer
	- unit_id | integer
	
- Classifications;
		- Classifications classify the products 
	- name | string

- Units;
		- Units table define the unit of measurement of each product, as Kg, L, etc, is needed to register a product
	- name | string
	- symbol | string

- Providers;
		- Registers providers, type boolean: true for companies, false for physical person
	- name | string
	- type | boolean
	- register_number | string
	- country | string
	- city | string
	- street | string
	- number | string
	- complement | string
	- zip_code | string
	- email | string 
	- phone_number_1 | string
	- phone_number_2 | string
	- contact_name | string

- Users;
		- Registers users...
	- name | string
	- email | string
	- job | string

- Orders;
		- type boolean, true for input orders, false for output orders.
	- type | boolean
	- product_id | integer
	- quantity | integer
	- price | decimal
	- canceled_at | date
	- description | string
	
- Order_problems. 
		- In order_problems you can see the description about a problem ocurred during a order and may cancelate the one.
	- order_id | integer
	- description | string


Soon, the rules.