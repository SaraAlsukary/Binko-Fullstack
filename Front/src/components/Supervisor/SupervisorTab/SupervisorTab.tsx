import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import AcceptedBooks from '../BooksSuperAccept/Book';
import Comment from '../CommentsSuper/Comment'
import Category from '../CategorySuper/Category'
import Book from '../BooksSuper/Book'
import './SupervisorTab.css'
import { useAppSelector } from '@hooks/app';
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
                                <Nav.Link eventKey="third">{language === 'English' ? 'Books' : 'الكتب'}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item onClick={() => setRend(!rend)}>
                                <Nav.Link eventKey="fourth">{language === 'English' ? 'Accepted Books' : 'الكتب المنشورة'}</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first"><Category rend={rend} /></Tab.Pane>
                            <Tab.Pane eventKey="second"><Comment rend={rend} /></Tab.Pane>
                            <Tab.Pane eventKey="fourth"><Book rend={rend} /></Tab.Pane>
                            <Tab.Pane eventKey="third"><AcceptedBooks rend={rend} /></Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    );
}

export default LeftTabsExample;