import React from 'react';
import {
    BsHouseDoor,
    BsHash,
    BsBarChartLine,
    BsCheckCircle,
    BsBookmarks,
    BsJournalText,
    BsPerson,
    BsThreeDots,
    BsPersonCircle
} from 'react-icons/bs'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ISidebarTopic } from './components/SidebarTopic/interfaces/ISidebarTopic';
import { ButtonSidebar } from './components/ButtonSidebar/ButtonSidebar'
import { DropdownPersonSidebar } from './components/DropdownPersonSidebar/DropdownPersonSidebar'
import { SidebarTopic } from './components/SidebarTopic/SidebarTopic';
import papiroLogo from './../../../Assets/img/papiro1.png';
import './styles/styles.scss'

const Sidebar: React.FC = (props) => {
    const splitLocation = useLocation().pathname.split(",");
    const sidebarTopics: ISidebarTopic[] = [
        {
            title: 'Home',
            icon: <BsHouseDoor />,
            path: '/home'
        },
        {
            title: 'Explore',
            icon: <BsHash />,
            path: '/explore'
        },
        {
            title: 'Analytics',
            icon: <BsBarChartLine />,
            path: '/analytics'
        },
        {
            title: 'Quizzes',
            icon: <BsCheckCircle />,
            path: '/quizzes'
        },
        {
            title: 'Library',
            icon: <BsBookmarks />,
            path: '/library'
        },
        {
            title: 'Lists',
            icon: <BsJournalText />,
            path: '/lists'
        },
        {
            title: 'Profile',
            icon: <BsPerson />,
            path: '/profile'
        }
    ];

    return (
        <nav className="nav d-flex flex-column justify-content-between min-vh-100 sticky-top p-1">
            <div>
                <Link to="/home" className="navbar-brand">
                    <img src={papiroLogo} alt="Papiro logo" />
                </Link>
                {
                    sidebarTopics.map((topic: ISidebarTopic, index: number) =>
                        <SidebarTopic
                            icon={topic.icon}
                            path={topic.path}
                            title={topic.title}
                            isActive={splitLocation[0] === topic.path ? true : false}
                            key={`sidebarTopic-${index}`}
                        />
                    )
                }
                <li className="nav-item d-flex align-items-center">
                    <BsThreeDots />
                    <Link to="#" className="nav-link">
                        More
                    </Link>
                </li>
                { props.children }
                <ButtonSidebar label="New Game" />
            </div>

            <DropdownPersonSidebar username="Fulano de Tal"/>
        </nav>
    )
}

export { Sidebar }