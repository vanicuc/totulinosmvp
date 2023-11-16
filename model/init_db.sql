--
-- Drop Tables
--

SET foreign_key_checks = 0;
DROP TABLE if exists trips;
DROP TABLE if exists intervals;
SET foreign_key_checks = 1;



 CREATE TABLE `trips`(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL
);
CREATE TABLE `intervals`(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `trip_id` INT NOT NULL,
    `interval_longitude` DECIMAL(8, 6) NOT NULL,
    `interval_latitude` DECIMAL(8, 6) NOT NULL,
    `interval_time` DATETIME NOT NULL
);
ALTER TABLE
    `intervals` ADD CONSTRAINT `intervals_trip_id_foreign` FOREIGN KEY(`trip_id`) REFERENCES `Trips`(`id`);



-- DROP TABLE IF EXISTS `users`; 

-- CREATE TABLE `users`(
-- 	`id` INT NOT NULL AUTO_INCREMENT, 
-- 	`username` VARCHAR(255) NOT NULL, 
-- 	`password` VARCHAR(255) NOT NULL, 
-- 	PRIMARY KEY (id)
-- );