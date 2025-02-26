import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Comment from '../../Supervisor/CommentsSuper/Comment';
import Category from '../../Supervisor/CategorySuper/Category';
import Book from '../../Supervisor/BooksSuper/Book';
import AcceptedBooks from '../../Supervisor/BooksSuperAccept/Book';
import Users from '../../Admin/Users/Users';
import { useAppSelector } from '@hooks/app';
import Supervisors from '../Supervisors/Supervisors';
import './SupervisorTab.css'
import { useState } from 'react';
function LeftTabsExample() {
    const { language } = useAppSelector(state => state.language);
    const [rend, setRend] = useState(false);

    return (
        <div className='tabCont'>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first" >
                <h5> <i className='pi pi-wrench'></i> {language === 'English' ? 'Settings' : 'الاعدادات'}</h5>
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item onClick={() => setRend(!rend)}>
                                <Nav.Link eventKey="first">{language === 'English' ? 'Categories' : 'التصنيفات'}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item onClick={() => setRend(!rend)}>
                                <Nav.Link eventKey="second">{language === 'English' ? 'Comments' : 'التعليقات'}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item onClick={() => setRend(!rend)}>
                                <Nav.Link eventKey="third">{language === 'English' ? 'Accepted Books' : 'الكتب المنشورة'}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item onClick={() => setRend(!rend)}>
                                <Nav.Link eventKey="six">{language === 'English' ? 'Books' : 'الكتب'}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item onClick={() => setRend(!rend)}>
                                <Nav.Link eventKey="fourth">{language === 'English' ? 'Supervisors' : 'المشرفين'}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item onClick={() => setRend(!rend)}>
                                <Nav.Link eventKey="fifth">{language === 'English' ? 'Users' : 'المستخدمين'}</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first"><Category rend={rend} /></Tab.Pane>
                            <Tab.Pane eventKey="second"><Comment rend={rend} /></Tab.Pane>
                            <Tab.Pane eventKey="third"><Book rend={rend} /></Tab.Pane>
                            <Tab.Pane eventKey="six"><AcceptedBooks rend={rend} /></Tab.Pane>
                            <Tab.Pane eventKey="fourth"><Supervisors rend={rend} /></Tab.Pane>
                            <Tab.Pane eventKey="fifth"><Users rend={rend} /></Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div >
    );
}

export default LeftTabsExample;