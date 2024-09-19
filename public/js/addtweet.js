async function addTweet() {
    try {
      
      const form = document.getElementById('myform');
      const formdata = new FormData(form);
      formdata.append('post' , 'Post');

      const endpoint = '/add-tweet';
      const response = await fetch(endpoint , {
        method : 'POST',
        body : formdata
      });

      const addedTweet = await response.json();
      if(addedTweet.tweetImageUrl === null) {
          showPost(addedTweet);
      }
      else {
          showImagePost(addedTweet);
      }

      form.reset();
      
    } catch (error) {
      console.error(error);
    }
  }

  