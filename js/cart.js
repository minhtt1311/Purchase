let giohang = document.querySelector(".giohang");

let arr = [];

function getbyidSP() {
  const dssp = getValueLocalStorage("DanhSachSP");
  const dsCart = getValueLocalStorage("DanhSachItemCart");
  arr = [];
  dsCart.forEach((dsCart) => {
    dssp.forEach((item) => {
      if (item.id === dsCart.id) {
        arr.push({
          id: item.id,
          img: item.image,
          name: item.name,
          price: item.price,
          sl: dsCart.sl,
        });
      }
    });
  });
}

giohang.addEventListener("click", renderCart());

function renderCart() {
  console.log(arr);
  document.querySelector(".table").innerHTML = "";
  getbyidSP();

  let sp = `
<tr>
          <th>Hình Ảnh</th>
          <th>Tên Sản Phẩm</th>
          <th>Giá Tiền</th>
          <th>Số Lượng</th>
          <th>Thành Tiền</th>
          <th>Thao Tác</th>
        </tr>
`;
  arr.map((item) => {
    let thanhtien = item.price * item.sl;
    sp += `
    <tr>
            <td>
              <img
                src="${item.img}"
                alt=""
              />
            </td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>
            <button onclick="giam(${item.id})">-</button>
            <label for="">${item.sl}</label>
            <button onclick="tang(${item.id})">+</button>
            </td>
            <td class="a"> ${thanhtien}</td>
          
            <td><i class="fa-solid fa-trash-can" onclick="Delete(${item.id})"></i></td>
          </tr>
  
    `;
  });
  document.querySelector(".table").innerHTML = sp;
}
console.log(arr);
function tongSoLuong() {
  getbyidSP();
  const sl = arr.map((item) => item.sl);
  console.log(sl);
  const sumSl = sl.reduce((total, sl) => total + sl, 0);
  const soLuongSP = `
<h4 >Tổng số lượng sản phẩm: ${sumSl} </h4>
`;
  document.querySelector(".soluong").innerHTML = soLuongSP;
}

function tongThanhTien() {
  let thanhTien = arr.map((item) => item.sl * item.price);

  let sumtien = thanhTien.reduce((total, sl) => total + sl, 0);

  const thanhTienSP = `
  <h4 >Tổng số tiền: ${sumtien} </h4>
  `;
  document.querySelector(".thanhtien").innerHTML = thanhTienSP;
}

function sum() {
  tongSoLuong();
  tongThanhTien();
}
sum();

function tang(id) {
  const dssp = getValueLocalStorage("DanhSachSP");

  let findProduct = arr.find((item) => item.id === id);

  let slSP = dssp.find((item) => item.id === id);

  if (findProduct.sl >= slSP.sl) {
    alert(`Mặt hàng này chỉ có ${slSP.sl} sản phẩm`);
    return;
  }

  findProduct.sl += 1;
  setValueLocolStorage("DanhSachItemCart", arr);

  sum();
  renderCart();
}

function giam(id) {
  let findProduct = arr.filter((item) => item.id === id);
  console.log(findProduct);
  findProduct[0].sl -= 1;
  if (findProduct[0].sl <= 0) {
    Delete(id);
  }
  setValueLocolStorage("DanhSachItemCart", arr);
  sum();
  renderCart();
}

function Delete(id) {
  removeProductFromLocalStorage(id);
  sum();
  renderCart();
}

function removeProductFromLocalStorage(id) {
  const dssp = getValueLocalStorage("DanhSachSP");
  const dsCart = getValueLocalStorage("DanhSachItemCart");
  const dsspNew = dssp.filter((i) => i.id !== id);
  const dsCartNew = dsCart.filter((i) => i.id !== id);
  console.log(dsspNew, "dsspNew");
  setValueLocolStorage("DanhSachSP", dsspNew);
  setValueLocolStorage("DanhSachItemCart", dsCartNew);
}

function getValueLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function setValueLocolStorage(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}
