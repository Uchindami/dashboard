import { FiPieChart, FiShoppingBag } from "react-icons/fi";
import {
    AiOutlineAreaChart,
    AiOutlineBarChart,
    AiOutlineCalendar,
    AiOutlineFundView,
    AiOutlineStock,
    AiOutlineUserAdd,
    AiTwotoneApi
} from "react-icons/ai";
import { RiStackLine, RiStockLine } from "react-icons/ri";
import { BsBarChart, BsKanban } from "react-icons/bs";
import { GiLouvrePyramid } from "react-icons/gi";
import React from "react";
import { TbUsers } from "react-icons/tb";
import { API, Automation, List, Snapshot, sendIcon } from "../assets/icons"

export const links = [

    {
        title: 'System',
        links: [
            {
                name: 'Snapshot',
                icon:  <img src={Snapshot} className="h-6 w-6"  alt="logo" /> ,
            },
        ],
    },


    {
        title: 'Invoice',
        links: [
            {
                name: 'API',
                icon: <img src={API} className="h-6 w-6 fill-current"  alt="logo" />,
            },
            {
                name: 'Manually',
                icon: <img src={sendIcon} className="h-6 w-6 fill-current"  alt="logo" />,
            },
            {
                name: 'Automate',
                icon: <img src={Automation} className="h-6 w-6 fill-current"  alt="logo" />,
            },
            {
                name: 'Automations',
                icon: <img src={List} className="h-6 w-6"  alt="logo" />,
            },

        ],
    },


    {
        title: 'Employees',
        links: [
            {
                name: 'View',
                icon: <AiOutlineFundView />,
            },
            {
                name: 'Register',
                icon: <AiOutlineUserAdd />,
            },
        ],
    },
    {
        title: 'Apps',
        links: [
            {
                name: 'calendar',
                icon: <AiOutlineCalendar />,
            },
            {
                name: 'kanban',
                icon: <BsKanban />,
            },

        ],
    },
    {
        title: 'Analytics',
        links: [
            {
                name: 'line',
                icon: <AiOutlineStock />,
            },
            {
                name: 'area',
                icon: <AiOutlineAreaChart />,
            },

            {
                name: 'bar',
                icon: <AiOutlineBarChart />,
            },
            {
                name: 'pie',
                icon: <FiPieChart />,
            },
            {
                name: 'financial',
                icon: <RiStockLine />,
            },
            {
                name: 'color-mapping',
                icon: <BsBarChart />,
            },
            {
                name: 'pyramid',
                icon: <GiLouvrePyramid />,
            },
            {
                name: 'stacked',
                icon: <AiOutlineBarChart />,
            },
        ],
    },
];
