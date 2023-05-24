drop database if exists scribblez_notez;
create database if not exists scribblez_notez;
use scribblez_notez;

drop table if exists sn_users;
create table sn_users(
	id int primary key auto_increment,
	first_name varchar(40),
	last_name varchar(40),
	username varchar(16) unique not null,
	email varchar(64) not null,
	password varchar(256) not null,
	is_anonymous boolean default false not null,
	registration_date datetime not null,
	is_admin boolean default false not null,
	image varchar(1024)
);

drop table if exists notes;
create table notes(
	id int primary key auto_increment,
	title varchar(128) not null,
	body varchar(1024) not null,
	create_date datetime not null,
	update_date datetime,
	sn_user varchar(16) not null,
	is_public boolean default false not null,
	constraint foreign key(sn_user) references sn_users(username)
);

/* $2b$10$CDXxocvNKh1c7goOCjSFOONZevD3J81dTg6C583TDpMYuYILQt4dC = test */
insert into sn_users values
(null, "John", "Doe", "admin", "admin@admin.hr", "$2b$10$CDXxocvNKh1c7goOCjSFOONZevD3J81dTg6C583TDpMYuYILQt4dC", false, "2023-05-09 11:02:00", true, null),
  (null, "Jax", "", "testUser", "test@mail.com", "$2b$10$CDXxocvNKh1c7goOCjSFOONZevD3J81dTg6C583TDpMYuYILQt4dC", false,  "2023-05-09 11:02:00", false, null),
  (null, "", "Doe", "janeDoe", "jdoe@mail.com", "$2b$10$CDXxocvNKh1c7goOCjSFOONZevD3J81dTg6C583TDpMYuYILQt4dC", false,  "2023-05-09 11:02:00", false, null);

insert into notes values
(null, "Bacon ipsum dolor", "Aamet leberkas shoulder bacon, ground round flank andouille salami corned beef pork chop turkey alcatra beef ribs brisket. Cupim fatback filet mignon ham, t-bone pig chuck venison beef shankle picanha hamburger. Alcatra venison burgdoggen jerky landjaeger tail. Landjaeger pig tenderloin filet mignon meatball ball tip sirloin bresaola turkey short ribs rump hamburger ribeye leberkas. Ribeye corned beef tri-tip pork chop rump.", "2023-05-15 13:33:41", null, "admin", true),
  (null, "Chislic burgdoggen filet", "Chicken leberkas ham pork loin strip steak alcatra bacon capicola short loin biltong t-bone short ribs. Meatball boudin kevin, filet mignon strip steak capicola turkey leberkas. Cupim pancetta capicola, meatloaf pork chop brisket short ribs biltong tenderloin alcatra salami. Prosciutto shankle sirloin, burgdoggen jerky filet mignon beef brisket corned beef venison landjaeger swine. Short loin spare ribs alcatra jowl bacon. Biltong porchetta hamburger, pastrami sirloin meatloaf short ribs jowl fatback drumstick shoulder spare ribs chislic flank.", "2023-05-14 21:33:41", null, "testUser", true),
  (null, "Swine bresaola ribeye burgdoggen", "Biltong alcatra pancetta pork rump. Biltong pork loin chuck ham tail, strip steak sirloin sausage bacon salami picanha boudin t-bone rump pork chop. Andouille shank frankfurter ham hock t-bone. Tail fatback picanha, buffalo hamburger strip steak jerky beef tri-tip pancetta andouille leberkas pastrami brisket. Leberkas porchetta meatloaf sausage shoulder, shankle fatback rump cupim ribeye capicola bacon turducken jerky pork loin. Shankle filet mignon tongue cow.", "2023-05-12 23:43:11", null, "thesam", false),
  (null, "Bacon pork loin kevin frankfurter fatback pancetta", "Jerky andouille salami strip steak sirloin turducken. Chicken picanha shoulder biltong pork chop ham prosciutto. Tenderloin turducken chuck, tail strip steak buffalo filet mignon tongue porchetta pork loin pork belly chislic spare ribs ball tip drumstick. Drumstick landjaeger hamburger, meatloaf shankle pork chop ham hock ground round porchetta frankfurter short ribs shank salami. T-bone boudin jowl short ribs.", "2023-05-15 20:01:19", null, "testUser", false);