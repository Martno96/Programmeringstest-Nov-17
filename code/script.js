const API_URL = "https://reqres.in/api/users"
const userList = document.getElementById("users-list")
const pageList = document.getElementById("pagination-page-list")
const userModal = document.getElementById("user-modal")
let currentPage = 1

const fetchData = async (path) => {
  const data = await fetch(API_URL + path, {
    method: 'GET'
  })
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.error(err))
  return data
}

const main = async () => {
  let currentPageData = await fetchData(`?page=${currentPage}`)
  currentPage = currentPageData.page
  const users = currentPageData.data
  users.forEach(user => {
    // ----- User buttons -----
    userList.innerHTML += `
      <li class="user-item">
        <button id="user-${user.id}-button" class="user-button" type="button">
          <img class="user-avatar" src="${user.avatar}" alt="${user.first_name} ${user.last_name}'s avatar"> 
          ${user.first_name} ${user.last_name}
        </button>
      </li>
    `
    // ----- Inserting user info into modal -----
    //TO-DO:
    //[_] solve below bug
    let button = document.getElementById(`user-${user.id}-button`)
    //BUG: both this event listener and .onclick only gets applied to the last button
    button.addEventListener("click", async () => {
      let userData = (await fetchData(`/${user.id}`)).data
      userModal.children[0].querySelector("p").innerHTML = `
        ${userData.first_name} ${userData.last_name}
      `
      userModal.style.display = "block"
    })
  })

  // ----- User-modal close button -----
  userModal.children[0].querySelector("span").onclick = () => {
    userModal.style.display = "none"
  }

  // ----- Pagination -----
  //TO-DO:
  //[_] programmatically assign active/disabled classes based on current page
  const totalPages = currentPageData.total_pages
  for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
    pageList.innerHTML += `
      <li class="page-item">
        <button class="page-button">
          ${pageNum}
        </button>
      </li>
    `
  }
  //TO-DO:
  //[_] call fetchData() with correct args
  const pageButtons = document.querySelectorAll("button.page-button")
  pageButtons.forEach(button => {
    button.onclick = () => {
      console.log("clickety")
    }
  })
}

main()