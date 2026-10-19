const base = "https://static.marceeli.ovh/images/preview/";

// This function is szpont
const toIso = (url) => {
  const match = url.match(/(\d{2})\.(\d{2})\.(\d{4})/);
  return match ? `${match[3]}-${match[2]}-${match[1]}` : "";
};

const renderImageSection = (images) => {
  const imagesDiv = document.getElementById("images");

  const catDiv = document.createElement("div");
  catDiv.id = "section"
  const imgHeader = document.createElement("h2");
  imgHeader.id = "sectionTitle"


  imagesDiv.appendChild(catDiv);

  imgHeader.textContent = images.title;
  catDiv.append(imgHeader);

  images.imgs.forEach(imge => {
    const img = document.createElement("img");
    const href = document.createElement("a")
    img.src = imge
    img.id = "sectionImage"
    href.href = imge
    href.append(img)
    catDiv.append(href)
  })
}

async function loadImageDirectory(link) {
  const res = await fetch(link);
  const data = await res.text();
  var stuff = document.createElement( 'html' );
  stuff.innerHTML = data;


  return stuff
}

const directoryList = new Array;
const directories = await loadImageDirectory(base);

directories.querySelectorAll( 'a' ).forEach((item) => {
  const dirEntry = {
    title: item.getAttribute("href").slice(0, -1),
    link: `${base}${item.getAttribute("href")}`
  }
  directoryList.push(dirEntry);
});
directoryList.shift();
directoryList.sort((a, b) => toIso(b.link).localeCompare(toIso(a.link)));

for (const imageDir of directoryList) {
  const imgBase = imageDir.link
  const imagesLinks = new Array
  const images = await loadImageDirectory(imageDir.link);

  images.querySelectorAll( 'a' ).forEach((item) => {
    imagesLinks.push(
        `${imgBase}${item.getAttribute("href")}`
      );
  });
  imagesLinks.shift()

  const imageSect = {
    title: imageDir.title,
    imgs: imagesLinks
  }

  renderImageSection(imageSect)
}
