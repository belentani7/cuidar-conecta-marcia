CREATE TABLE `contact_requests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`organization` varchar(180) NOT NULL,
	`contactName` varchar(120) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(40),
	`service` enum('charla','formacion','colaboracion','otro') NOT NULL,
	`context` text NOT NULL,
	`replyPreference` enum('email','telefono','indiferente') NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `contact_requests_id` PRIMARY KEY(`id`)
);
