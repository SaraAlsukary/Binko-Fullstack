import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Comment from '../CommentsSuper/Comment';
import Category from '../../Supervisor/CategorySuper/Category';
import TopBooks from '../../Supervisor/TopBooks/Book';
import Book from '../BooksSuper/Book';
import AcceptedBooks from '../BooksSuperAccept/Book';
import Users from '../../Admin/Users/Users';
import { useAppSelector } from '@hooks/app';
import Supervisors from '../Supervisors/Supervisors';
import './SupervisorTab.css'
import { ConfirmDialog } from 'primereact/confirmdialog';

function LeftTabsExample() {
    const { language } = useAppSelector(state => state.language);


    return (
        <div className='tabCont'>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first" >
                <h5> <i className='pi pi-wrench'></i> {language === 'English' ? 'Settings' : 'الاعدادات'}</h5>
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item >
                                <Nav.Link eventKey="first">{language === 'English' ? 'Categories' : 'التصنيفات'}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item >
                                <Nav.Link eventKey="second">{language === 'English' ? 'Comments' : 'التعليقات'}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item >
                                <Nav.Link eventKey="third">{language === 'English' ? 'Books' : 'الكتب'}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item >
                                <Nav.Link eventKey="fourth">{language === 'English' ? 'Accepted Books' : 'الكتب المنشورة'}</Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Nav.Link eventKey="fifth">{language === 'English' ? 'Top Books' : 'أفضل الكتب'}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item >
                                <Nav.Link eventKey="six">{language === 'English' ? 'Supervisors' : 'المشرفين'}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item >
                                <Nav.Link eventKey="seven">{language === 'English' ? 'Users' : 'المستخدمين'}</Nav.Link>
                            </Nav.Item>

                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first"><Category /></Tab.Pane>
                            <Tab.Pane eventKey="second"><Comment /></Tab.Pane>
                            <Tab.Pane eventKey="third"><Book /></Tab.Pane>
                            <Tab.Pane eventKey="fourth"><AcceptedBooks /></Tab.Pane>
                            <Tab.Pane eventKey="fifth"><TopBooks /></Tab.Pane>
                            <Tab.Pane eventKey="six"><Supervisors /></Tab.Pane>
                            <Tab.Pane eventKey="seven"><Users /></Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
                <ConfirmDialog />

            </Tab.Container>
        </div >
    );
}

export default LeftTabsExample;