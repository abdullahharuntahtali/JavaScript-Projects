const form = document.querySelector(".add-form");
const liste = document.querySelector(".todos");
const aramaInput = document.querySelector(".search input");

function templateOlustur(yapilacak) {
  let html = `
    <li
    class="list-group-item d-flex justify-content-between align-items-center">
    <span>${yapilacak}</span>
    <i class="far fa-trash-alt delete"></i>
    </li>
    `;
  liste.innerHTML += html;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const yapilacak = form.add.value.trim().toLowerCase();

  //   console.log(yapilacak);
  if (yapilacak.lenth != 0) {
    templateOlustur(yapilacak);
    form.reset();
  }
});
liste.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
  }
});

aramaInput.addEventListener("keyup", (e) => {
  const ifade = aramaInput.value.trim().toLowerCase();
  console.log(ifade);
  filtreOlustur(ifade);
});
const filtreOlustur = (ifade) => {
  //   console.log(liste.children);
  //   console.log(Array.from(liste.children));
  Array.from(liste.children)
    .filter((yapilacak) => {
      // console.log(yapilacak.textContent.toLocaleLowerCase().includes(ifade));
      return !yapilacak.textContent.toLocaleLowerCase().includes(ifade);
    })
    .forEach((yapilacak) => {
      yapilacak.classList.add("filtered");
    });
  Array.from(liste.children)
    .filter((yapilacak) => {
      // console.log(yapilacak.textContent.toLocaleLowerCase().includes(ifade));
      return yapilacak.textContent.toLocaleLowerCase().includes(ifade);
    })
    .forEach((yapilacak) => {
      yapilacak.classList.remove("filtered");
    });
};
