const yeniGorev = document.querySelector(".input-gorev");
const yeniGorevEkleBtn = document.querySelector(".btn-gorev-ekle");
const gorevListesi = document.querySelector(".gorev-listesi");

yeniGorevEkleBtn.addEventListener("click", gorevEkle);
gorevListesi.addEventListener("click", gorevSilTamamla);

function gorevSilTamamla(e) {
  const tiklanilanEleman = e.target;

  if (tiklanilanEleman.classList.contains("gorev-btn-tamamlandi")) {
    console.log("checked tıklandı");
    tiklanilanEleman.parentElement.classList.toggle("gorev-tamamlandi");
  } else if (tiklanilanEleman.classList.contains("gorev-btn-sil")) {
    console.log("sil tıklandı");
    tiklanilanEleman.parentElement.classList.toggle("kaybol");
    tiklanilanEleman.parentElement.addEventListener("transitionend", () => {
      tiklanilanEleman.parentElement.remove();
    });
  }
}

function gorevEkle(e) {
  e.preventDefault();

  // Div Oluşturma
  const gorevDiv = document.createElement("div");
  gorevDiv.classList.add("gorev-item");

  // li Oluşturma
  const gorevLi = document.createElement("li");
  gorevLi.classList.add("gorev-tanim");
  gorevLi.innerText = yeniGorev.value;
  gorevDiv.appendChild(gorevLi);

  //   tamamlandı butonu ekleme
  const gorevTamamBtn = document.createElement("button");
  gorevTamamBtn.classList.add("gorev-btn");
  gorevTamamBtn.classList.add("gorev-btn-tamamlandi");
  gorevTamamBtn.innerHTML = '<i class="far fa-check-square"></i>';
  gorevDiv.appendChild(gorevTamamBtn);

  //   sil butonu ekleme
  const gorevSilBtn = document.createElement("button");
  gorevSilBtn.classList.add("gorev-btn");
  gorevSilBtn.classList.add("gorev-btn-sil");
  gorevSilBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
  gorevDiv.appendChild(gorevSilBtn);

  // ul' ye oluşturduğumuz divi ekleyelim
  gorevListesi.appendChild(gorevDiv);

  yeniGorev.value = "";
}
