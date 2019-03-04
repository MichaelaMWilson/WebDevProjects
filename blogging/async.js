let blogPost, blogDiv, blogTitle, blogContent;
blogDiv = document.getElementById("blogDiv");

window.onload = function() {
    for(let i = 1; i < 26; i++){
        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/posts/' + i,
            dataType: 'json',
            success: function (data) {
                    blogPost = document.createElement("div");
                    blogPost.classList.add("row");
                    blogPost.style.margin = "0px";


                    let blogPostCol = document.createElement("div");
                    blogPostCol.classList.add("col");
                    blogPostCol.style.width = "100%";

                    let blogPostPanel = document.createElement("div");
                    blogPostPanel.classList.add("card-panel");
                    blogPostPanel.style.margin = "25px";

                    blogTitle = document.createElement("a");
                    blogTitle.innerHTML = data.title;
                    blogTitle.style.fontSize = "24px";
                    blogTitle.style.textTransform = "capitalize";

                    blogContent = document.createElement("p");
                    blogContent.innerHTML = data.body;

                    blogTitle.href = "post.html?post=" + i;

                    blogPostPanel.appendChild(blogTitle);
                    blogPostPanel.appendChild(blogContent);
                    blogPostCol.appendChild(blogPostPanel);
                    blogPost.appendChild(blogPostCol);
                    blogDiv.appendChild(blogPost);
            }
        });
    }
}