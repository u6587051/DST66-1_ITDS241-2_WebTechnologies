//function ในการเรียก searchWS ผ่านการ fetch api
async function callSearchWS(url, method,sentData = {}) {
    let data;
    if (method == "select") { //ถ้า method ที่รับ parameter คือแสดงผลทั้งหมด
      let response = await fetch(url, {
        method: "GET", //ส่ง method get ไปยัง SearchWS
      });
      data = await response.json();
    }
    return data; //ส่งข้อมูลกลับมา
}

//รับค่า input box โดย id
let PNAME, PBRAND, PCAT;
let PNAME_TXT = document.querySelector("#pname");
let PCAT_TXT = document.querySelector("#pcat");
let PBRAND_TXT = document.querySelector("#pbrand");

//รับค่าปุ่มมาจากid
let selectB = document.querySelector("#psearch");


//หากกดคลิก select button ให้รับค่ามาเก็บเป็น json ไฟล์แล้วส่งเข้าไปพร้อมเรียก function callSearchWS
//ส่ง parameter url คือ http://localhost:8022/searchWS/search บวกกับ params เพื่อใช้ในการใส่เงื่อนไขการค้นหา
selectB.addEventListener("click", () => {
    PBRAND = PBRAND_TXT.value;
    PCAT = PCAT_TXT.value;
    PNAME = PNAME_TXT.value;

    let pname = `PNAME=${PNAME}`
    let cat = `PCAT=${PCAT}`;
    let brand = `PBRAND=${PBRAND}`;

    callSearchWS("http://localhost:8022/searchWS/" + "search?"+pname+"&"+cat+"&"+brand, "select").then((data) => {
      console.log(data);
      if (data) {
        alert(data.message);
        PID = data.PID;
        PNAME = data.PName;
        PBRAND = data.PBrand;
        PCAT = data.PCat;
        PPRICE = data.PPrice;
        PQUAN = data.Pquan;
        PDETAIL = data.PDetail;
      }
    });
  });

function filterProduct(){
  
}

