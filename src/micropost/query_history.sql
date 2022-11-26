ALTER TABLE `users` ADD `profile_image_uri` VARCHAR(255)  NULL  DEFAULT NULL  AFTER `deleted_at`;
ALTER TABLE `users` MODIFY COLUMN `profile_image_uri` VARCHAR(255)  CHARACTER SET utf8mb4  COLLATE utf8mb4_0900_ai_ci  NULL  DEFAULT NULL AFTER `is_admin`;
