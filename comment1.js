const submitButton = document.querySelector(".div5");
const userName = document.querySelector("#username");
const comment = document.querySelector("#comment");
const commentContainer = document.querySelector(".showcomments");
submitButton.addEventListener("click", submit);

function myfunction() {
  if (localStorage.getItem("dataArray") != null) {
    const data = JSON.parse(localStorage.getItem("dataArray"));

    commentContainer.innerHTML = data.map(
      (user) =>
        `<div class="display ">
      <div class="nickname">
        ${user.user_Name}
      <div/>
      <br/>
      <p class="comment">
        ${user.user_Comment}
      </p>
      <br/>

        <span class = "likes-text">likes ${user.user_Likes} <span/><i id="like" class="material-icons likes thumbs-up" style="font-size: 12px" onclick ="addLikes(${user.user_Id})"> thumb_up </i>
        <i id="unlike" class="material-icons likes"  style="font-size: 12px" onclick ="removeLikes(${user.user_Id})">thumb_down</i>
        
       <i class="material-icons" id="delete" style="font-size: 15px" onclick = "deleteComments(${user.user_Id})">delete</i>
 
       <hr/>
   </div>
   `
    );
  }
}

function submit(e) {
  if (userName.value == "" || comment.value == "") {
    alert("Please enter a username");
  } else {
    if (localStorage.getItem("dataArray") == null) {
      localStorage.setItem("dataArray", "[]");
      const data = JSON.parse(localStorage.getItem("dataArray"));
      const userID = data.length;
      const userForm = userName.value;
      const commentForm = comment.value;
      const likesForm = 00;

      newFeedback = {
        user_Id: userID,
        user_Name: userForm,
        user_Comment: commentForm,
        user_Likes: likesForm,
      };

      addCurrentCommentObjectToLocalStorage(newFeedback);
      resetForm();
    } else {
      const data = JSON.parse(localStorage.getItem("dataArray"));
      const userID = data.length;
      const userForm = userName.value;
      const commentForm = comment.value;
      const likesForm = 0;

      newFeedback = {
        user_Id: userID,
        user_Name: userForm,
        user_Comment: commentForm,
        user_Likes: likesForm,
      };
      addCurrentCommentObjectToLocalStorage(newFeedback);
      resetForm();
    }
  }
  e.preventDefault();
}

function addCurrentCommentObjectToLocalStorage(newFeedback) {
  if (localStorage.getItem("dataArray") == null) {
    localStorage.setItem("dataArray", "[]");

    const oldArray = JSON.parse(localStorage.getItem("dataArray"));
    oldArray.push(newFeedback);

    localStorage.setItem("dataArray", JSON.stringify(oldArray));

    addFeedback(JSON.parse(localStorage.getItem("dataArray")));
  } else {
    const oldArray = JSON.parse(localStorage.getItem("dataArray"));

    oldArray.push(newFeedback);

    localStorage.setItem("dataArray", JSON.stringify(oldArray));

    addFeedback(JSON.parse(localStorage.getItem("dataArray")));
  }
}

function resetForm() {
  userName.value = "";
  comment.value = "";
}

function addFeedback(newFeedback) {
  commentContainer.innerHTML = `<div>${newFeedback.user_Name}</div>
        <div>${newFeedback.user_Comment}</div>
       
        `;

  myfunction();
}

function addLikes(userId) {
  const array = JSON.parse(localStorage.getItem("dataArray"));

  array[userId].user_Likes += 1;
  localStorage.setItem("dataArray", JSON.stringify(array));
  myfunction();
}

function removeLikes(userId) {
  const array = JSON.parse(localStorage.getItem("dataArray"));

  array[userId].user_Likes -= 1;
  localStorage.setItem("dataArray", JSON.stringify(array));
  myfunction();
}

function deleteComments(userId) {
  const array = JSON.parse(localStorage.getItem("dataArray"));
  if (array.length == 1) {
    array.length = 0;
  }
  array.splice(userId, 1);
  localStorage.setItem("dataArray", JSON.stringify(array));
  myfunction();
}
