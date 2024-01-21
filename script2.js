const repoCard = document.getElementById("repo_Card");
const searchInput = document.getElementById("search_Input");
const searchbtn = document.querySelector(".search_btn");
const userRepoDiv = document.querySelector("#userRepoDiv");
let user=''
let page=1;
let perPage=10;


async function fetchUserRepo(user,page,perPage) {
  const data = await fetch(`https://api.github.com/users/${user}/repos?page=${page}&per_page=${perPage}`);
  const resData = await data.json();
  console.log(resData);
  addRepoToDom(resData);
}

searchbtn.addEventListener("click", (e) => {
  user=e.target.previousSibling.previousSibling.value;
  fetchUserRepo(e.target.previousSibling.previousSibling.value,page,perPage);
});

function addRepoToDom(repoData) {
  userRepoDiv.innerHTML=''
  console.log(repoData)
  repoData.map((repo) => {
    userRepoDiv.innerHTML += 
    `<div class='w-96 h-36 border border-black mx-5 my-2 shadow-lg'>
     <div class='ml-6 mt-4 [&>*]:mb-1'>
        <p class='font-semibold text-lg text-blue-500'>${repo.name}</p>
        <p class='font-semibold line-clamp-1'>${
          repo.description !== null ? repo.description : "Not Mentioned"
        }</p>
        <p class='mt-2 mr-3 line-clamp-1'>${repo.language}</p>
    </div>
</div>`
  })
}



function handlePagination() {
  const prevButton = document.getElementById('Previous');
  const nextButton = document.getElementById('Next');

  nextButton.addEventListener('click', () => {
      page++;
      fetchUserRepo(user, page, perPage);
  });

  prevButton.addEventListener('click', () => {
      if (page > 1) {
          page--;
          fetchUserRepo(user, page, perPage);
      }
  });
}

function handlePerPageChange() {
  const perPageSelect = document.getElementById('perPage');
console.log(perPageSelect)
  perPageSelect.addEventListener('change', () => {
      perPage = perPageSelect.value;
      fetchUserRepo(user, page, perPage);
  });
}

handlePagination();
handlePerPageChange();