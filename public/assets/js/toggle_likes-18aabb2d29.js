class ToggleLike{constructor(t){this.toggler=t,this.toggleLike()}toggleLike(){$(this.toggler).click((function(t){t.preventDefault();$.ajax({type:"POST",url:$(this).attr("href")}).done((function(t){let i=parseInt($("#likes-count-"+t.data.post._id).attr("data-likes"));1==t.data.deleted?i-=1:i+=1,$("#likes-count-"+t.data.post._id).attr("data-likes",i),i>0?(t.data.post.likes.find(i=>i.user==t.data.user.id)?$("#put-like-"+t.data.post._id).html('<i class="fas fa-thumbs-up"></i> Like'):$("#put-like-"+t.data.post._id).html('<i class="far fa-thumbs-up"></i> Like'),$("#likes-count-"+t.data.post._id).html('<img src="/images/like.png" \n                            data-likes="<%= post.likes.length %>" id="count" class="rounded-circle" width="30" > '+i)):($("#put-like-"+t.data.post._id).html('<i class="far fa-thumbs-up"></i> Like'),$("#likes-count-"+t.data.post._id).html(""))})).fail((function(t){console.log("error in completing the request")}))}))}}