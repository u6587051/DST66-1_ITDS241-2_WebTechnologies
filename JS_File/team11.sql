DROP DATABASE IF EXISTS team11;
CREATE DATABASE team11;
USE team11;

CREATE TABLE Product (
PID char(2) NOT NULL UNIQUE,
PName varchar(100) NOT NULL,
PBrand varchar(40) NOT NULL,
PCat varchar(50) NOT NULL,
PPrice int NOT NULL,
PQuan int NOT NULL,
PDetail varchar(256) NOT NULL,
PRIMARY KEY (PID)
);

CREATE TABLE USERS(
UID char(3) NOT NULL UNIQUE,
email varchar(50) NOT NULL,
pwd char(5) NOT NULL,
fname varchar(30) NULL,
lname varchar(30) NULL,
address varchar(256) NULL,
age int NULL,
need varchar(256) NULL,
auth int(1) NOT NULL
);

INSERT INTO USERS VALUES
("001","pguide@gmail.com","12345","Thanawich","Juangroongruangkit","69 poseidon",20,"อยากจะเป็นนักการเมือง",1),
("002","psub@gmail.com","11111","Jaosub","Juangroongruangkit","888 panunonline",20,"เป็นพ่อเล้า",1),
("003","pjay@gmail.com","69696","Salute","Juangroongruangkit","123 city",20,"หืวข้าว",1),
("004","pcho@gmail.com","25474","Suntipap","Juangroongruangkit","99 samainiyom",19,"อยากเป็นหมอ",1),
("005","phim@gmail.com","98764","Jittakan","Juangroongruangkit","911 USA",21,"อยากจะเป็นนักธุรกิจพันล้าน",1),
("101","slot888@gmail.com","00004",NULL,NULL,NULL,NULL,NULL,0),
("102","sunut@gmail.com","it555",NULL,NULL,NULL,NULL,NULL,0),
("103","sompong@gmail.com","20044",NULL,NULL,NULL,NULL,NULL,0),
("104","lnwza007@gmail.com","25414",NULL,NULL,NULL,NULL,NULL,0),
("105","pipat4@gmail.com","99994",NULL,NULL,NULL,NULL,NULL,0);

INSERT INTO Product VALUES
("01","ใบตัด New Kosoku","New Kosoku","เครื่องมือตัด",349,99,"ขนาด4x4"),
("02","MAKITA สว่าน DF001G Cordless Driver Drill","MAKITA","เครื่องมือไฟฟ้า",3500,99,"40V"),
("03","เครื่องตัดเหล็ก 12 Stanley","Stanley","เครื่องมือตัด",1400,99,"#15-166"),
("04","ใบตัด Corolla","Corolla","เครื่องมือตัด",500,99,"ขนาด4x1"),
("05","MAKITA สว่านไร้สาย สว่าน 3 ระบบ","MAKITA","เครื่องมือลมปั้มลม",849,99,"148V"),
("06","Total ปั๊มลมอัตโนมัติ ปั๊มลมมินิ","Total","เครื่องมือไฟฟ้า",1169,99,"12V 18A แรงดัน 120 PSI");

SELECT * FROM USERS;

SELECT * FROM Product;
