import React from "react";

<tr key={task.id}>
    <td className="align-middle">
        <div>{task.description}</div>
        <span>{task.creation_time}</span></td>
    <td className="align-middle"><span
        className="badge badge-success badge-pill">Active</span></td>
    <td className="align-middle">
        <div className="progress">
            <div className="progress-bar" role="progressbar" styles="width: 25%;"
                 aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%
            </div>
        </div>
    </td>
    <td className="align-middle">
        <div className="avatar-image avatar-image--loaded">
            <div className="avatar avatar--md avatar-image__image">
                <div className="avatar__content"><img
                    src="http://bootdey.com/img/Content/avatar/avatar1.png"/></div>
            </div>
        </div>
    </td>
    <td className="align-middle text-right">
        <div className="btn-group">
            <button type="button" aria-haspopup="true" aria-expanded="false"
                    className="dropdown-toggle btn btn-link"><i
                className="fa fa-gear"></i></button>
            <div tabIndex="-1" role="menu" aria-hidden="true"
                 className="dropdown-menu dropdown-menu-right">
                <button type="button" tabIndex="0" className="dropdown-item"><i
                    className="fa fa-fw fa-folder-open mr-2"></i>View
                </button>
                <button type="button" tabIndex="0" className="dropdown-item"><i
                    className="fa fa-fw fa-ticket mr-2"></i>Add Task
                </button>
                <button type="button" tabIndex="0" className="dropdown-item"><i
                    className="fa fa-fw fa-paperclip mr-2"></i>Add Files
                </button>
                <div tabIndex="-1" className="dropdown-divider"></div>
                <button type="button" tabIndex="0" className="dropdown-item"><i
                    className="fa fa-fw fa-trash mr-2"></i>Delete
                </button>
            </div>
        </div>
    </td>
</tr>