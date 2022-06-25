-- Article [
--     title
--     hero img
--     description rft
--     summary rft
--     author
--     date
-- ]

-- author [ 
--     name 
--     avatar
--     email
-- ]
CREATE TABLE author(
 id SERIAL PRIMARY KEY,
 name VARCHAR(100) NOT NULL,
 avatar VARCHAR(255)  NOT NULL,
 email VARCHAR(255)  NOT NULL
);

CREATE TABLE article(
 id SERIAL PRIMARY KEY,
 title VARCHAR(255) NOT NULL,
 hero_img VARCHAR(255)  NOT NULL,
 summary TEXT  NOT NULL,
 description TEXT  NOT NULL,
 author_id INT NOT NULL,
 created_at DATE
);

ALTER TABLE article ADD FOREIGN KEY (author_id) REFERENCES author(id);

