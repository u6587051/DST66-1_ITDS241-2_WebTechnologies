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

-- CREATE TABLE USERS(
-- UID char(3) NOT NULL UNIQUE,
-- email varchar(50) NOT NULL,
-- address varchar(256),
-- pwd char(5) NOT NULL,
-- PRIMARY KEY (UID)
-- );

CREATE TABLE ADMINS(
AID char(3) NOT NULL UNIQUE,
email varchar(50) NOT NULL,
pwd char(5) NOT NULL,
fname varchar(30) NOT NULL,
lname varchar(30) NOT NULL,
address varchar(256) NOT NULL,
age int NOT NULL,
need varchar(256) NOT NULL,
PRIMARY KEY (AID)
);

INSERT INTO ADMINS VALUES
("001","pguide@gmail.com","12345","Thanawich","Juangroongruangkit","69 poseidon",20,"อยากจะเป็นนักการเมือง"),
("002","psub@gmail.com","11111","Jaosub","Juangroongruangkit","888 panunonline",20,"เป็นพ่อเล้า"),
("003","pjay@gmail.com","69696","Salute","Juangroongruangkit","123 city",20,"หืวข้าว"),
("004","pcho@gmail.com","25474","Suntipap","Juangroongruangkit","99 samainiyom",19,"อยากเป็นหมอ"),
("005","phim@gmail.com","98764","Jittakan","Juangroongruangkit","911 USA",21,"อยากจะเป็นนักธุรกิจพันล้าน");

-- INSERT INTO USERS VALUES
-- ("101","slot888@gmail.com","69 jatujak","00004"),
-- ("102","sunut@gmail.com","99 thonglor","it555"),
-- ("103","sompong@gmail.com","111 pitsamai","20044"),
-- ("104","lnwza007@gmail.com","10 ten","25414"),
-- ("105","pipat4@gmail.com","78 swadee","99994");

INSERT INTO Product VALUES
("01","ใบตัด New Kosoku","New Kosoku","เครื่องมือตัด",349,99,"ขนาด4x4"),
("02","MAKITA สว่าน DF001G Cordless Driver Drill","MAKITA","เครื่องมือไฟฟ้า",3500,99,"40V"),
("03","เครื่องตัดเหล็ก 12 Stanley","Stanley","เครื่องมือตัด",1400,99,"#15-166"),
("04","ใบตัด Corolla","Corolla","เครื่องมือตัด",500,99,"ขนาด4x1"),
("05","MAKITA สว่านไร้สาย สว่าน 3 ระบบ","MAKITA","เครื่องมือไฟฟ้า",849,99,"148V"),
("06","Total ปั๊มลมอัตโนมัติ ปั๊มลมมินิ","Total","เครื่องมือลมปั้มลม",1169,99,"12V 18A แรงดัน 120 PSI");

-- SELECT * FROM USERS;

SELECT * FROM ADMINS;

SELECT * FROM Product;
