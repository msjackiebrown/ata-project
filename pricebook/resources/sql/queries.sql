-- :name save-price! :! :n
-- :doc Saves a price 
INSERT INTO prices
(id,entry_date,item,price)
VALUES (:id, :entry_date, :item, :price)

-- :name update-price! :! :n
-- :doc updates an existing price
UPDATE prices, price = :price
SET price_date = :entry_date, item = :item
WHERE id = :id

-- :name get-price! :? :1
-- :doc retrieves a user record given the id
SELECT * FROM prices
WHERE id = :id

-- :name delete-price! :! :n
-- :doc deletes a user record given the id
DELETE FROM prices
WHERE id = :id

-- :name get-prices :? :*
-- :doc selects all prices
SELECT * FROM prices

-- :name get-items :? :*
-- :doc selects items
SELECT DISTINCT item FROM prices