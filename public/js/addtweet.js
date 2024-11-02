async function addTweet() {
  try {
    const form = document.getElementById("myform");
    const formdata = new FormData(form);
    formdata.append("post", "Post");

    const endpoint = "/add-tweet";
    const response = await fetch(endpoint, {
      method: "POST",
      body: formdata,
    });

    const addedTweet = await response.json();
    console.log(addedTweet);
    if (addedTweet.tweetImageUrl === null) {
      showAddedPost(addedTweet);
    } else {
      showAddedImagePost(addedTweet);
    }

    form.reset();
  } catch (error) {
    console.error(error);
  }
}

function showAddedPost(tweet) {
  const tweetsContainer = document.getElementById("tweets");

  const tweetContainer = document.createElement("div");
  tweetContainer.classList.add(
    "tweet-container",
    "twitter-border-bottom",
    "px-3",
    "py-2"
  );
  tweetContainer.setAttribute("id", `tweet-${tweet.id}`);

  // Create the post row div
  const postRow = document.createElement("div");
  postRow.classList.add("post", "row", "p-0", "m-0");
  tweetContainer.appendChild(postRow);

  // Create the profile image container div
  const profileImageContainer = document.createElement("div");
  profileImageContainer.classList.add("profile-image-container", "p-0");
  postRow.appendChild(profileImageContainer);

  // Create the profile image wrapper div
  const profileImageWrapper = document.createElement("div");
  profileImageWrapper.classList.add("profile-image-wrapper");
  profileImageContainer.appendChild(profileImageWrapper);

  // Create the image element
  const profileImage = document.createElement("img");
  profileImage.src = "photos/user.png";
  profileImage.alt = "";
  profileImage.classList.add("w-100", "h-100");
  profileImageWrapper.appendChild(profileImage);

  // Create the tweet content container
  const tweetContent = document.createElement("div");
  tweetContent.classList.add("tweet-content", "col-11", "row", "p-0", "m-0");
  postRow.appendChild(tweetContent);

  // Create the user info row
  const userInfo = document.createElement("div");
  userInfo.classList.add("col-12", "user-info", "d-flex", "gap-2");
  tweetContent.appendChild(userInfo);

  // Create the name and username links
  const nameLink = document.createElement("a");
  nameLink.href = "#elon";
  nameLink.classList.add("text-decoration-none");
  userInfo.appendChild(nameLink);

  const nameTextContainer = document.createElement("div");
  nameTextContainer.classList.add("name-text-container");
  nameLink.appendChild(nameTextContainer);

  const nameText = document.createElement("span");
  nameText.textContent = tweet.user.firstname + " " + tweet.user.lastname;
  nameTextContainer.appendChild(nameText);

  const usernameLink = document.createElement("a");
  usernameLink.href = "#elon";
  usernameLink.classList.add("text-decoration-none");
  userInfo.appendChild(usernameLink);

  const usernameTextContainer = document.createElement("div");
  usernameTextContainer.classList.add("username-text-container");
  nameTextContainer.setAttribute("id", tweet.user_id);
  usernameLink.appendChild(usernameTextContainer);

  const usernameText = document.createElement("span");
  usernameText.textContent = tweet.user.username;
  usernameTextContainer.appendChild(usernameText);

  // Create the created-at span
  const createdAt = document.createElement("div");
  createdAt.classList.add("created-at");
  const createdAtText = document.createElement("span");
  createdAtText.textContent = "6h";
  createdAt.appendChild(createdAtText);
  userInfo.appendChild(createdAt);

  // Create the tweet text container
  const tweetTextContainer = document.createElement("div");
  tweetTextContainer.classList.add("col-12", "gy-1");
  tweetContent.appendChild(tweetTextContainer);

  const tweetTextInner = document.createElement("div");
  tweetTextInner.classList.add("tweet-text-container");
  tweetTextContainer.appendChild(tweetTextInner);

  const tweetText = document.createElement("span");
  tweetText.textContent = tweet.tweetText;
  tweetTextInner.appendChild(tweetText);

  // Create the reply/retweet/like container
  const interactionContainer = document.createElement("div");
  interactionContainer.classList.add("col-12", "gy-3");
  tweetContent.appendChild(interactionContainer);

  const replyRetweetContainer = document.createElement("div");
  replyRetweetContainer.classList.add("replyRetweet", "d-flex", "gap-5");
  interactionContainer.appendChild(replyRetweetContainer);

  const replyButton = createButtonWithIcon(
    "replyButton",
    "M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z",
    "11K"
  );
  replyRetweetContainer.appendChild(replyButton);

  // Create retweet button
  const retweetButton = createButtonWithIcon(
    "retweetButton",
    "M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z",
    tweet.retweets.length
  );

  isRetweeted(tweet).then((response) => {
    if (response) {
      retweetButton.firstChild.firstChild.style.fill = "rgb(0, 186, 124)";
    }
  });

  replyRetweetContainer.appendChild(retweetButton);

  // Create like button
  const likeButton = createButtonWithIcon(
    "likeButton",
    "M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z",
    tweet.likes.length
  );

  isLiked(tweet).then((response) => {
    if (response) {
      likeButton.firstChild.firstChild.style.fill = "red";
    }
  });

  replyRetweetContainer.appendChild(likeButton);

  //tweetsContainer.appendChild(tweetContainer);
  tweetsContainer.prepend(tweetContainer);
}

function showAddedImagePost(tweet) {
  const tweetsContainer = document.getElementById("tweets");

  const tweetContainer = document.createElement("div");
  tweetContainer.classList.add(
    "tweet-container",
    "twitter-border-bottom",
    "px-3",
    "py-2"
  );
  tweetContainer.setAttribute("id", `tweet-${tweet.id}`);

  // Create the image post row div
  const postImageRow = document.createElement("div");
  postImageRow.classList.add("image-post", "row", "p-0", "m-0");
  tweetContainer.appendChild(postImageRow);

  // Create the profile image container div
  const profileImageContainer = document.createElement("div");
  profileImageContainer.classList.add("profile-image-container", "p-0");
  postImageRow.appendChild(profileImageContainer);

  // Create the profile image wrapper div
  const profileImageWrapper = document.createElement("div");
  profileImageWrapper.classList.add("profile-image-wrapper");
  profileImageContainer.appendChild(profileImageWrapper);

  // Create the image element
  const profileImage = document.createElement("img");
  profileImage.src = "photos/user.png";
  profileImage.alt = "";
  profileImage.classList.add("w-100", "h-100");
  profileImageWrapper.appendChild(profileImage);

  // Create the tweet content container
  const tweetContent = document.createElement("div");
  tweetContent.classList.add("tweet-content", "col-11", "row", "p-0", "m-0");
  postImageRow.appendChild(tweetContent);

  // Create the user info row
  const userInfo = document.createElement("div");
  userInfo.classList.add("col-12", "user-info", "d-flex", "gap-2");
  tweetContent.appendChild(userInfo);

  // Create the name and username links
  const nameLink = document.createElement("a");
  nameLink.href = "#elon";
  nameLink.classList.add("text-decoration-none");
  userInfo.appendChild(nameLink);

  const nameTextContainer = document.createElement("div");
  nameTextContainer.classList.add("name-text-container");
  nameTextContainer.setAttribute("id", tweet.user_id);
  nameLink.appendChild(nameTextContainer);

  const nameText = document.createElement("span");
  nameText.textContent = tweet.user.firstname + " " + tweet.user.lastname;
  nameTextContainer.appendChild(nameText);

  const usernameLink = document.createElement("a");
  usernameLink.href = "#elon";
  usernameLink.classList.add("text-decoration-none");
  userInfo.appendChild(usernameLink);

  const usernameTextContainer = document.createElement("div");
  usernameTextContainer.classList.add("username-text-container");
  usernameLink.appendChild(usernameTextContainer);

  const usernameText = document.createElement("span");
  usernameText.textContent = tweet.user.username;
  usernameTextContainer.appendChild(usernameText);

  // Create the created-at span
  const createdAt = document.createElement("div");
  createdAt.classList.add("created-at");
  const createdAtText = document.createElement("span");
  createdAtText.textContent = "6h";
  createdAt.appendChild(createdAtText);
  userInfo.appendChild(createdAt);

  // Create the tweet text container
  const tweetTextContainer = document.createElement("div");
  tweetTextContainer.classList.add("col-12", "gy-1");
  tweetContent.appendChild(tweetTextContainer);

  const tweetTextInner = document.createElement("div");
  tweetTextInner.classList.add("tweet-text-container");
  tweetTextContainer.appendChild(tweetTextInner);

  const tweetText = document.createElement("span");
  tweetText.textContent = tweet.tweetText;
  tweetTextInner.appendChild(tweetText);

  const imgContainer = document.createElement("div");
  imgContainer.classList.add("col-12", "gy-2");
  tweetContent.appendChild(imgContainer);

  const postImg = document.createElement("img");
  postImg.src = `uploads/${tweet.tweetImageUrl}`;
  postImg.classList.add("img-fluid");
  imgContainer.appendChild(postImg);

  // Create the reply/retweet/like container
  const interactionContainer = document.createElement("div");
  interactionContainer.classList.add("col-12", "gy-3");
  tweetContent.appendChild(interactionContainer);

  const replyRetweetContainer = document.createElement("div");
  replyRetweetContainer.classList.add("replyRetweet", "d-flex", "gap-5");
  interactionContainer.appendChild(replyRetweetContainer);

  const replyButton = createButtonWithIcon(
    "replyButton",
    "M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z",
    "11K"
  );
  replyRetweetContainer.appendChild(replyButton);

  // Create retweet button
  const retweetButton = createButtonWithIcon(
    "retweetButton",
    "M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z",
    tweet.retweets.length
  );

  isRetweeted(tweet).then((response) => {
    if (response) {
      retweetButton.firstChild.firstChild.style.fill = "rgb(0, 186, 124)";
    }
  });

  replyRetweetContainer.appendChild(retweetButton);

  // Create like button
  const likeButton = createButtonWithIcon(
    "likeButton",
    "M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z",
    tweet.likes.length
  );

  isLiked(tweet).then((response) => {
    if (response) {
      likeButton.firstChild.firstChild.style.fill = "red";
    }
  });
  replyRetweetContainer.appendChild(likeButton);

  tweetsContainer.prepend(tweetContainer);
}
