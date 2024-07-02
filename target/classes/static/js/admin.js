$(() => {
    $.getJSON('admin/rest', (users) => {
        users.forEach(user => {
            buildTable(user);
        });
    });
    //edit
    $(document).on('click', 'td#edit', (btn) => {
        $('#modalForm div.validation').text('');
        $('div#modalWin select').prop('disabled', false);
        $('div#modalWin option').prop('selected', false);
        let input = $('div#modalWin input');
        input.not('#id').prop('disabled', false);
        input.filter(`#password`).parent().parent().show();
        input.filter('.btn-danger').attr('value', 'Edit');
        input.filter('.btn-danger').attr('class', 'btn btn-primary');

        $.getJSON(`/admin/rest/${btn.target.id}`, user => {
            for (let key in user) {
                if (user.hasOwnProperty(key)) {
                    input.filter(`#${key}`).val(user[key]);
                }
            }

            if (user.roles && user.roles.length > 0) {
                let roles = user.roles.map(role => role.name.replace('ROLE_', ''));
                $('div#modalWin select').val(roles);
            }

            $('#modalForm input:submit').off().on('click', btnIn => {
                $('#modalForm div.validation').text('');
                btnIn.preventDefault();

                for (let key in user) {
                    if (user.hasOwnProperty(key)) {
                        user[key] = input.filter(`#${key}`).val();
                    }
                }

                let selectVal = $('div#modalWin select').val();
                console.log(selectVal, selectVal[0])
                if (!selectVal || selectVal.length === 0) {
                    user['roles'] = [];
                } else {
                    user['roles'] = [{
                        id: selectVal === 'ADMIN' ? 1 : 2
                    }];
                }

                if (user.password.length === 0) {
                    $('#modalForm div#confirmEditError').text('Введите новый пароль.');
                } else {
                    $.ajax({
                        url: `/admin/rest/${user.id}`,
                        contentType: "application/json; charset=utf-8",
                        method: 'PATCH',
                        dataType: 'json',
                        data: JSON.stringify(user),
                        success: function (data) {
                            $('.modal').modal('hide');
                            refactorTable(data, 'edit');
                            $.getJSON('/rest/authorized', userAut => {
                                let navSpan = $('span.navbar-brand');
                                if (user.hasOwnProperty('roles') && navSpan.text() !== userAut.roles) {
                                    navSpan.text(userAut.roles);
                                }
                            });
                        },
                        error: jqXHR => {
                            let divValid = $('#modalForm div.validation');
                            divValid.not('#userEditError').not('#confirmEditError').text('');
                            let error = jqXHR.responseJSON;
                            for (let key in error) {
                                if (error.hasOwnProperty(key)) {
                                    divValid.filter(`#${key}EditError`).text(`${error[key]}`);
                                }
                            }
                        }
                    });
                }
            });
        });
    });

    //delete
    $(document).on('click', 'td#delete', (btn) => {
        let input = $('div#modalWin input')
        $('div#modalWin select').prop('disabled', true)
        $('div#modalWin option').prop('selected', false)
        input.not(':submit').prop('disabled', true)
        input.filter(`#password`).parent().parent().hide()
        input.filter('.btn-primary').attr('value', 'Delete')
        input.filter('.btn-primary').attr('class', 'btn btn-danger')
        $.getJSON(`/admin/rest/${btn.target.id}`, user => {
            for (let key in user) {
                if (user.hasOwnProperty(key)) {
                    input.filter(`#${key}`).val(user[key])
                }
            }
            $('#modalForm input:submit').off().on('click', btnIn => {
                btnIn.preventDefault()
                $.ajax({
                    url: `/admin/rest/${user.id}`,
                    contentType: "application/json; charset=utf-8",
                    method: 'delete',
                    success: function (data) {
                        $('.modal').modal('hide')
                        refactorTable(user, 'del')
                    }
                })
            })
        })
    })
    // new user
    $(document).on('click', 'form#registForm input:submit', (btnReg) => {
        btnReg.preventDefault()
        $('#registForm div.validation').text('')
        let newUser = {}
        $('#registForm').find('input').each(function () {
            if ($(this).val() !== 'Add new user') {
                newUser[this.id.replace('Reg', '')] = $(this).val()
            }
        })

        let selectVal = $('#registForm select').val();
        if (!selectVal || selectVal.length === 0) {
            newUser['roles'] = [];
        } else {
            newUser['roles'] = [{
                id: selectVal === 'ADMIN' ? 1 : 2
            }];
        }
        $.ajax({
            url: '/admin/rest',
            method: 'post',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(newUser),
            success: createdUser => {
                $('#registForm div.validation').text('')
                $('#registForm').find('input').not(':submit').val('')
                $('#new-user-tab').removeClass('active');
                $('#users-tab').addClass('active');

                $('#new-user').removeClass('show active');
                $('#users').addClass('show active');
                window.location.reload();
                buildTable(createdUser)
            },
            error: jqXHR => {
                let divValid = $('#registForm div.validation')
                divValid.not('#userRegError').not('#confirmRegError').text('')
                let error = jqXHR.responseJSON
                for (key in error) {
                    if (error.hasOwnProperty(key)) {
                        divValid.filter(`#${key}RegError`).text(`${error[key]}`)
                    }
                }
            }
        })
    })
    let refactorTable = (user, action) => {
        if (action === 'del') {
            $(`tr#tr${user.id}`).detach()
        } else if (action === 'edit') {
            let trUser = document.querySelector(`tbody #tr${user.id}`)
            let roles = user.roles.map(role => role.name.replace("ROLE_", "")).join(" , ");
            trUser.innerHTML = `<td>${user.id}</td>
                                                <td>${user.firstName}</td>
                                                <td>${user.lastName}</td>
                                                <td>${user.age}</td>
                                                <td>${user.email}</td>
                                                <td>${user.username}</td>
                                                <td>${roles}</td>
                                                <td id="edit">
                                                    <div>
                                                        <button id="${user.id}" type="button" class="btn btn-secondary"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#modalWin"
                                                                >
                                                            Edit
                                                        </button>
                                                    </div>
                                                </td>
                                                <td id="delete">
                                                    <div>
                                                        <button id="${user.id}" type="button" class="btn btn-danger"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#modalWin"
                                                                >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>`
        }
    }
    const buildTable = (user) => {
        const bodyTable = document.querySelector('tbody');
        console.log(user.roles);
        let roles = user.roles.map(role => role.name.replace("ROLE_", "")).join(" , ");
        bodyTable.innerHTML += `<tr id="tr${user.id}">
        <td>${user.id}</td>
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.age}</td>
        <td>${user.email}</td>
        <td>${user.username}</td>
        <td>${roles}</td> <!-- Используем roles как строку здесь -->
        <td id="edit">
            <div>
                <button id="${user.id}" type="button" class="btn btn-secondary"
                        data-bs-toggle="modal"
                        data-bs-target="#modalWin">
                    Edit
                </button>
            </div>
        </td>
        <td id="delete">
            <div>
                <button id="${user.id}" type="button" class="btn btn-danger"
                        data-bs-toggle="modal"
                        data-bs-target="#modalWin">
                    Delete
                </button>
            </div>
        </td>
    </tr>`;
    }

})