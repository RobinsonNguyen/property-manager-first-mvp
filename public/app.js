let contentBody = document.querySelector(".content");
let ACCESS_TOKEN;
function aboutMe() {
  // contentBody.replaceChildren();
  const div = document.createElement("div");
  div.id = "about-me";

  const aboutMeImg = document.createElement("img");
  aboutMeImg.src = `images/IMG_8167[2753].JPG`;
  aboutMeImg.id = "photo";
  div.append(aboutMeImg);

  const innerDiv = document.createElement("div");
  innerDiv.innerHTML = `Hi, my name is Emma Bowyer. I just got started in Real Estate in 2022 and I am excited for the long journey ahead! Although I am a licensed Real Estate Agent and REALTOR®, I am focusing on everything property management including listing rentals and helping people find the right home for them to rent.
  I believe that communication and transparency are key, and using current software and social media will help everyone know that I'm doing my best to help you achieve financial freedom through owning real estate. <br> <br><br>
  <i class="fa-solid fa-baby"></i>Rockfordian since 2000 (lifelong) <br>
  <i class="fa-solid fa-wrench"></i>Prior Career: Radar Technician in the Marine Corps <br>
  <i class="fa-solid fa-id-card-clip"></i>Illinois Real Estate License since 2022`;
  // div.classList.add("hide");
  div.append(innerDiv);
  contentBody.append(div);
}
async function makePropertiesPage() {
  // contentBody.replaceChildren();
  // addInputs();
  const response = await fetch("/properties");
  const data = await response.json();
  const div = document.createElement("div");
  div.id = "propertyPage";
  for (let elem of data) {
    const innerDiv = makePropertyPanel(elem);
    div.append(innerDiv);
  }
  div.classList.add("hide");
  const filterForm = addInputs();

  div.prepend(filterForm);
  contentBody.prepend(div);
  return div;
}

function makePropertyPanel(obj) {
  const innerDiv = document.createElement("div");
  innerDiv.className = "property-panel";
  const {
    property_id,
    name,
    description,
    street,
    city,
    state,
    zip,
    price,
    img_path,
    img_ext,
    first_name,
    last_name,
  } = obj;
  const firstImage = document.createElement("img");
  firstImage.src = `${img_path}1.${img_ext}`;
  firstImage.id = "cover-photo";
  innerDiv.append(firstImage);
  const innerInnerDiv = document.createElement("div");
  innerInnerDiv.className = "property-info";
  innerInnerDiv.innerHTML = `${name} $${price}<br> ${description}<br> ${street}, ${city}, ${state}, ${zip}`;
  innerInnerDiv.setAttribute("data-price", `${price}`);
  innerInnerDiv.setAttribute("data-id", `${property_id}`);
  innerDiv.append(innerInnerDiv);
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete this property";
  deleteBtn.classList.add("delete-button");
  deleteBtn.classList.add("admin-button");
  deleteBtn.classList.add("hide");
  deleteBtn.addEventListener("click", async function (e) {
    // console.log(this.previousElementSibling.dataset.id);
    const response = await fetch("/properties", {
      method: "DELETE",
      body: JSON.stringify({
        property_id: this.previousElementSibling.dataset.id,
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    const queryData = await response.json();
    //Need to feed back deletion of panel
    if (queryData) {
      this.parentElement.remove();
    }
  });
  innerDiv.append(deleteBtn);
  return innerDiv;
}

async function makeContactPage() {
  // contentBody.replaceChildren();
  const response = await fetch("/property-manager");
  const data = await response.json();
  const div = document.createElement("div");
  div.id = "property-manager-page";

  const contactDiv = document.createElement("div");
  const innerDiv = document.createElement("div");
  const profImg = document.createElement("img");
  profImg.src = `images/prof-photo.jpg`;
  profImg.id = "prof-photo";
  contactDiv.append(profImg);

  const { first_name, last_name, phone_number, email, company } = data[0];
  const address = "551 N Mulford Rd, Rockford, IL, United States, Illinois";
  innerDiv.innerHTML = `<h3>${first_name} ${last_name} </h3><br> 
  <i class="fa-solid fa-location-dot"></i> ${address}<br> 
  <i class="fa-solid fa-phone"></i>  ${phone_number}<br> 
  <i class="fa-solid fa-envelope"></i>  ${email} <br>`;
  contactDiv.append(innerDiv);

  const brandDiv = document.createElement("div");
  brandDiv.id = "brand-links";
  const linkedInDiv = document.createElement("a");
  linkedInDiv.innerHTML = `<i class="fa-brands fa-linkedin fa-2x"></i>`;
  linkedInDiv.href =
    "https://www.linkedin.com/in/emmabowyer/?fbclid=IwAR2mCREta7QRIX4Oy2PkyPPP3HZGtVcVYd7H84qCr3cOCVA2l9ztgJQJJ7k";
  linkedInDiv.target = "_blank";
  brandDiv.append(linkedInDiv);

  const facebookDiv = document.createElement("a");
  facebookDiv.href = "https://www.facebook.com/BowyerPropertyManager";
  facebookDiv.innerHTML = `<i class="fa-brands fa-facebook fa-2x"></i>`;
  facebookDiv.target = "_blank";
  brandDiv.append(facebookDiv);

  const realtorDiv = document.createElement("a");
  realtorDiv.innerHTML = `<img src='images/icons/realtoricon.jpg' />`;
  realtorDiv.href =
    "https://www.realtor.com/realestateagents/Emma-Bowyer_Rockford_IL_99959372";
  realtorDiv.target = "_blank";
  brandDiv.append(realtorDiv);

  const bhhsDiv = document.createElement("a");
  bhhsDiv.innerHTML = `<img src='images/icons/bhhs.jpg' />`;
  bhhsDiv.href = "https://www.bhhscrosby.com/agent-bio/emmabowyer";
  bhhsDiv.target = "_blank";
  brandDiv.append(bhhsDiv);

  div.append(contactDiv);
  div.append(brandDiv);
  div.classList.add("hide");
  contentBody.append(div);
}
const properties = document.querySelector(".button3");
properties.addEventListener("click", clickProperties, false);
const contact = document.querySelector(".button4");
contact.addEventListener("click", clickContact, false);
function clickContact(e) {
  e.preventDefault();
  hideContent();
  const temp = document.getElementById("property-manager-page");
  temp.classList.remove("hide");
  // makeContactPage();
}
function clickProperties(e) {
  e.preventDefault();
  hideContent();
  const temp = document.getElementById("propertyPage");
  // const newPPage = makePropertiesPage();

  // temp.replaceWith(makePropertiesPage());
  const temp2 = document.getElementById("price-range-form");
  const temp3 = document.getElementById("propertyForm");
  temp.classList.remove("hide");
  temp2.classList.remove("hide");
  // temp3.classList.remove("hide");
  // makePropertiesPage();
}
const aboutMebutton = document.querySelector(".button1");
aboutMebutton.addEventListener("click", clickAbout, false);
function clickAbout(e) {
  e.preventDefault();
  hideContent();
  const temp = document.getElementById("about-me");
  temp.classList.remove("hide");
  // aboutMe();
}

function hideContent() {
  const contentElement = document.querySelector(".content");
  // console.log(contentElement.children);
  for (let elem of contentElement.children) {
    // console.log(elem);
    elem.classList.add("hide");
  }
}

function hidePropertiesUnder(price) {
  if (price === "") price = 9999999;
  const propertyPanels = document.getElementsByClassName("property-panel");
  for (let elem of propertyPanels) {
    // console.log(elem.children[1].dataset.price);
    if (parseInt(elem.children[1].dataset.price) > price) {
      elem.classList.add("hide");
    } else {
      elem.classList.remove("hide");
    }
  }
}
function addInputs() {
  const formElement = document.createElement("form");
  formElement.id = "price-range-form";
  const div = document.createElement("div");
  div.id = "property-panel-filter";
  const inputElement = document.createElement("input");
  inputElement.className = "input";
  inputElement.type = "number";
  const labelElement = document.createElement("label");
  labelElement.for = "input";
  labelElement.textContent = "Enter a price";
  const priceBtn = document.createElement("button");
  priceBtn.type = "submit";
  priceBtn.textContent = "Filter";
  div.append(labelElement);
  div.append(inputElement);
  div.append(priceBtn);
  formElement.append(div);
  formElement.classList.add("hide");
  // contentBody.prepend(formElement);
  formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    hidePropertiesUnder(e.target[0].value);
  });
  const togglePropertiesForm = revealAddPropertyForm();
  div.append(togglePropertiesForm);
  return formElement;
}
function togglePropertyForm() {
  const addProperty = document.getElementById("propertyForm");
  const toggleForm = document.getElementById("toggle-form");
  if (!addProperty.classList.toggle("hide")) {
    toggleForm.textContent = "Hide New Property Form";
  } else {
    toggleForm.textContent = "Show New Property Form";
  }
}
function revealAddPropertyForm() {
  const toggleForm = document.createElement("button");
  toggleForm.id = "toggle-form";
  toggleForm.classList.add("admin-button");
  toggleForm.classList.add("hide");
  toggleForm.textContent = "Show New Property Form";
  toggleForm.addEventListener("click", togglePropertyForm);
  return toggleForm;
}
function addLogin() {
  const formElement = document.createElement("form");
  // formElement.action = "/";
  // formElement.method = "GET";
  formElement.id = "login-form";
  let div = document.createElement("div");
  const userLabel = document.createElement("label");
  userLabel.for = "userName";
  userLabel.textContent = "Enter your username:";
  const inputUserName = document.createElement("input");
  inputUserName.name = "userName";
  inputUserName.type = "text";

  div.append(userLabel);
  div.append(inputUserName);
  formElement.append(div);

  const passLabel = document.createElement("label");
  passLabel.for = "password";
  passLabel.textContent = "Enter your password:";
  const inputPassword = document.createElement("input");
  inputPassword.name = "password";
  inputPassword.type = "password";
  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "Submit";
  formElement.addEventListener("submit", async function (e) {
    e.preventDefault();
    const response = await fetch("/login", {
      method: "POST",
      body: JSON.stringify({
        username: e.target[0].value,
        password: e.target[1].value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const queryData = await response.json();
    if (queryData !== false) {
      const welcomeDiv = makeWelcomeLogin(queryData.name);
      if (queryData.name === "admin") {
        toggleAdminButtons();
        ///////////////////////////////////////////////////////////////////////////////////////
      }
      ACCESS_TOKEN = queryData.accessToken;
      this.classList.add("hide");
      const loginDiv = document.getElementById("login-info");
      loginDiv.append(welcomeDiv);
      formElement.reset();
    }
  });

  div = document.createElement("div");
  div.append(passLabel);
  div.append(inputPassword);
  formElement.append(div);
  formElement.append(submitBtn);
  return formElement;
}

function makeWelcomeLogin(name) {
  // const { first_name, last_name, phone_number, email } = obj[0];
  const div = document.createElement("div");
  div.id = "login-welcome";
  let innerDiv = document.createElement("div");
  innerDiv.textContent = `Welcome ${name}!`;
  div.append(innerDiv);

  innerDiv = document.createElement("div");
  const logoutBtn = document.createElement("button");
  logoutBtn.textContent = "Logout";
  logoutBtn.addEventListener("click", async function (e) {
    const response = await fetch("/logout", {
      method: "DELETE",
    });
    //const queryData = await response.json();
    if (response) {
      ACCESS_TOKEN = "";
      toggleAdminButtons();
      const toggleButton = document.getElementById("toggle-form");
      if ((toggleButton.textContent = "Hide New Property Form")) {
        togglePropertyForm();
      }
      const loginForm = document.getElementById("login-form");
      loginForm.classList.remove("hide");
      div.remove();
    }
  });
  innerDiv.append(logoutBtn);

  const refreshTokenBtn = document.createElement("button");
  refreshTokenBtn.textContent = "Refresh Token";
  refreshTokenBtn.addEventListener("click", async function (e) {
    const response = await fetch("/refresh_token", {
      METHOD: "GET",
    });
    const queryData = await response.json();
    ACCESS_TOKEN = queryData;
  });
  innerDiv.append(refreshTokenBtn);
  div.append(innerDiv);
  return div;
}
function addPropertyForm() {
  const formElement = document.createElement("form");
  formElement.id = "propertyForm";
  // formElement.action = "/";
  // formElement.method = "POST";
  // const firstCol = document.createElement("div");
  const nameLabel = document.createElement("label");
  nameLabel.textContent = "Name";
  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.required = true;
  nameInput.placeholder = "Required";

  // const secondCol = document.createElement("div");
  const descriptionLabel = document.createElement("label");
  descriptionLabel.textContent = "Description";
  const descriptionInput = document.createElement("textarea");
  descriptionInput.rows = "5";
  descriptionInput.cols = "33";
  descriptionInput.required = true;
  descriptionInput.placeholder = "Required";

  const priceLabel = document.createElement("label");
  priceLabel.textContent = "Price";
  const priceInput = document.createElement("input");
  priceInput.type = "number";
  priceInput.required = true;
  priceInput.placeholder = "Required";

  const streetLabel = document.createElement("label");
  streetLabel.textContent = "Street";
  const streetInput = document.createElement("input");
  streetInput.type = "text";
  streetInput.required = true;
  streetInput.placeholder = "Required";

  const cityLabel = document.createElement("label");
  cityLabel.textContent = "City";
  const cityInput = document.createElement("input");
  cityInput.type = "text";
  cityInput.required = true;
  cityInput.placeholder = "Required";

  const stateLabel = document.createElement("label");
  stateLabel.textContent = "State";
  const stateInput = document.createElement("input");
  stateInput.type = "text";
  stateInput.required = true;
  stateInput.placeholder = "Required";

  const zipLabel = document.createElement("label");
  zipLabel.textContent = "Zip Code";
  const zipInput = document.createElement("input");
  zipInput.type = "number";
  zipInput.required = true;
  zipInput.placeholder = "Yeah this one too";

  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "Submit";

  const resetBtn = document.createElement("button");
  resetBtn.type = "reset";
  resetBtn.textContent = "Reset";

  formElement.append(nameLabel, nameInput);
  formElement.append(descriptionLabel, descriptionInput);
  formElement.append(priceLabel, priceInput);
  formElement.append(streetLabel, streetInput);
  formElement.append(cityLabel, cityInput);
  formElement.append(stateLabel, stateInput);
  formElement.append(zipLabel, zipInput);
  formElement.append(submitBtn, resetBtn);

  formElement.classList.add("hide");
  return formElement;
}
const topDiv = document.getElementById("login-info");
topDiv.prepend(addLogin());
contentBody.append(addPropertyForm());

const addProperty = document.getElementById("propertyForm");
addProperty.addEventListener("submit", async function (e) {
  e.preventDefault();
  const data = {
    name: e.target[0].value,
    description: e.target[1].value,
    price: e.target[2].value,
    street: e.target[3].value,
    city: e.target[4].value,
    state: e.target[5].value,
    zip: e.target[6].value,
  };
  const response = await fetch("/properties", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });
  const queryData = await response.json();
  if (queryData !== false) {
    const newestPropertyPanel = makePropertyPanel(queryData[0]);
    newestPropertyPanel
      .getElementsByTagName("button")[0]
      .classList.remove("hide");
    const propertyPage = document.getElementById("propertyPage");
    propertyPage.append(newestPropertyPanel);
    this.reset();
  } else {
  }
});
addProperty.addEventListener("reset", async function (e) {
  this.reset();
});

function toggleAdminButtons() {
  // togglePropertyForm();
  const deleteButtons = document.getElementsByClassName("admin-button");
  for (let elem of deleteButtons) {
    elem.classList.toggle("hide");
  }
}
aboutMe();
makePropertiesPage();
makeContactPage();

//https://www.bhhscrosby.com/agent-bio/emmabowyer
//https://www.facebook.com/BowyerPropertyManager

//https://www.linkedin.com/in/emmabowyer/?fbclid=IwAR2ZvzLFu5YlYko-R-yYKrFGxYxRNj_SyUz9KGQnkr9Wpggh_vWgk4Elg0Y
