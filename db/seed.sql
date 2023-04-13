DELETE FROM properties;
DELETE FROM owners;
DELETE FROM property_managers;
DROP TABLE IF EXISTS properties;
DROP TABLE IF EXISTS owners;
DROP TABLE IF EXISTS property_managers;

CREATE TABLE property_managers(
    manager_id SERIAL,
    first_name VARCHAR(15),
    last_name VARCHAR(15),
    phone_number VARCHAR(15),
    email VARCHAR(30),
    company VARCHAR(100),
    username VARCHAR(20),
    password VARCHAR(20),
    PRIMARY KEY(manager_id)
);

CREATE TABLE owners(
    owner_id SERIAL,
    first_name VARCHAR(15),
    last_name VARCHAR(15),
    phone_number VARCHAR(15),
    email VARCHAR(30),
    PRIMARY KEY(owner_id)
);

CREATE TABLE properties(
    property_id SERIAL,
    owner_id INTEGER,
    manager_id INTEGER,
    name VARCHAR(50),
    description TEXT,
    street VARCHAR(50),
    city VARCHAR(15),
    state VARCHAR(15),
    zip INTEGER,
    price INTEGER,
    img_path VARCHAR(50),
    img_ext VARCHAR(5),
    PRIMARY KEY(property_id),
    CONSTRAINT fk_owner 
    FOREIGN KEY(owner_id) 
    REFERENCES owners(owner_id) 
    ON DELETE CASCADE,
    CONSTRAINT fk_manager 
    FOREIGN KEY(manager_id) 
    REFERENCES property_managers(manager_id) 
    ON DELETE CASCADE
);

INSERT INTO property_managers(first_name, last_name, phone_number, email, company,username, password)
VALUES('Emma', 'Bowyer', '(555)555-5555','emma@bhhscrosby.com','Berkshire Hathaway HomeServices Crosby Starck Real Estate','admin','meowmix');

INSERT INTO properties(name, description, street, city, state, zip, price, owner_id, manager_id,img_path,img_ext)
VALUES('Church', 'Freshly painted 3 bedroom, 1 bathroom bungalow with hardwood floors throughout. All rooms and bathroom located on the upper floor. Has an enclosed front porch that leads into a large living room and dining room. 1.5 car detached garage and fully fenced in yard. Appliances include refrigerator, stove and dishwasher. Rent is $1, 200 a month. Tenant pays all utilities including water and is responsible for landscaping and snow removal. No smoking and no pets. Any persons over the age of 18 that will be residing in the property will need to fill out an application. Application fee is $55 which covers criminal background check, prior eviction history and credit check done through DoorLoop.',
'1516 N Church St', 'Rockford', 'Illinois', 61103,1200, null, 1,'images/1516 Church St Pictures/','jpg'), 
('Arthur','Freshly painted 2 bedroom 1 bathroom apartments in secured building. Building has a total of 11 units and is in a quieter location with off street parking. Appliances include refrigerator and stove and has electric heating. Rent is $750, Tenant pays electric and gas. No smoking and no pets. Any persons over the age of 18 that will be residing in the property will need to fill out an application. Application fee is $55 which covers criminal background check, prior eviction history, and credit check done through DoorLoop. Available Units 101, 102, 301, 302 and 303',
'1107 and 303 Arthur Ave Unit S101', 'Rockford', 'Illinois', 61101,750, null, 1,'images/','png'),
('18th','3 bedroom 1 bathroom single family home, 2 bedrooms located on the main floor with a loft-life third bedroom taking up the entire upstairs. Basement is partially finished with a bar area. Appliances include refrigerator and stove. Backyard is partially fenced in with a large patio and an enclosed front porch. Rent is $1200 a month. Tenant pays all utilities including water and is responsible for landscaping and snow removal. No smoking and no pets. Any persons over the age of 18 that will be residing in the property will need to fill out an application. and is responsible for landscaping and snow removal. No smoking and no pets. Any persons over the age of 18 that will be residing in the property will need to fill out an application.',
'2205 18th Ave', 'Rockford', 'Illinois', 61104,1200, null, 1,'images/2205 18th Ave Picture/','jpg'),
('Broadway','3 Bedroom 2 bathroom home with enclosed front parch, large 16x32 foot deck, and 2.5 car garage. Large living room and formal dining room. Appliances include refrigerator, stove, and dishwasher. Hardwood floors throughout and laundry hookups on the first floor off of the kitchen. Rent is $1,100 a month, Tenant pays all utilities including water and is responsible for landscaping and snow removal. No smoking and no pets. Any persons over the age of 18 that will be residing in the property will need to submit an application. Application fee is $55 which covers criminal background check, prior eviction history, and credit check done through DoorLoop.',
'2329 Broadway', 'Rockford', 'Illinois', 61104,1100, null, 1,'images/2329 Broadway Pictures/','jpg');

-- select property_id, name, street, state, city, zip, owner_id, manager_id from properties;