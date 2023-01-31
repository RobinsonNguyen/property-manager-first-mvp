let contentBody = document.querySelector(".content");
function aboutMe() {
  // contentBody.replaceChildren();
  const div = document.createElement("div");
  div.className = "aboutMePage";
  div.innerHTML = `Hi, my name is Emma Bowyer. I just got started in Real Estate in 2022 and I am excited for the long journey ahead! Although I am a licensed Real Estate Agent and REALTOR®, I am focusing on everything property management including listing rentals and helping people find the right home for them to rent.
  I believe that communication and transparency are key, and using current software and social media will help everyone know that I'm doing my best to help you achieve financial freedom through owning real estate.
  <br>
  Rockfordian since 2000 (lifelong)
  prior career: radar technician in the marine corps
  IL Real Estate License since 2022`;
  // div.classList.add("hide");
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
    first_name,
    last_name,
  } = obj;
  innerDiv.innerHTML = `${name} $${price}<br> ${description}<br> ${street}, ${city}, ${state}, ${zip} <br> The property manager is ${first_name} ${last_name}`;
  innerDiv.setAttribute("data-price", `${price}`);
  innerDiv.setAttribute("data-id", `${property_id}`);
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete this property";
  deleteBtn.addEventListener("click", async function (e) {
    console.log(this.parentElement.dataset.id);
    const response = await fetch("/properties", {
      method: "DELETE",
      body: JSON.stringify({ property_id: this.parentElement.dataset.id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const queryData = await response.json();
    //Need to feed back deletion of panel
    console.log(queryData);
    this.parentElement.remove();
  });
  innerDiv.append(deleteBtn);
  return innerDiv;
}

async function makeContactPage() {
  // contentBody.replaceChildren();
  const response = await fetch("/property-manager");
  const data = await response.json();
  for (let elem of data) {
    const div = document.createElement("div");
    div.className = "propertyManagerPage";
    const { first_name, last_name, phone_number, email, company } = elem;
    div.innerHTML = `<br>${first_name} ${last_name} <br> ${company}<br> ${phone_number}<br> ${email} <br>`;
    div.classList.add("hide");
    contentBody.append(div);
  }
}
const properties = document.querySelector(".button3");
properties.addEventListener("click", clickProperties, false);
const contact = document.querySelector(".button4");
contact.addEventListener("click", clickContact, false);
function clickContact(e) {
  e.preventDefault();
  hideContent();
  const temp = document.getElementsByClassName("propertyManagerPage")[0];
  temp.classList.remove("hide");
  // makeContactPage();
}
function clickProperties(e) {
  e.preventDefault();
  hideContent();
  const temp = document.getElementById("propertyPage");
  // const newPPage = makePropertiesPage();

  // temp.replaceWith(makePropertiesPage());
  const temp2 = document.getElementById("priceRange");
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
  const temp = document.getElementsByClassName("aboutMePage")[0];
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
  const temp = document.getElementById("propertyPage");
  console.log(temp.children);
  for (let elem of temp.children) {
    if (parseInt(elem.dataset.price) > price) {
      elem.classList.add("hide");
    } else {
      elem.classList.remove("hide");
    }
  }
}
function addInputs() {
  const formElement = document.createElement("form");
  formElement.id = "priceRange";
  const div = document.createElement("div");
  div.className = "inputShit";
  const inputElement = document.createElement("input");
  inputElement.className = "input";
  inputElement.type = "number";
  const labelElement = document.createElement("label");
  labelElement.for = "input";
  labelElement.textContent = "put in price range";
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
function revealAddPropertyForm() {
  const toggleForm = document.createElement("button");
  toggleForm.textContent = "Add New Property";
  toggleForm.addEventListener("click", function (e) {
    const addProperty = document.getElementById("propertyForm");
    if (!addProperty.classList.toggle("hide")) {
      toggleForm.textContent = "Hide New Property Form";
    } else {
      toggleForm.textContent = "Add New Property";
    }
  });
  return toggleForm;
}
function addLogin() {
  const formElement = document.createElement("form");
  formElement.action = "/";
  formElement.method = "GET";
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
  submitBtn.addEventListener("click", async function (e) {
    e.preventDefault();
    const response = await fetch("/property-manager", {
      method: "POST",
      body: JSON.stringify({
        username: inputUserName.value,
        password: inputPassword.value,
      }),
    });
    const queryData = await response.json();
    const welcomeDiv = makeWelcomeLogin(queryData[0]);
    this.parentElement.classList.add("hide");
    const loginDiv = document.getElementById("login-info");
    loginDiv.append(welcomeDiv);
    /* Need to do stuff here



888888888888888888888888888888



*/
  });

  div = document.createElement("div");
  div.append(passLabel);
  div.append(inputPassword);
  formElement.append(div);
  formElement.append(submitBtn);
  return formElement;
}

function makeWelcomeLogin(obj) {
  const { first_name, last_name, phone_number, email } = obj;
  const div = document.createElement("div");
  div.id = "login-welcome";
  div.textContent = `Welcome ${first_name} ${last_name}!`;
  const logoutBtn = document.createElement("button");
  logoutBtn.textContent = "Logout";
  logoutBtn.addEventListener("click", function (e) {
    const loginForm = document.getElementById("login-form");
    loginForm.classList.remove("hide");
    div.remove();
  });
  div.append(logoutBtn);
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
  // formElement.append(firstCol);

  // const secondCol = document.createElement("div");
  const descriptionLabel = document.createElement("label");
  descriptionLabel.textContent = "Description";
  const descriptionInput = document.createElement("textarea");
  descriptionInput.rows = "5";
  descriptionInput.cols = "33";
  descriptionInput.required = true;

  const priceLabel = document.createElement("label");
  priceLabel.textContent = "priceLabel";
  const priceInput = document.createElement("input");
  priceInput.type = "number";
  priceInput.required = true;

  const streetLabel = document.createElement("label");
  streetLabel.textContent = "streetLabel";
  const streetInput = document.createElement("input");
  streetInput.type = "text";
  streetInput.required = true;

  const cityLabel = document.createElement("label");
  cityLabel.textContent = "cityLabel";
  const cityInput = document.createElement("input");
  cityInput.type = "text";
  cityInput.required = true;

  const stateLabel = document.createElement("label");
  stateLabel.textContent = "stateLabel";
  const stateInput = document.createElement("input");
  stateInput.type = "text";
  stateInput.required = true;

  const zipLabel = document.createElement("label");
  zipLabel.textContent = "zipLabel";
  const zipInput = document.createElement("input");
  zipInput.type = "text";
  zipInput.required = true;

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
  };
  const response = await fetch("/properties", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const queryData = await response.json();
  const newestPropertyPanel = makePropertyPanel(queryData[0]);
  const propertyPage = document.getElementById("propertyPage");
  propertyPage.append(newestPropertyPanel);
  this.reset();
});
addProperty.addEventListener("reset", async function (e) {
  this.reset();
});
aboutMe();
makePropertiesPage();
makeContactPage();
//https://www.bhhscrosby.com/agent-bio/emmabowyer
//https://www.facebook.com/BowyerPropertyManager

//https://www.linkedin.com/in/emmabowyer/?fbclid=IwAR2ZvzLFu5YlYko-R-yYKrFGxYxRNj_SyUz9KGQnkr9Wpggh_vWgk4Elg0Y
