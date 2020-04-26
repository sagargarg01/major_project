// CHANGE :: create a class to toggle likes when a link is clicked, using AJAX
class ToggleLike {
    constructor(toggleElement) {
        this.toggler = toggleElement;
        this.toggleLike();
    }


    toggleLike() {
        $(this.toggler).click(function (e) {
            e.preventDefault();
            let self = this;

            // changing the symbol from didn't like to liked


            // this is a new way of writing ajax which you might've studied, it looks like the same as promises
            $.ajax({
                type: 'POST',
                url: $(self).attr('href'),
            })
                .done(function (data) {
                    console.log($('#likes-count').attr('data-likes'))
                    let likesCount = parseInt($('#likes-count').attr('data-likes'));

                    if (data.data.deleted == true) {
                        likesCount -= 1;
                    } else {
                        likesCount += 1;
                    }

                    $('#likes-count').attr('data-likes', likesCount);

                    var noLike = true;

                    if (likesCount > 0) {
                        $('#put-like').html('<i class="fas fa-thumbs-up"></i> Like')
                        if (noLike) {
                            $('#likes-count').html(`<img src="https://i.pinimg.com/originals/39/44/6c/39446caa52f53369b92bc97253d2b2f1.png" 
                            data-likes="<%= post.likes.length %>" id="count" class="rounded-circle" width="30" > ${likesCount}`);
                            $('.card-post').css({ 'padding-bottom': '5px' })
                        }
                    }
                    else {
                        $('#put-like').html('<i class="far fa-thumbs-up"></i> Like')
                        $('#likes-count').html('');
                        $('.card-post').css({ 'padding-bottom': '20px' })
                    }



                })
                .fail(function (errData) {
                    console.log('error in completing the request');
                });


        });
    }
}
