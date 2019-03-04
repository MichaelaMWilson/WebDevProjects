let url_string = window.location.href;
let url = new URL(url_string);
let postNum = url.searchParams.get("post");
let blogPost, blogDiv, blogTitle, blogContent, commentDiv;
blogDiv = document.getElementById("blogDiv");
commentDiv = document.getElementById("commentDiv");


window.onload = function() {
    $.ajax({
        url: 'https://jsonplaceholder.typicode.com/posts/' + postNum,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            blogPost = document.createElement("div");
            blogPost.classList.add("row");
            blogPost.style.margin = "0px";


            let blogPostCol = document.createElement("div");
            blogPostCol.classList.add("col");
            blogPostCol.style.width = "100%";

            let blogPostPanel = document.createElement("div");
            blogPostPanel.classList.add("card-panel");
            blogPostPanel.style.margin = "25px";

            blogTitle = document.createElement("h3");
            blogTitle.innerHTML = data.title;
            blogTitle.style.textTransform = "capitalize";

            blogContent = document.createElement("p");
            blogContent.innerHTML = data.body;

            blogPostPanel.appendChild(blogTitle);
            blogPostPanel.appendChild(blogContent);
            blogPostCol.appendChild(blogPostPanel);
            blogPost.appendChild(blogPostCol);
            blogDiv.appendChild(blogPost);

            postComments();
        }
    });
}

function postComments(){
    $.ajax({
        url: 'https://jsonplaceholder.typicode.com/comments?postId=' + postNum,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            let commentPost = document.createElement("div");
            commentPost.classList.add("row");
            commentPost.style.margin = "0 auto";

            let commentCol = document.createElement("div");
            commentCol.classList.add("col");
            commentCol.style.width = "100%";

            let commentCard = document.createElement("div");
            commentCard.classList.add("card");
            commentCard.style.margin = "25px";


            let commentPanel, commentTitle, commentContent, commentPoster, commentReply;

            for(let i = 0; i < data.length; i++) {
                commentPanel = document.createElement("div");

                commentPanel.classList.add("card-action");
                commentPanel.style.margin = "25px";

                commentTitle = document.createElement("h5");
                commentTitle.innerHTML = data[i].name;
                commentTitle.style.textTransform = "capitalize";

                commentContent = document.createElement("p");
                commentContent.innerHTML = data[i].body;
                //commentContent.style.display = "inline-block";

                commentPoster = document.createElement("a");
                commentPoster.innerHTML = data[i].email + " said: ";
                commentPoster.style.textTransform = "none";

                commentReply = document.createElement("a");
                commentReply.innerHTML = "REPLY";
                commentReply.style.float = "right";
                //commentReply.style.display = "inline-block";


                commentPanel.appendChild(commentPoster);
                commentPanel.appendChild(commentTitle);
                commentPanel.appendChild(commentContent);
                commentPanel.appendChild(commentReply);
                commentCard.appendChild(commentPanel);
            }

            commentPanel = document.createElement("div");
            commentPanel.classList.add("card-action");
            commentPanel.style.margin = "25px";

            commentCard.appendChild(commentPanel);
            commentCol.appendChild(commentCard);
            commentPost.appendChild(commentCol);
            commentDiv.appendChild(commentPost);
        }
    });
}