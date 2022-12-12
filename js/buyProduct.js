var buy = $(".buy");
var modal = $(".modal");
var buyProduct = $(".buy-product");
var btnCancel = $(".btn-cancel");

buy.addEventListener("click", () => {
  modal.classList.add("hide");
});

btnCancel.addEventListener("click", () => {
  modal.classList.remove("hide");
});

var btn_comfirm = $(".btn-comfirm");
btn_comfirm.addEventListener("click", comfirm);

function comfirm() {
  var name = $("#name");
  if (!check()) {
    return;
  } else {
    let data = {
      maDonHang: randomId(),
      ngayMua: getToday(),
      info: {
        diaChi: "HN",
        hoTen: surname.value + " " + name.value,
      },
      listOrder: tranformLst(arr),
    };

    PostApi(data);
    setValueLocolStorage("DanhSachItemCart", []);
    Redirect();
    alert("Mua thành công");
  }
}

function PostApi(data) {
  let api = "https://616d6fd86dacbb001794ca46.mockapi.io/orDer";
  options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(api, options).then((res) => res.json());
}

function randomId() {
  let newDate = new Date();
  return newDate.getTime();
}

function getToday() {
  const date = new Date();
  const today =
    (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
    "/" +
    (date.getMonth() > 8 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)) +
    "/" +
    date.getFullYear();
  return today;
}

// function ObjectInfomation(info) {
//   this.id = info.id;
//   this.hoTen = info.hoTen;
//   this.diaChi = info.diaChi;
// }

function ObjectInformationCart(cart) {
  this.id = cart.id;
  this.img = cart.img;
  this.name = cart.name;
  this.price = cart.price;
  this.sl = cart.sl;
}

function tranformLst(lst) {
  const arr = [];
  lst.forEach((cart) => {
    const item = new ObjectInformationCart(cart);
    arr.push(item);
  });
  return arr;
}

// function addInfoOrder(infomation, lstOrder) {
//   return {
//     id: randomId(),
//     ngayMua: getToday(),
//     info: infomation,
//     lstOrder: tranformLst(lstOrder),
//   };
// }
function Redirect() {
  window.location = "http://127.0.0.1:5500/Bai1/html/orderList.html";
}
