import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Comment from '../CommentsSuper/Comment';
import Category from '../../Supervisor/CategorySuper/Category';
import TopBooks from '../../Supervisor/TopBooks/Book';
import Book from '../BooksSuper/Book';
import AcceptedBooks from '../BooksSuperAccept/Book';
import BooksForeign from '../../Supervisor/BooksForeign/Book';
import BooksArabic from '../../Supervisor/BooksArabic/Book';
import Readers from '../Readers/Users';
import AcceptedUsers from '../AcceptedUsers/Users';
import UnacceptedUsers from '../UnacceptedUsers/Users';
import Writers from '../Writers/Users';
import { useAppSelector } from '@hooks/app';
import Supervisors from '../Supervisors/Supervisors';
import './SupervisorTab.css'
import Chapters from '@components/Supervisor/UnacceptedChapters/Chapters';


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
                                <Nav.Link eventKey="third">{language === 'English' ? 'Accepted Books' : 'الكتب المقبولة'}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item >
                                <Nav.Link eventKey="fourth">{language === 'English' ? 'Books' : 'الكتب '}</Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Nav.Link eventKey="fifth">{language === 'English' ? 'Top Books' : 'أفضل الكتب'}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="six">{language === 'English' ? 'Arabic Books' : 'الكتب العربية'}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="seven">{language === 'English' ? 'English Books' : 'الكتب الانجليزية'}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="eight">{language === 'English' ? 'Unaccepted chapters' : 'الفصول الغبر مقبولة'}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item >
                                <Nav.Link eventKey="neen">{language === 'English' ? 'Supervisors' : 'المشرفين'}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item >
                                <Nav.Link eventKey="ten">{language === 'English' ? 'Accepted Users' : 'المستخدمين المقبولين'}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item >
                                <Nav.Link eventKey="eleven">{language === 'English' ? 'Unaccepted Users' : 'المستخدمين الغير  مقبولين'}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item >
                                <Nav.Link eventKey="tewelve">{language === 'English' ? 'Readers' : 'القراء'}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item >
                                <Nav.Link eventKey="thirteen">{language === 'English' ? 'Writers' : 'الكاتبين'}</Nav.Link>
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
                            <Tab.Pane eventKey="six"><BooksArabic /></Tab.Pane>
                            <Tab.Pane eventKey="seven"><BooksForeign /></Tab.Pane>
                            <Tab.Pane eventKey="eight"><Chapters /></Tab.Pane>
                            <Tab.Pane eventKey="neen"><Supervisors /></Tab.Pane>
                            <Tab.Pane eventKey="ten"><AcceptedUsers /></Tab.Pane>
                            <Tab.Pane eventKey="eleven"><UnacceptedUsers /></Tab.Pane>
                            <Tab.Pane eventKey="tewelve"><Readers /></Tab.Pane>
                            <Tab.Pane eventKey="thirteen"><Writers /></Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>

            </Tab.Container>
        </div >
    );
}

export default LeftTabsExample;