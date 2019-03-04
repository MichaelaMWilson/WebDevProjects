let search = document.getElementById("search");
let inputString = "";
let fullName, pic, loc, emailAdd, phone;
let parent = document.getElementById("parent");
let loading = document.getElementById("loading");

window.onload = function() {
        $.ajax({
            url: 'https://randomuser.me/api/?results=200',
            dataType: 'json',
            crossDomain: true,
            success: function (data) {

                for (let i = 0; i < 100; i++) {
                    if (i !== 0) {
                        let clone = $('#card0').clone();
                        clone.attr("id", "card" + i);
                        clone.find('#locIcon0').attr("id", "locIcon" + i);
                        clone.find('#location0').attr("id", "location" + i);
                        clone.find('#profilePic0').attr("id", "profilePic" + i);
                        clone.find('#fullName0').attr("id", "fullName" + i);
                        clone.find('#emailIcon0').attr("id", "emailIcon" + i);
                        clone.find('#email0').attr("id", "email" + i);
                        clone.find('#phoneIcon0').attr("id", "phoneIcon" + i);
                        clone.find('#phone0').attr("id", "phone" + i);

                        clone.appendTo($('#parent'));
                    }
                    fullName = document.getElementById("fullName" + i);
                    fullName.innerHTML = data.results[i].name.first + " " + data.results[i].name.last;
                    pic = document.getElementById("profilePic" + i);
                    pic.src = data.results[i].picture.large;
                    loc = document.getElementById("location" + i);
                    loc.innerHTML = data.results[i].location.city + ", " + data.results[i].location.state;
                    emailAdd = document.getElementById("email" + i);
                    emailAdd.innerHTML = data.results[i].email;
                    phone = document.getElementById("phone" + i);
                    phone.innerHTML = data.results[i].cell;
                }

                loading.style.display = "none";
                parent.style.display = "flex";
            }
        });
}


$(search).on('keyup', function(){
    inputString = search.value;
    filterResults(inputString.toLowerCase());
});

function filterResults(str){
    for(let i = 0; i < 100; i++) {
        fullName = document.getElementById("fullName" + i);
        pic = document.getElementById("profilePic" + i);
        loc = document.getElementById("location" + i);
        emailAdd = document.getElementById("email" + i);
        phone = document.getElementById("phone" + i);
        let card = document.getElementById("card" + i);

        let regExp = new RegExp(".*"+ str + ".*", "g");


        card.style.display = "none";
        $(fullName).unmark(fullName.html);
        $(emailAdd).unmark(emailAdd.html);
        $(loc).unmark(loc.html);
        $(phone).unmark(phone.html);

        if(fullName.innerHTML.match(regExp)){
            card.style.display = "flex";
            $(fullName).mark(str, {className: 'mark'});
        }
        if(emailAdd.innerHTML.match(regExp)){
            card.style.display = "flex";
            $(emailAdd).mark(str, {className: 'mark'});
        }
        if(loc.innerHTML.match(regExp)){
            card.style.display = "flex";
            $(loc).mark(str, {className: 'mark'});
        }
        if(phone.innerHTML.match(regExp)){
            card.style.display = "flex";
            $(phone).mark(str, {className: 'mark'});
        }
    }
}
