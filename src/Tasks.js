import './Tasks.css'
import React, { Component } from 'react';
import axios from 'axios';

interface User{
    id: number;
    login: string;
    password: string;
    login_time: string;
    orgUnitId: number;
    count: number;
    cartoon:number;
}

interface Task {
    id: number;
    creation_time: string;
    status: number;
    curr_hours: number;
    full_hours: number;
    description: string;
    creator_user_id: number;
    executor_user_id: number;
}

interface TaskListProps {
}

interface TaskListState {
    count: number;
    tasks: Array<Task>;
    isLoading: boolean;
}


class Tasks extends React.Component<TaskListProps, TaskListState>{

    constructor(props: TaskListProps) {
        super(props);

        this.state = {
            count: 0,
            tasks: [],
            isLoading: false
        };
    }

    test(e){
        console.log('event');
    }



    componentDidMount() {
        axios.get("http://127.0.0.1:8080/tasks/getAllTask").then(response => {

            var count = response.data.length;

            if (count <= 10){
                var divtest = document.createElement('li');
                divtest.className = "page-item active";
                divtest.innerHTML = "<a href='#' className='page-link'>1</a>";

                var next = document.getElementById('pages');
                next.appendChild(divtest);
            } else {
                var countOf = (count%10==0)? count/10 : count/10+1;
                var current = document.createElement('li');
                current.className = "page-item active";
                current.innerHTML = "<a href='#' className='page-link'>1</a>";

                var next = document.getElementById('pages');
                next.appendChild(current);

                for(var i = 1; i < countOf; i++)
                {
                    var current = document.createElement('li');
                    current.className = "page-item ";
                    current.innerHTML = "<a href='#' className='page-link'>" + (i+1) + "</a>";
                    next.appendChild(current);
                }

                this.updateTask(response.data);
            }

            this.setState({count:response.data.length, tasks:response.data, isLoading:false})
        });

        axios.get("http://127.0.0.1:8080/user/getStatsUser").then(response => {
            var array = response.data;
            var next = document.getElementById('whoCreateTask');
            var ct = (array.length>3)? 3: array.length;
            console.log(ct);
            for(var i = 0; i < ct; i++)
            {
                console.log("wtf");
                var current = document.createElement('li');
                current.innerHTML = " <li class=\"nav-item\">\n" +
                    "                                    <a href=\"#\" class=\"d-flex nav-link\">\n" +
                    "                                        <div class=\"media\">\n" +
                    "                                            <div class=\"mr-3 align-self-center media-left media-middle\">\n" +
                    "                                                <div class=\"avatar-image avatar-image--loaded\">\n" +
                    "                                                    <div class=\"avatar avatar--md avatar-image__image\">\n" +
                    "                                                        <div class=\"avatar__content\"><img\n" +
                    "                                                            src=\"http://bootdey.com/img/Content/avatar/avatar" + array[i].cartoon + ".png\"/>\n" +
                    "                                                        </div>\n" +
                    "                                                    </div>\n" +
                    "                                                </div>\n" +
                    "                                            </div>\n" +
                    "                                            <div class=\"media-body\">\n" +
                    "                                                <div class=\"mt-0\">" + array[i].login + "</div>\n" +
                    "                                                <span className=\"small\">Count Of Task is " + array[i].count + " </span></div></div>\n" +
                    "                                        </div>\n" +
                    "                                        <i class=\"fa fa-fw fa-circle text-success ml-auto align-self-center ml-2\"></i></a>\n" +
                    "                                </li>";
                next.appendChild(current);
            }
        });

        axios.get("http://127.0.0.1:8080/user/getLastLogin").then(response => {
            var array = response.data;
            var next = document.getElementById('lastLogin');
            var ct = (array.length>3)? 3: array.length;
            console.log(ct);
            for(var i = 0; i < ct; i++)
            {
                var now = new Date(array[i].login_time);
                console.log("wtf");
                var current = document.createElement('li');
                current.innerHTML = " <li class=\"nav-item\">\n" +
                    "                                    <a href=\"#\" class=\"d-flex nav-link\">\n" +
                    "                                        <div class=\"media\">\n" +
                    "                                            <div class=\"mr-3 align-self-center media-left media-middle\">\n" +
                    "                                                <div class=\"avatar-image avatar-image--loaded\">\n" +
                    "                                                    </div>\n" +
                    "                                            </div>\n" +
                    "                                            <div class=\"media-body\">\n" +
                    "                                                <div class=\"mt-0\">" + array[i].login + "</div>\n" +
                    "                                                <span className=\"small\">Login date " + now.getFullYear() + "." + now.getMonth() + "." + now.getDay() + " </span></div></div>\n" +
                    "                                        </div>\n" +
                    "                                        <i class=\"fa fa-fw fa-circle text-success ml-auto align-self-center ml-2\"></i></a>\n" +
                    "                                </li>";
                next.appendChild(current);
            }
        })
    }

    updateTask(array){
        var next = document.getElementById("bodyForTask");
        for(var i = 0; i < 10; i++){
            var current = document.createElement('tr');
            var now = new Date(array[i].creation_time);
            current.innerHTML = '<td class="align-middle">\n' +
                '        <div>'+array[i].description + '</div>\n' +
                '        <span>' +  + now.getFullYear() + "." + now.getMonth() + "." + now.getDay() + '</span></td>\n' +
                '    <td class="align-middle"><span\n' +
                '        class="badge badge-success badge-pill">' + ((array[i].status == 0)? "Active" : ((array[i].status == 1)? "InActive" : ((array[i].status==2)? "Deffered" : "Close"))) + '</span></td>\n' +
                '    <td class="align-middle">\n' +
                '        <div class="progress">\n' +
                '            <div class="progress-bar" role="progressbar" style="width: ' + (array[i].curr_hours/array[i].full_hours)*100 + '%;"\n' +
                '                 aria-valuenow="' + (array[i].curr_hours/array[i].full_hours)*100 + '" aria-valuemin="0" aria-valuemax="100">' + (array[i].curr_hours/array[i].full_hours)*100 + '%\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </td>\n' +
                '    <td class="align-middle">\n' +
                '        <div class="avatar-image avatar-image--loaded">\n' +
                '            <div class="avatar avatar--md avatar-image__image">\n' +
                '                <div class="avatar__content"><img\n' +
                '                    src="http://bootdey.com/img/Content/avatar/avatar'+ ((i)%8+1) +'.png"/></div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </td>\n' +
                '    <td class="align-middle text-right">\n' +
                '        <div class="btn-group">\n' +
                '            <button type="button" aria-haspopup="true" aria-expanded="false"\n' +
                '                    class="dropdown-toggle btn btn-link"><i\n' +
                '                class="fa fa-gear"></i></button>\n' +
                '            <div tabIndex="-1" role="menu" aria-hidden="true"\n' +
                '                 class="dropdown-menu dropdown-menu-right">\n' +
                '                <button type="button" tabIndex="0" class="dropdown-item"><i\n' +
                '                    class="fa fa-fw fa-folder-open mr-2"></i>View\n' +
                '                </button>\n' +
                '                <button type="button" tabIndex="0" class="dropdown-item"><i\n' +
                '                    class="fa fa-fw fa-ticket mr-2"></i>Add Task\n' +
                '                </button>\n' +
                '                <button type="button" tabIndex="0" class="dropdown-item"><i\n' +
                '                    class="fa fa-fw fa-paperclip mr-2"></i>Add Files\n' +
                '                </button>\n' +
                '                <div tabIndex="-1" class="dropdown-divider"></div>\n' +
                '                <button type="button" tabIndex="0" class="dropdown-item"><i\n' +
                '                    class="fa fa-fw fa-trash mr-2"></i>Delete\n' +
                '                </button>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </td>';
            next.appendChild(current);

        }
    }



    render(){
        const {count, tasks, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="mb-4">
                            <div className="small mb-3">Search</div>
                            <div className="input-group">
                                <input placeholder="Search for..." type="text" className="form-control"/>
                                    <div className="input-group-append">
                                        <button className="btn btn-secondary"><i className="fa fa-search"></i></button>
                                    </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="small mb-3">Last Login People</div>
                            <ul className="nav flex-column nav-pills" id = "lastLogin">

                            </ul>
                        </div>
                        <div className="mb-4">
                            <div className="small mb-3">People who create tasks</div>
                            <ul className="nav flex-column nav-pills" id = "whoCreateTask">

                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <div className="d-flex flex-column flex-md-row mb-3 mb-md-0">
                            <nav className="mr-auto d-flex align-items-center" aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="active breadcrumb-item" aria-current="page"><a href="/"><i
                                        className="fa fa-home"></i></a></li>
                                    <li className="active breadcrumb-item" aria-current="page">Projects List</li>
                                </ol>
                            </nav>
                            <div role="toolbar" className="btn-toolbar">
                                <div role="group" className="mr-auto mr-md-2 btn-group"><a
                                    className="align-self-center btn btn-secondary active" aria-current="page"
                                    id="tooltipShowList" href="/apps/projects/list"><i className="fa-fw fa fa-bars"></i></a><a
                                    className="align-self-center btn btn-secondary" id="tooltipShowGrid"
                                    href="/apps/projects/grid"><i className="fa-fw fa fa-th-large"></i></a></div>
                                <div role="group" className="btn-group">
                                    <button id="tooltipAddNew" className="align-self-center btn btn-primary" onClick={this.test.bind(this)}><i
                                        className="fa-fw fa fa-plus"></i></button>
                                </div>
                            </div>
                        </div>
                        <div className="mb-3 Card_custom-card--border_5wJKy card">
                            <div className="table-responsive-xl">
                                <table className="mb-0 table table-hover">
                                    <thead>
                                    <tr>
                                        <th className="align-middle bt-0">Project</th>
                                        <th className="align-middle bt-0">Status</th>
                                        <th className="align-middle bt-0">Tasks Completed</th>
                                        <th className="align-middle bt-0">People</th>
                                        <th className="align-middle bt-0 text-right">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody id="bodyForTask">

                                    </tbody>
                                </table>
                            </div>
                            <div className="d-flex justify-content-center pb-0 card-footer">
                                <nav className="" aria-label="Page navigation example">
                                    <ul className="pagination" id="pages">
                                        <script>
                                            document.body.innerHTML = "<h1>Today's date is " + d + "</h1>"
                                        </script>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Tasks;