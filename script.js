const repo_Card=document.getElementById('repo_Card')
const search_Input=document.getElementById("search_Input")
const search_btn=document.querySelector(".search_btn")
const UserDetailDiv=document.querySelector("#UserDetail")

async function fetchUserDetail(user){
  const data=await fetch(`https://api.github.com/users/${user.toString()}`)
  const resData=await data.json()
  addUserDetailToDom(resData)
}

search_btn.addEventListener("click",(e)=>{
  fetchUserDetail(e.target.previousSibling.previousSibling.value)
})


function addUserDetailToDom(userDetail){
UserDetailDiv.innerHTML=''
UserDetailDiv.innerHTML +=
`<div>
<img class='w-44 rounded-full shadow-xl' src='${userDetail.avatar_url.toString()}' alt="" />
</div>
<div class='ml-16 font-mono text-xl'>
<p class='italic'>${userDetail.login}</p>
<p>${userDetail.bio}</p>
<span></span>
<span>${userDetail.twitter_username==null?"Not mentioned":userDetail.twitter_username}</span>
</div>
<div class='block mt-4 font-serif font-semibold text-xl text-blue-400'>
${userDetail.html_url}
</div>
`
}
