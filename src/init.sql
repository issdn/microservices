CREATE TABLE IF NOT EXISTS `msc`.`user` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(32) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(64) NOT NULL,
  `salt` VARCHAR(64) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE `group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `avatar_url` tinytext,
  `token` varchar(32) NOT NULL,
  `owner_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `group_owner_id_idx` (`owner_id`),
  CONSTRAINT `owner_id` FOREIGN KEY (`owner_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user_has_group` (
  `user_id` int unsigned NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`group_id`),
  KEY `fk_user_has_group_group1_idx` (`group_id`),
  KEY `fk_user_has_group_user_idx` (`user_id`) /*!80000 INVISIBLE */,
  CONSTRAINT `fk_user_has_group_group1` FOREIGN KEY (`group_id`) REFERENCES `group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_has_group_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


INSERT INTO `msc`.`user` (`username`, `email`, `password`, `salt`) 
VALUES ('testtest', 'test@localhost.com', 'YQQ7qzxP0cifsAdfZv/R3Q==', 'uTr8AXtC9q2eziLEhoBxnw==');

INSERT INTO `msc`.`user` (`username`, `email`, `password`, `salt`) 
VALUES ('testtest2', 'test2@localhost.com', 'YQQ7qzxP0cifsAdfZv/R3Q==', 'uTr8AXtC9q2eziLEhoBxnw==');