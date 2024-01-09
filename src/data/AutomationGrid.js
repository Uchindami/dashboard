import React from "react";

export const automationGrid = [
    { headerText: 'Employee',
        width: '150',
        template: gridEmployeeProfile,
        textAlign: 'Center' },

    { field: 'Name',
        headerText: '',
        width: '0',
        textAlign: 'Center',
    },
    { field: 'emailAddress',
        headerText: 'emailAddress',
        width: '170',
        textAlign: 'Center',
    },
    { headerText: 'Country',
        width: '120',
        textAlign: 'Center',
        },

    { field: 'Department',
        headerText: 'Department',
        width: '135',
        format: 'yMd',
        textAlign: 'Center' },

    { field: 'accessLevelKey',
        headerText: 'accessLevelKey',
        width: '120',
        textAlign: 'Center' },
    { field: '_id',
        headerText: 'Employee ID',
        width: '125',
        textAlign: 'Center' },
];

const gridEmployeeProfile = (props) => (
    <div className="flex items-center gap-2">
        <img
            className="rounded-full w-10 h-10"
            src={props.photo}
            alt="employee"
        />
        <p>{props.firstName}</p>
        <p>{props.lastName}</p>
    </div>
);