const dogruCevaplar = ["B", "A", "B", "D", "A"];

const form = document.querySelector(".quiz-form");
const sonuc = document.querySelector(".result");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let puan = 0;

  const kullaniciCevaplar = [
    form.s1.value,
    form.s2.value,
    form.s3.value,
    form.s4.value,
    form.s5.value,
  ];

  kullaniciCevaplar.forEach((cevap, index) => {
    if (cevap == dogruCevaplar[index]) {
      puan += 20;
    }
  });

  sonuc.querySelector("span").textContent = `%${puan}`;
  sonuc.classList.remove("d-none");

  scrollTo(0, 0);

  let tamponPuan = 0;
  const animasyon = setInterval(() => {
    sonuc.querySelector("span").textContent = `%${tamponPuan}`;

    if (tamponPuan === puan) {
      clearInterval(animasyon);
    } else {
      tamponPuan++;
    }
  }, 10);
});
