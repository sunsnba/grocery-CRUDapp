$(document).ready(function () {
    $('#100gets').click(e => {
        $('#item').val('');
        fetch('/listItems', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => {
            console.log('create res', res)
            return res.json();
        }).then(response => {
            console.log('another response obj', response)
            for (let i = 0; i < response.length; i++) {
                $('#list').append('<li id="' + response[i]._id + '"><span id="one">' + response[i].listItems + '</span> <button class="delete">Delete</button> <input class="update" name="itemName" type="text" placeholder="Update Item"> </input>' +
                    '<button class="updateItem">Update</button></li>')
                $('#' + response[i]._id + ' .delete').click((e) => {
                    console.log('about to send delete: ' + $(e.target).parent().attr('id'));
                    console.log('delete target', e);
                    let id = $(e.target).parent().attr('id');
                    fetch('/deleteListItem', {
                        method: 'POST',
                        body: JSON.stringify({ listItemId: id }),
                        headers: new Headers({
                            'Content-Type': 'application/json'
                        })
                    })
                        .then(res => {
                            console.log('delete res', res);
                            return res.json()
                        })
                        .then(response => {
                            console.log('delete response', response)
                            $('#' + id).remove();
                        })
                        .catch(error => console.error('Error:', error));

                })
                $('.updateItem').click((e) => {

                    let id = $(e.target).parent().attr('id')
                    let updateValue = $('li#' + id + ' .update').val();
                    $('.update').val('');
                    console.log('updateValue', updateValue)
                    fetch('/updateListItem', {
                        method: 'POST',
                        body: JSON.stringify({ listItemId: id, listItemUpdate: updateValue }),
                        headers: new Headers({
                            'Content-Type': 'application/json'
                        })
                    })
                        .then(res => {
                            console.log('updated res', res);
                            return res.json();
                        })
                        .then(response => {
                            console.log('updated response', response)
                            $('#' + id + ' span').text(updateValue);
                        })
                        .catch(error => console.error('Error:', error));
                })
            }

        }).catch(err => {
            console.log('error');
        })

    });


    $('#getItem').click(() => {
        let itemValue = $('#item').val();
        $('#item').val('');
        fetch('/createList', {
            //this is all what we send
            method: 'POST',
            //want req.body to => this object;
            //giving the local host this body;
            //turned into a string bc of HTTP only takes strings;
            //listItem = what we call it in the server req.body.listItem;
            body: JSON.stringify({ listItem: itemValue }),
            //tells the server this is json so they can parser it
            headers: new Headers({
                'Content-Type': 'application/json'
            })
            //comes back at whole response obj => takes the extra stuff out;
        })
            //this is what we get back;
            //res is the response obj from the server;
            //need to turn it into json bc it might be stringified
            .then(res => {
                console.log('create res', res)
                return res.json()
            })
            //res.json is response;
            .then(response => {
                console.log('catch response', response);
                // let itemValue = document.getElementById('item').value;
                // let list = document.getElementById('list');

                $('#list').append('<li id="' + response._id + '"><span id="one">' + response.listItems + '</span> <button class="delete">Delete</button> <input class="update" name="itemName" type="text" placeholder="Update Item"> </input>' +
                    '<button class="updateItem">Update</button></li>')
                $('#' + response._id + ' .delete').click((e) => {
                    console.log('about to send delete: ' + $(e.target).parent().attr('id'));
                    console.log('delete target', e);
                    let id = $(e.target).parent().attr('id');
                    fetch('/deleteListItem', {
                        method: 'POST',
                        body: JSON.stringify({ listItemId: id }),
                        headers: new Headers({
                            'Content-Type': 'application/json'
                        })
                    })
                        .then(res => {
                            console.log('delete res', res);
                            return res.json()
                        })
                        .then(response => {
                            console.log('delete response', response)
                            $('#' + id).remove();
                        })
                        .catch(error => console.error('Error:', error));

                })
                $('.updateItem').click((e) => {

                    let id = $(e.target).parent().attr('id')
                    let updateValue = $('li#' + id + ' .update').val();
                    $('.update').val('');
                    console.log('updateValue', updateValue)
                    fetch('/updateListItem', {
                        method: 'POST',
                        body: JSON.stringify({ listItemId: id, listItemUpdate: updateValue }),
                        headers: new Headers({
                            'Content-Type': 'application/json'
                        })
                    })
                        .then(res => {
                            console.log('updated res', res);
                            return res.json();
                        })
                        .then(response => {
                            console.log('updated response', response)
                            $('#' + id + ' span').text(updateValue);
                        })
                        .catch(error => console.error('Error:', error));
                })
            })
            .catch(error => console.error('Error:', error));
    });
});


